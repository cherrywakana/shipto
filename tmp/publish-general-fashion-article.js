const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】海外ファッション通販サイトおすすめ13選！ラグジュアリーからプチプラまで徹底比較';
const slug = 'overseas-fashion-sites-guide';
const category = 'ファッション';

const heroImg = '/general-fashion-guide-hero.png';
const ssenseImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/ssense.webp';
const farfetchImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/farfetch.webp';
const s24Img = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/24s.webp';
const mytheresaImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/mytheresa.webp';
const endImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/end-clothing.webp?t=1772403770389';
const hbxImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/hbx.webp';
const musinsaImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/musinsa.webp?t=1773492275283';
const codibookImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/codibook.webp?t=1773536092629';
const sheinImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/shein.webp?t=1773536097437';
const temuImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/temu.webp?t=1773536098726';
const ciderImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/cider.webp';
const yooxImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/yoox.webp';
const shopbopImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/shopbop.webp';

const content = `
## 世界中のクローゼットへ、あなたの部屋からアクセスする時代

<strong>メゾン・マルジェラ</strong>の新作、<strong>セリーヌ</strong>のバッグ、あるいは<strong>最新の韓国デザイナーズブランド</strong>や、驚きの低価格で揃うトレンドアイテム——。今のファッションシーンにおいて、海外通販はもはや特別なことではありません。

しかし、無数にあるサイトの中から「どこが本当に安全で、どこが最もお得なのか」を見極めるのは至難の業です。

本記事では、3,000件以上の海外通販実績に基づき、<strong>2026年現在、日本から利用すべき「真の勝ち組」13ショップ</strong>を厳選。ラグジュアリーからプチプラまで、カテゴリー別にその強みと注意点を徹底比較します。この記事を読めば、あなたのファッションライフは劇的にアップデートされるはずです。

---

## 1. 世界の2大旗艦店：まずはここから探すべき

海外通販を語る上で避けて通れない、圧倒的な信頼と物量を誇る2大ショップです。

### SSENSE（エッセンス）：モードの最前線、価格の透明性は世界随一
![SSENSE スクリーンショット](${ssenseImg})

カナダ・モントリオール発。エッジの効いたセレクトと、圧倒的な日本語対応で知られます。

*   <strong>強み</strong>: ハイエンドなモードブランドの網羅性が高く、日本語サポートが極めて優秀。
*   <strong>選ばれる理由</strong>: <strong>関税・消費税込み</strong>の価格表示のため、決済後の追加費用がありません。最短3日で日本に届くスピード感も魅力です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SSENSE 公式サイト ↗</a>
</div>

---

### FARFETCH（ファーフェッチ）：世界中のブティックを横断検索
![FARFETCH スクリーンショット](${farfetchImg})

特定の倉庫を持たず、世界2,000以上のセレクトショップの在庫を一つに繋ぐ巨大プラットフォーム。

*   <strong>強み</strong>: <strong>世界最大級の在庫量</strong>。他で売り切れたサイズも、世界中のどこかのブティックに残っていれば発見できます。

---

## 2. ラグジュアリーの深淵：公式直営・名門ブティック

### 24S（トゥエンティーフォーエス）：LVMHグループ直営の格別な品格
![24S スクリーンショット](${s24Img})

<strong>ルイ・ヴィトン・モエ・ヘネシー（LVMH）</strong>グループ公式の通販サイト。

*   <strong>格別な点</strong>: 他サイトでは不可能な、<strong>CELINE（セリーヌ）</strong>や<strong>DIOR（ディオール）</strong>の正規品を直接日本へ配送可能。パリの老舗百貨店「ボン・マルシェ」の感性を体験できます。

---

### MYTHERESA（マイテレサ）：エレガンスと丁寧な高級梱包
![Mytheresa スクリーンショット](${mytheresaImg})

ドイツ発。ラグジュアリーを上品にエディット。有名な<strong>イエローボックス</strong>での梱包は、自分へのご褒美に最適です。

---

## 3. ストリート＆スニーカー：世界の熱量をそのままに

### END.（エンド）：メンズ・ストリートの世界的旗手
![END. スクリーンショット](${endImg})

イギリス発。最新の限定スニーカーから、ハイエンドなストリートウェアまで。

*   <strong>魅力</strong>: <strong>Nike, Adidas</strong> の限定コラボや、<strong>Stone Island, Moncler</strong> 等の人気ブランドの品揃えは圧巻。モデルの着こなしも非常に参考になります。

---

### HBX（エイチビーエックス）：Hypebeastが運営する感度の頂点
![HBX スクリーンショット](${hbxImg})

ファッションメディア「Hypebeast」が手掛けるセレクトショップ。

*   <strong>魅力</strong>: 常に<strong>「今、最もホットなブランド」</strong>が並びます。トレンドの最先端を突き進みたいストリートファンに。

---

## 4. 韓国ファッション：本場のデザイナーズ、直送便

### MUSINSA（ムシンサ）：韓国No.1。本物のK-トレンドならここ
![Musinsa スクリーンショット](${musinsaImg})

韓国国内シェアNo.1。<strong>MARDI MERCREDI</strong> などの公式正規販売店として、本場の流行をそのまま直送。

---

### Codibook（コーディブック）：コーデで選ぶ、失敗しない韓国ファッション
![Codibook スクリーンショット](${codibookImg})

膨大な量のアイテムを組み合わせた「コーディネート」単位で買い物ができる、独自の体験を提供。

---

## 5. 驚異の安さとトレンド：プチプラ三銃士

### SHEIN（シーイン）：説明不要の世界王者
![SHEIN スクリーンショット](${sheinImg})

数万点の新作と、圧倒的な低価格。トレンドを使い捨てるのではなく、賢く日常に取り入れるインフラ。

---

### Temu（テム）：安さの限界を突破する新興勢力
![Temu スクリーンショット](${temuImg})

2023年以降、日本を席巻。驚愕の割引率で、ファッションから小物まで「最安値」を更新し続けます。

---

### Cider（サイダー）：デザインと品質の「高見え」コンテンポラリー
![Cider スクリーンショット](${ciderImg})

「安いのに質が良い」とSNSで爆発的ヒット。独自の世界観を持つデザインが30代女性にも人気。

---

## 6. アウトレットとセレクト：賢く得する決定打

### YOOX（ユークス）：ハイブランドを「公式アウトレット」で攻略
![YOOX スクリーンショット](${yooxImg})

憧れのブランドが最大80%〜90%OFF。日本国内拠点のように機能する物流インフラは唯一無二です。

---

### SHOPBOP（ショップボップ）：Amazonグループの絶大なる安心感
![SHOPBOP スクリーンショット](${shopbopImg})

Amazon傘下、NYの旬なブランドを扱う。100ドル以上で送料無料かつ高速配送という、圧倒的な利便性。

---

## 7. 失敗しないための「海外通販・実践ガイド」

### ① 関税（DDP vs DDU）の仕組み
*   <strong>DDP (関税込み)</strong>: SSENSE, 24S 等。支払額＝全て。追加費用なし。
*   <strong>DDU (関税抜き)</strong>: 到着時に支払うもの。目安は<strong>課税価格（商品代金×0.6）が1万円（つまり支払額約16,666円）以下</strong>なら免税です。

### ② サイズ選びの「インチ・単位」変換
海外サイトにより IT, FR, UK, US 表記が異なります。必ずサイト内の <strong>Size Guide</strong> を開き、自分のヌード寸法（胸囲・腰囲等）と照らし合わせるのが、唯一にして最強の回避策です。

### ③ トラブルを未然に防ぐ「ショップ選定」
当サイト <strong>Original Price</strong> が掲載しているのは、以下の基準をクリアしたショップのみです。
1. <strong>正規代理店契約</strong>があり、真贋（本物であること）が保証されていること。
2. <strong>日本への配送インフラ</strong>が明確であり、実績があること。

---

## 結論：あなたの「こだわり」に合わせて窓口を使い分ける

世界中からファッションを取り寄せることは、もはや特別なスキルではありません。

*   <strong>「最高級を最高の信頼で」</strong> → <strong>SSENSE / 24S</strong>
*   <strong>「世界中から掘り出し物を」</strong> → <strong>FARFETCH / YOOX</strong>
*   <strong>「最旬トレンドを最安値で」</strong> → <strong>SHEIN / Cider / MUSINSA</strong>

自分の求める価値がどこにあるかを見定め、これらのショップを賢く使い分けてください。あなたのクローゼットが世界と繋がる時、ファッションの楽しみ方は無限に広がります。
`;

async function publishArticle() {
  await supabase.from('posts').delete().eq('slug', slug);

  const { error } = await supabase
    .from('posts')
    .insert([{ 
      title, 
      slug, 
      content, 
      category, 
      created_at: new Date().toISOString(),
      thumbnail_url: heroImg 
    }]);

  if (error) {
    console.error('Error publishing:', error);
    process.exit(1);
  } else {
    console.log('Successfully published GENERAL FASHION GUIDE Ver 3.9 - THE DEFINITIVE 13!');
    process.exit(0);
  }
}
publishArticle();
