const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function uploadArticleThumbnail(slug, filePath) {
    const fileContent = fs.readFileSync(filePath);
    const fileName = `${slug}.webp`;

    console.log(`\n🚀 Uploading ${fileName} to article-thumbnails bucket...`);
    const { data, error } = await supabase.storage
        .from('article-thumbnails')
        .upload(fileName, fileContent, {
            contentType: 'image/webp',
            upsert: true
        });

    if (error) {
        console.error(`  ❌ Error uploading ${fileName}:`, error.message);
        return;
    }

    const timestamp = Date.now();
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/article-thumbnails/${fileName}?t=${timestamp}`;

    console.log(`  🔗 Updating database for posts slug: ${slug}...`);
    const { error: dbError } = await supabase
        .from('posts')
        .update({ thumbnail_url: imageUrl })
        .eq('slug', slug);

    if (dbError) {
        console.error(`  ❌ Error updating DB for ${slug}:`, dbError.message);
    } else {
        console.log(`  ✨ Successfully updated ${slug} with ${imageUrl}`);
    }
}

async function main() {
    const targets = [
        { slug: 'arcteryx-overseas-shopping-guide', path: 'public/images/articles/arcteryx-overseas-shopping-guide.webp' },
        { slug: 'kith-brand-overseas-shopping-guide', path: 'public/images/articles/kith-brand-overseas-shopping-guide.webp' },
        { slug: 'comme-des-garcons-overseas-shopping-guide', path: 'public/images/articles/comme-des-garcons-overseas-shopping-guide.webp' }
    ];

    for (const target of targets) {
        const fullPath = path.resolve(__dirname, '../', target.path);
        if (fs.existsSync(fullPath)) {
            await uploadArticleThumbnail(target.slug, fullPath);
        } else {
            console.warn(`File not found: ${fullPath}`);
        }
    }
}

main().catch(console.error);
