const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// 旧サイトのGA4データから抽出したURL→タイトルのマッピング（クリーンタイトル）
const TITLE_MAP = {
    'fashionshop/sneakers/list': '海外スニーカーヘッズが利用する海外通販サイト おすすめ12選',
    'fashionshop/dressinn/shopreview': 'dressinnは安全です。６回利用したのでクーポン＆評判解説【購入方法も紹介】',
    'outdoorshop/list/bestshops': 'アウトドア海外通販サイトおすすめ10選！人気ランキングと選び方',
    'fashionbrand/converse/converse-list': 'コンバース海外サイト6選 日本に直送できるサイトから個人輸入がお得',
    'outdoorshop/trekkinn/shopreview-8': 'Trekkinnの評判は？お得なクーポン紹介と使ってみた感想',
    'overseasshop/manual-address': '海外通販 住所の書き方 順番は日本と同じでOK',
    'outdoorshop/rei/xtracahair-review': 'REIで買ってみた！評判は？実際に届く？レビュー＆買い方解説',
    'outdoorbrand/savotta/scandinavianoutdoor': 'Savotta買うならここがオススメ！テントサウナ＆バックパック',
    'bicycle/bicycle-list': '自転車 パーツ 海外通販14選 おすすめの安いサイトを比較！',
    'outdoorbrand/lasportiva/shopreview-6': 'スポルティバを安く買う方法！個人輸入できるサイト４選',
    'outdoorbrand/hilleberg/hb-shoplists': 'ヒルバーグのテントは安く買える！おすすめの海外通販サイト',
    'fashionbrand/diesel/bestbudget': 'DIESELは高い？正規品が半額以下で買えますよ。安く買う方法を解説',
    'outdoorbrand/hyperlite-mountain-gear/manual': 'Hyperlite Mountain Gear公式サイトから個人輸入する方法【簡単】',
    'outdoorshop/barrabes/shopreview-5': 'barrabesの送料やクーポンは？買ってみたので紹介！',
    'outdoorshop/list/ulbackpack': '海外で人気のULバックパック11選 すべて日本から購入可！',
    'outdoorbrand/msr/budgetshop-msr': 'MSRを安く買えるサイトを６つを紹介！海外通販でお得にゲットしよう',
    'outdoorshop/scandinavianoutdoor/shop-review': 'Scandinavian Outdoorで買ってみた。実際に届く？レビュー＆買い方解説',
    'outdoorbrand/haglofs/bestshop-8': 'アウトレットより安い！ホグロフスは海外通販がおすすめ',
    'fashionshop/lists/mens': 'メンズ海外ファッション通販サイト16選！おすすめと選び方',
    'outdoorshop/backpackingunited/manual-review': 'Backpacking Unitedの評判は？日本からの買い方を解説',
    'outdoorbrand/rab/bestshop': 'Rabはどこで買うのがいい？海外通販だったら安くて何でも揃う',
    'fashionshop/saksfifthavenue/saksoff5th-shopreview': 'Saks Off 5thの送料は？2回利用したので注意点＆買い方解説',
    'bicycle/wheel': 'ロード用ホイール海外通販６選 自転車のパーツは海外通販がお得。',
    'outdoorshop/ellis-brigham/ellis-shopreview': 'Ellis Brighamのクーポンは？ 個人輸入の評判や買い方を解説',
    'fashionbrand/gstar/bestshop-9': 'G-Star RAWは簡単に安く買えます。おすすめ海外通販４選',
    'outdoorshop/exxpozed/review': 'eXXpozed！買い方の手順を徹底解説 評判は？',
    'outdoorbrand/mountainhardwear/mh-shoplists': 'アウトレットより安い！マウンテンハードウェアは海外通販がおすすめ',
    'outdoorbrand/millet/bestshop-3': 'アウトレットより断然安いミレーの個人輸入！おすすめサイト３選',
    'outdoorbrand/osprey/bestshop-2': 'オスプレーは海外通販で安く買える！おすすめサイト３選',
    'outdoorshop/ldmountaincentre/shopreview-2': 'LD Mountain Centre の評判は？送料や買い方を解説',
    'overseasshop/tax': '海外通販サイトの関税について',
    'outdoorshop/ultralightoutdoorgear/shopreview-7': 'Ultralight Outdoor Gearで買ってみた。海外通販でNEMOをゲット！',
    'outdoorshop/sportpursuit/shopreview-9': 'Sportpursuitで超お得にアウトドア用品をゲット！70％は当たり前',
    'fashionshop/lists/all': 'ファッション海外通販53選 おすすめを厳選',
    'outdoorbrand/bigagnes/shopreview-4': 'ビッグアグネスはどこで買える？海外通販が安くておすすめ',
    'outdoorshop/list/free-ship': '送料無料のアウトドア海外通販３選！ テントを買う時におすすめ',
    'outdoorshop/alloutdoor/shopreview-3': 'alloutdoorのクーポンと送料を紹介！買い方なども解説します',
    'outdoorbrand/mountainequipment/bestshop-4': 'マウンテンイクイップメント海外通販サイトおすすめ３選！個人輸入が断然安い',
    'outdoorbrand/thermarest/bestshop-5': 'サーマレストおすすめ海外通販サイト3選！個人輸入が安い！',
    'outdoorshop/deporvillage/review-manual': 'deporvillageは日本に届く？評判と買い方を解説',
};

async function updateTitles() {
    let updated = 0;
    let notFound = 0;

    for (const [slug, title] of Object.entries(TITLE_MAP)) {
        const { error } = await supabase
            .from('posts')
            .update({ title })
            .eq('slug', slug);

        if (error) {
            console.error(`❌ Error updating ${slug}: ${error.message}`);
            notFound++;
        } else {
            console.log(`✅ Updated: /${slug}\n   → ${title}`);
            updated++;
        }
    }

    console.log(`\n📊 Done! Updated: ${updated}, Errors: ${notFound}`);
}

updateTitles();
