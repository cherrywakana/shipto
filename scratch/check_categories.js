
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function getCategories() {
  const { data, error } = await supabase
    .from('shops')
    .select('category')

  if (error) {
    console.error('Error fetching categories:', error)
    return
  }

  const categoryCounts = data.reduce((acc, shop) => {
    const cat = shop.category || 'Uncategorized'
    acc[cat] = (acc[cat] || 0) + 1
    return acc
  }, {})

  console.log('Category Counts:', JSON.stringify(categoryCounts, null, 2))
}

getCategories()
