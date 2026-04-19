/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const { createDraftFromBrief, fetchPosts, inferCanonicalTargetFromPost } = require('./generate_article_draft');
const { createBriefForBrandSlug } = require('./create_article_brief');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const FACTORY_DIR = path.resolve(__dirname, '../tmp/article-factory');

function parseArgs(argv) {
    const args = {
        brief: null,
        brandSlug: null,
    };

    for (let i = 0; i < argv.length; i++) {
        const arg = argv[i];
        if (arg === '--brief' && argv[i + 1]) {
            args.brief = argv[++i];
        } else if (arg === '--brand-slug' && argv[i + 1]) {
            args.brandSlug = argv[++i];
        }
    }

    return args;
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

async function assertNoConflictingPublishedPage(brief) {
    const posts = await fetchPosts();
    const conflict = posts.find((post) => inferCanonicalTargetFromPost(post) === brief.canonicalTarget && post.slug !== brief.slug);
    if (conflict) {
        throw new Error(`Published page already owns canonical target: ${conflict.slug}`);
    }
}

async function publishDraft(draft) {
    const { data: existingPost } = await supabase
        .from('posts')
        .select('id, created_at, thumbnail_url')
        .eq('slug', draft.slug)
        .single();

    const payload = {
        slug: draft.slug,
        title: draft.title,
        content: draft.html,
        category: inferCategoryFromTarget(draft.canonicalTarget),
        thumbnail_url: existingPost?.thumbnail_url || draft.topShops?.find((shop) => shop.imageUrl)?.imageUrl || null,
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

    await assertNoConflictingPublishedPage(brief);
    const draft = await createDraftFromBrief(brief);
    const result = await publishDraft(draft);
    await syncBrandGuideFlag(draft);

    console.log(JSON.stringify({
        ok: true,
        mode: result.mode,
        slug: draft.slug,
        title: draft.title,
        canonicalTarget: draft.canonicalTarget,
    }, null, 2));
}

main().catch((error) => {
    console.error(error.message || error);
    process.exit(1);
});
