const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function checkAliExpress() {
  const { data, error } = await supabase.from('shops').select('*').ilike('slug', '%aliexpress%');
  if (error) {
    console.error('Error fetching shops:', error);
  } else {
    console.log('Found AliExpress shops:', JSON.stringify(data, null, 2));
  }
}
checkAliExpress();
