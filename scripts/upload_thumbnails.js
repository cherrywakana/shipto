const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value && !process.env[key.trim()]) {
            process.env[key.trim()] = value.trim();
        }
    });
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function uploadFile(slug, filePath) {
    const fileContent = fs.readFileSync(filePath);
    const fileName = `${slug}.webp`;

    console.log(`\n🚀 Uploading ${fileName} to storage...`);
    const { data, error } = await supabase.storage
        .from('shop-thumbnails')
        .upload(fileName, fileContent, {
            contentType: 'image/webp',
            upsert: true
        });

    if (error) {
        console.error(`  ❌ Error uploading ${fileName}:`, error.message);
        return;
    }

    // キャッシュバスターとしてタイムスタンプを付与
    const timestamp = Date.now();
    const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/shop-thumbnails/${fileName}?t=${timestamp}`;

    console.log(`  🔗 Updating database for ${slug}...`);
    const { error: dbError } = await supabase
        .from('shops')
        .update({ image_url: imageUrl })
        .eq('slug', slug);

    if (dbError) {
        console.error(`  ❌ Error updating DB for ${slug}:`, dbError.message);
    } else {
        console.log(`  ✨ Successfully updated ${slug} with ${imageUrl}`);
    }
}

async function start() {
    const assetsDir = path.join(__dirname, 'assets', 'shops');
    const downloadsShopsDir = path.join(require('os').homedir(), 'Downloads', 'directfound-shops');

    // 다운ロードフォルダにキャプチャ画像があれば手元に移動する
    if (fs.existsSync(downloadsShopsDir)) {
        console.log('--- Checking Downloads/directfound-shops/ for new captures ---');
        const dlFiles = fs.readdirSync(downloadsShopsDir).filter(f => f.endsWith('.webp'));

        dlFiles.forEach(f => {
            const oldPath = path.join(downloadsShopsDir, f);
            const newPath = path.join(assetsDir, f);
            fs.renameSync(oldPath, newPath);
            console.log(`  📥 Moved ${f} from Downloads to assets/shops/`);
        });
    }

    const args = process.argv.slice(2);

    // 引数（slug）があればそれだけを処理
    if (args.length > 0) {
        const slug = args[0];
        const filePath = path.join(assetsDir, `${slug}.webp`);
        if (fs.existsSync(filePath)) {
            await uploadFile(slug, filePath);
        } else {
            console.error(`Error: File not found at ${filePath}`);
        }
        return;
    }

    // 引数がない場合は assets ディレクトリ内の全ての .webp を処理
    console.log('\n--- Scanning scripts/assets/shops/ for .webp files ---');
    const files = fs.readdirSync(assetsDir).filter(f => f.endsWith('.webp'));

    if (files.length === 0) {
        console.log('No .webp files found in scripts/assets/shops/');
        return;
    }

    for (const file of files) {
        const slug = path.basename(file, '.webp');
        const filePath = path.join(assetsDir, file);
        await uploadFile(slug, filePath);
    }
}

start().catch(console.error);

