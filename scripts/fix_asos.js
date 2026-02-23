const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function fixASOS() {
    const { data: shop } = await supabase.from('shops').select('*').eq('slug', 'asos').single();

    if (!shop) return;

    // テキストにすでに追記句が含まれていなければ追記
    const appendShipping = !shop.shipping_guide.includes('公式サイトでご確認') ? ' 最新の状況は公式サイトでご確認ください。' : '';
    const appendTax = !shop.tax_guide.includes('公式サイトでご確認') ? ' 最新のルールは公式サイトでご確認ください。' : '';
    const appendFee = !shop.fee_guide.includes('公式サイトでご確認') ? ' 最新の料金は公式サイトでご確認ください。' : '';

    const { error } = await supabase.from('shops').update({
        shipping_url: null,
        tax_url: null,
        fee_url: null,
        shipping_guide: shop.shipping_guide + appendShipping,
        tax_guide: shop.tax_guide + appendTax,
        fee_guide: shop.fee_guide + appendFee
    }).eq('slug', 'asos');

    if (error) {
        console.error('Error fixing ASOS:', error);
    } else {
        console.log('Successfully removed invalid URLs and updated text for ASOS.');
    }
}

fixASOS();
