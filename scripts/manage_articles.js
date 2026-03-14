const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const fs = require('fs');
const path = require('path');

/**
 * Uploads a local image file to Supabase Storage and returns the public URL.
 * @param {string} localPath - Path to the local image file.
 * @param {string} fileName - Destination filename in storage.
 * @returns {Promise<string|null>} - The public URL or null on failure.
 */
async function uploadThumbnail(localPath, fileName) {
    if (!fs.existsSync(localPath)) {
        console.error(`❌ Local image not found: ${localPath}`);
        return null;
    }

    const { execSync } = require('child_process');
    const tempWebpPath = localPath.replace(path.extname(localPath), '.webp');

    try {
        console.log(`🖼️ Converting ${path.basename(localPath)} to WebP using ffmpeg...`);
        execSync(`ffmpeg -i "${localPath}" -y "${tempWebpPath}" -loglevel error`);

        const fileContent = fs.readFileSync(tempWebpPath);
        const fileNameWebp = fileName.replace(path.extname(fileName), '.webp');

        console.log(`🚀 Uploading eye-catch image to storage: ${fileNameWebp}...`);
        const { data, error } = await supabase.storage
            .from('article-thumbnails')
            .upload(fileNameWebp, fileContent, {
                contentType: 'image/webp',
                upsert: true
            });

        // Cleanup temp file
        if (fs.existsSync(tempWebpPath) && tempWebpPath !== localPath) {
            fs.unlinkSync(tempWebpPath);
        }

        if (error) {
            console.error('❌ Error uploading thumbnail:', error.message);
            return null;
        }

        const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article-thumbnails/${fileNameWebp}`;
        console.log(`✅ Image uploaded: ${publicUrl}`);
        return publicUrl;
    } catch (e) {
        console.error('❌ Error during image conversion/upload:', e.message);
        return null;
    }
}

/**
 * Checks if an article for the specified brand already exists.
 * @param {string} brandSlug - The slug of the brand.
 * @returns {Promise<boolean>} - True if exists, false otherwise.
 */
async function checkArticleExists(brandSlug) {
    console.log(`🔍 Checking if article exists for: ${brandSlug}...`);

    // Check by slug pattern (e.g., 'salomon-')
    const { data: slugMatch, error: slugError } = await supabase
        .from('posts')
        .select('id, title, slug')
        .ilike('slug', `${brandSlug.toLowerCase()}-%`);

    if (slugError) {
        console.error('Error checking duplicate slug:', slugError.message);
        return true;
    }

    if (slugMatch && slugMatch.length > 0) {
        console.log(`⚠️  Duplicate Found! Title: "${slugMatch[0].title}" (Slug: ${slugMatch[0].slug})`);
        return true;
    }

    return false;
}

/**
 * Deletes an existing article by slug.
 */
async function deleteArticleBySlug(slug) {
    console.log(`🗑️ Deleting existing article: ${slug}...`);
    const { error } = await supabase.from('posts').delete().eq('slug', slug);
    if (error) console.error('Error deleting article:', error.message);
}

/**
 * Inserts a new article into the database with duplicate check.
 * @param {Object} postData - The article data.
 * @param {string} [localImagePath] - Optional local path to thumbnail for auto-upload.
 */
async function publishArticle(postData, localImagePath = null) {
    // 0. Ensure current year in title (2026)
    const currentYear = new Date().getFullYear();
    if (postData.title.includes('2025')) {
        console.warn('⚠️ Warning: Title contains 2025 but current year is ' + currentYear);
        postData.title = postData.title.replace('2025', currentYear.toString());
    }

    // 1. Extract brand slug
    const brandSlug = postData.slug.split('-')[0];

    // 2. Systematic Check
    let existingThumbnailUrl = null;
    let existingCreatedAt = null;
    const { data: existingPost } = await supabase
        .from('posts')
        .select('thumbnail_url, created_at')
        .eq('slug', postData.slug)
        .single();
    if (existingPost) {
        if (existingPost.thumbnail_url) existingThumbnailUrl = existingPost.thumbnail_url;
        if (existingPost.created_at) existingCreatedAt = existingPost.created_at;
    }

    if (process.env.OVERWRITE_POST === 'true') {
        await deleteArticleBySlug(postData.slug);
    } else {
        const exists = await checkArticleExists(brandSlug);
        if (exists) {
            console.error(`❌  Creation ABORTED: An article for ${brandSlug} already exists.`);
            process.exit(1);
        }
    }

    // Handle timestamps
    if (existingCreatedAt) {
        postData.created_at = existingCreatedAt;
        console.log('ℹ️ Preserving original created_at:', existingCreatedAt);
    } else if (!postData.created_at) {
        postData.created_at = new Date().toISOString();
        console.log('ℹ️ Setting new created_at:', postData.created_at);
    }

    // Double-check if we need to preserve existing thumbnail
    if (!postData.thumbnail_url && !localImagePath && existingThumbnailUrl) {
        postData.thumbnail_url = existingThumbnailUrl;
        console.log('ℹ️ Preserving existing thumbnail URL:', existingThumbnailUrl);
    }

    // 3. Handle image upload if local path provided
    if (localImagePath) {
        if (localImagePath.startsWith('http')) {
            // If it's already a URL, use it directly
            postData.thumbnail_url = localImagePath;
        } else {
            const fileName = `${postData.slug}${path.extname(localImagePath)}`;
            const uploadedUrl = await uploadThumbnail(localImagePath, fileName);
            if (uploadedUrl) {
                postData.thumbnail_url = uploadedUrl;
            }
        }
    }

    // 4. Insert
    console.log(`🚀 Publishing article: ${postData.title}...`);
    const { data, error } = await supabase
        .from('posts')
        .insert([postData]);

    if (error) {
        console.error('❌  Error publishing article:', error.message);
        process.exit(1);
    }

    console.log('✅ Article published successfully!');

    // 5. Update brand flag (Best effort - won't fail if column doesn't exist)
    try {
        const brandSlugForFlag = postData.slug.replace('-overseas-shopping-guide', '');
        await supabase
            .from('brands')
            .update({ has_guide_article: true })
            .eq('slug', brandSlugForFlag);
        console.log(`ℹ️ Updated has_guide_article flag for: ${brandSlugForFlag}`);
    } catch (e) {
        // Silently ignore if column doesn't exist yet
    }
}

// Module exports for use in other generation scripts
module.exports = { checkArticleExists, publishArticle, uploadThumbnail, deleteArticleBySlug };

// To use via command line (example): 
// node scripts/manage_articles.js check salomon
if (require.main === module) {
    const action = process.argv[2];
    const target = process.argv[3];
    if (action === 'check' && target) {
        checkArticleExists(target);
    }
}
