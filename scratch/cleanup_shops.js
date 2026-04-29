
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function updateShopFlags() {
  console.log('Starting DB cleanup and flag updates...')

  // 1. Delete shops
  const { error: delError } = await supabase
    .from('shops')
    .delete()
    .in('slug', ['kare', 'globalgolf'])
  
  if (delError) console.error('Error deleting shops:', delError)
  else console.log('Successfully deleted KARE and globalgolf.')

  // 2. Update ships_to_japan: false
  const noShipSlugs = ['anthropologie', 'bloomingdales', 'carters', 'disneystore', 'geekbuying']
  const { error: upError } = await supabase
    .from('shops')
    .update({ ships_to_japan: false, shipping_guide: '× 日本への直送不可' })
    .in('slug', noShipSlugs)

  if (upError) console.error('Error updating flags:', upError)
  else console.log('Successfully updated ships_to_japan: false for existing shops.')

  // 3. Add missing shops as no-ship
  const newNoShipShops = [
    {
      name: 'Hanna Andersson（ハナ・アンダーソン）',
      slug: 'hannaandersson',
      url: 'https://www.hannaandersson.com/',
      country: 'アメリカ',
      category: 'ホーム・ライフスタイル',
      ships_to_japan: false,
      shipping_guide: '× 日本への直送不可',
      description: '北欧デザインを取り入れた、高品質なオーガニックコットン素材のベビー・子供服ブランド。'
    },
    {
      name: "The Children's Place（チルドレンズプレイス）",
      slug: 'childrensplace',
      url: 'https://www.childrensplace.com/',
      country: 'アメリカ',
      category: 'ホーム・ライフスタイル',
      ships_to_japan: false,
      shipping_guide: '× 日本への直送不可',
      description: '米国最大級の子供服専門小売店。手頃な価格でトレンドの子供服が揃います。'
    }
  ]

  for (const shop of newNoShipShops) {
    const { error: insError } = await supabase
      .from('shops')
      .upsert(shop, { onConflict: 'slug' })
    if (insError) console.error(`Error adding ${shop.slug}:`, insError)
    else console.log(`Successfully added/updated ${shop.slug} as no-ship.`)
  }
}

updateShopFlags()
