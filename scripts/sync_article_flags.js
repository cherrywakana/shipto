const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function syncFlags() {
    console.log('🔄 Starting sync of brand article flags...');

    // 1. Get all brand guide articles
    const { data: posts, error: postError } = await supabase
        .from('posts')
        .select('slug')
        .eq('category', 'ブランド');

    if (postError) {
        console.error('❌ Error fetching posts:', postError.message);
        return;
    }

    const brandSlugsWithArticles = posts.map(p => p.slug.replace('-overseas-shopping-guide', ''));
    console.log(`📝 Found ${brandSlugsWithArticles.length} brands with articles.`);

    // 2. Update brands table
    for (const slug of brandSlugsWithArticles) {
        const { error: updateError } = await supabase
            .from('brands')
            .update({ has_guide_article: true })
            .eq('slug', slug);
        
        if (updateError) {
            if (updateError.message.includes('column "has_guide_article" of relation "brands" does not exist')) {
                console.error('❌  CRITICAL: The column "has_guide_article" does not exist in the "brands" table.');
                console.log('\n👉 PLEASE RUN THIS SQL IN SUPABASE DASHBOARD FIRST:\n');
                console.log('ALTER TABLE brands ADD COLUMN has_guide_article BOOLEAN DEFAULT false;');
                return;
            }
            console.error(`❌ Error updating brand ${slug}:`, updateError.message);
        } else {
            console.log(`✅ Synced flag for: ${slug}`);
        }
    }

    console.log('✨ Sync completed!');
}

syncFlags();
