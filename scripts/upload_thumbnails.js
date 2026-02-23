const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const shops = [
    { slug: 'cettire', filePath: 'scripts/temp_assets/cettire.webp' },
    { slug: 'the-outnet', filePath: 'scripts/temp_assets/the-outnet.webp' },
    { slug: 'lookfantastic', filePath: 'scripts/temp_assets/lookfantastic.webp' },
    { slug: 'giglio', filePath: 'scripts/temp_assets/giglio.webp' },
    { slug: 'sneakersnstuff', filePath: 'scripts/temp_assets/sneakersnstuff.webp' }
];

async function upload() {
    for (const shop of shops) {
        const fileContent = fs.readFileSync(shop.filePath);
        const fileName = `${shop.slug}.webp`;

        console.log(`Uploading ${fileName}...`);
        const { data, error } = await supabase.storage
            .from('shop-thumbnails')
            .upload(fileName, fileContent, {
                contentType: 'image/webp',
                upsert: true
            });

        if (error) {
            console.error(`Error uploading ${fileName}:`, error.message);
            continue;
        }

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shop-thumbnails/${fileName}`;

        console.log(`Updating database for ${shop.slug}...`);
        const { error: dbError } = await supabase
            .from('shops')
            .update({ image_url: imageUrl })
            .eq('slug', shop.slug);

        if (dbError) {
            console.error(`Error updating DB for ${shop.slug}:`, dbError.message);
        } else {
            console.log(`Successfully updated ${shop.slug} with ${imageUrl}`);
        }
    }
}

upload();
