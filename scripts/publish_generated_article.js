/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const cheerio = require('cheerio');
const { createClient } = require('@supabase/supabase-js');
const { validateGeneratedArticle, fetchPosts, inferCanonicalTargetFromPost } = require('./generate_article_draft');
const { createBriefForBrandSlug } = require('./create_article_brief');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const FACTORY_DIR = path.resolve(__dirname, '../tmp/article-factory');

function parseArgs(argv) {
    const args = {
        brief: null,
        brandSlug: null,
        articleFile: null,
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--brief' && argv[i + 1]) {
            args.brief = argv[++i];
        } else if (arg === '--brand-slug' && argv[i + 1]) {
            args.brandSlug = argv[++i];
        } else if (arg === '--article-file' && argv[i + 1]) {
            args.articleFile = argv[++i];
        }
    }

    return args;
}

function getArticleFilePath(articleFile) {
    if (!articleFile) {
        throw new Error('Codex-generated article file is required. Pass --article-file <path>.');
    }
    return path.resolve(process.cwd(), articleFile);
}

function getBriefPath(args) {
    if (args.brief) return path.resolve(process.cwd(), args.brief);
    if (args.brandSlug) return path.join(FACTORY_DIR, `${args.brandSlug}-brief.json`);
    throw new Error('Usage: node scripts/publish_generated_article.js --brief <path> or --brand-slug <slug>');
}

function inferCategoryFromTarget(canonicalTarget) {
    if (canonicalTarget.startsWith('brand:')) return 'ブランド';
    return 'ガイド';
}

async function uploadImage(slug, localPath, fileNamePrefix = '') {
    if (!fs.existsSync(localPath)) {
        console.warn(`  ⚠️ Image file not found at: ${localPath}`);
        return null;
    }

    const fileContent = fs.readFileSync(localPath);
    const ext = path.extname(localPath).toLowerCase() || '.webp';
    const baseName = path.basename(localPath, ext);
    const finalFileName = `${slug}-${fileNamePrefix}${baseName}${ext}`;
    const contentType = ext === '.webp' ? 'image/webp' : (ext === '.png' ? 'image/png' : 'image/jpeg');

    console.log(`  🚀 Uploading image to storage: ${finalFileName}...`);
    const { error } = await supabase.storage
        .from('article-thumbnails') // We can use the same bucket for all images
        .upload(finalFileName, fileContent, {
            contentType,
            upsert: true
        });

    if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }

    const timestamp = Date.now();
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article-thumbnails/${finalFileName}?t=${timestamp}`;
}

async function processInternalImages(slug, html) {
    const $ = cheerio.load(html, { decodeEntities: false });
    const imgTags = $('img').toArray();
    let updated = false;

    for (const img of imgTags) {
        const src = $(img).attr('src');
        if (src && (src.startsWith('/') || src.includes('Users'))) {
            const uploadedUrl = await uploadImage(slug, src, 'content-');
            if (uploadedUrl) {
                $(img).attr('src', uploadedUrl);
                updated = true;
            }
        }
    }

    return updated ? $.html('body').replace(/^<body>|<\/body>$/g, '') : html;
}

async function publishDraft(draft) {
    const { data: existingPost } = await supabase
        .from('posts')
        .select('id, created_at, thumbnail_url')
        .eq('slug', draft.slug)
        .single();

    let finalThumbnailUrl = draft.thumbnailUrl || draft.thumbnail_url;
    if (finalThumbnailUrl && (finalThumbnailUrl.startsWith('/') || finalThumbnailUrl.includes('Users'))) {
        finalThumbnailUrl = await uploadImage(draft.slug, finalThumbnailUrl, 'thumb-');
    }

    console.log('  🔍 Scanning for internal images to upload...');
    const finalHtml = await processInternalImages(draft.slug, draft.html);

    const payload = {
        slug: draft.slug,
        title: draft.title,
        content: finalHtml,
        category: inferCategoryFromTarget(draft.canonicalTarget),
        thumbnail_url: finalThumbnailUrl || existingPost?.thumbnail_url || null,
    };

    if (existingPost?.created_at) {
        payload.created_at = existingPost.created_at;
    } else {
        payload.created_at = new Date().toISOString();
    }

    if (existingPost?.id) {
        const { error } = await supabase
            .from('posts')
            .update(payload)
            .eq('id', existingPost.id);

        if (error) throw error;
        return { mode: 'updated', slug: draft.slug };
    }

    const { error } = await supabase
        .from('posts')
        .insert(payload);

    if (error) throw error;
    return { mode: 'inserted', slug: draft.slug };
}

async function syncBrandGuideFlag(draft) {
    if (!draft.canonicalTarget.startsWith('brand:')) return;

    const brandSlug = draft.canonicalTarget.split(':')[1];
    if (!brandSlug) return;

    await supabase
        .from('brands')
        .update({ has_guide_article: true })
        .eq('slug', brandSlug);
}

function buildPublishableArticle(brief, articlePayload) {
    const article = {
        ...articlePayload,
        slug: articlePayload.slug || brief.slug,
        title: articlePayload.title || brief.title,
        canonicalTarget: articlePayload.canonicalTarget || brief.canonicalTarget,
        primaryKeyword: articlePayload.primaryKeyword || brief.primaryKeyword,
        secondaryKeywords: articlePayload.secondaryKeywords || brief.secondaryKeywords,
        internalLinks: articlePayload.internalLinks || brief.internalLinks,
        topShops: articlePayload.topShops || brief.topShops,
        qualitySummary: articlePayload.qualitySummary || articlePayload.quality_summary || '',
        html: articlePayload.html || '',
        thumbnailUrl: articlePayload.thumbnailUrl || articlePayload.thumbnail_url || '',
    };

    const validation = validateGeneratedArticle(brief, article);
    if (!validation.isValid) {
        throw new Error(`Article failed quality checks: ${validation.issues.join(' / ')}`);
    }

    article.generationMeta = {
        provider: 'codex',
        validation: validation.stats,
    };

    return article;
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    let brief;

    if (args.brandSlug && !args.brief) {
        const result = await createBriefForBrandSlug(args.brandSlug);
        brief = result.brief;
    } else {
        const briefPath = getBriefPath(args);
        brief = JSON.parse(fs.readFileSync(briefPath, 'utf8'));
    }

    if (!brief.canonicalTarget) {
        throw new Error('Brief is missing canonicalTarget. Rebuild the brief with the latest script.');
    }

    const articleFilePath = getArticleFilePath(args.articleFile);
    const articlePayload = JSON.parse(fs.readFileSync(articleFilePath, 'utf8'));
    const draft = buildPublishableArticle(brief, articlePayload);
    const result = await publishDraft(draft);
    await syncBrandGuideFlag(draft);

    console.log(JSON.stringify({
        ok: true,
        mode: result.mode,
        slug: draft.slug,
        title: draft.title,
        canonicalTarget: draft.canonicalTarget,
        qualitySummary: draft.qualitySummary,
        generationMeta: draft.generationMeta,
    }, null, 2));
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
