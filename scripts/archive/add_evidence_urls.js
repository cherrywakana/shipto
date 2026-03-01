const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function addEvidenceUrls() {
    const { error } = await supabase.from('shops').update({
        shipping_url: 'https://www.asos.com/customer-care/delivery/',
        tax_url: 'https://www.asos.com/customer-care/delivery/will-i-have-to-pay-customs-charges-on-my-order/',
        fee_url: 'https://www.asos.com/customer-care/delivery/delivery-times-costs-for-my-country/'
    }).eq('slug', 'asos');

    if (error) {
        console.error('Error updating ASOS:', error);
    } else {
        console.log('Successfully added evidence URLs to ASOS');
    }
}

addEvidenceUrls();
