const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】海外メンズファッション通販おすすめ10選！本格ハイブランドから限定スニーカーまで徹底解説';
const slug = 'mens-fashion-overseas-guide';
const category = 'ファッション';

const heroImg = '/mens-fashion-guide-hero.png';
const ssenseImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/ssense.webp';
const mrporterImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/mr-porter.webp';
const endImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/end-clothing.webp?t=1772403770389';
const hbxImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/hbx.webp';
const s24Img = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/24s.webp';
const farfetchImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/farfetch.webp';
const backcountryImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/backcountry.webp?t=1773492252144';
const musinsaImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/musinsa.webp?t=1773492275283';
const yooxImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/yoox.webp';
const sheinImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/shein.webp?t=1773536097437';

const content = `
## 妥協のない一着を、世界中のストックから「適正価格」で引き寄せる

<strong>メゾン・マルジェラ</strong>の名作、<strong>フィア・オブ・ゴッド（Fear of God）</strong>の最新作、あるいは入手困難な<strong>限定スニーカー</strong>——。日本のセレクトショップでは完売続き、あるいは定価が跳ね上がっているアイテムも、海外通販を駆使すれば、本国の適正価格で、しかも豊富なカラー・サイズから選ぶことができます。

メンズファッションにおける海外通販は、単なる節約術ではありません。それは、世界中のブティックを自分のクローゼットの一部として使いこなす、最もスマートな選択です。

本記事では、3,000件以上の海外通販実績に基づき、<strong>2026年現在、日本の男性が利用すべき「真に価値ある10のショップ」</strong>を厳選。カテゴリー別にその強みと、失敗しないための実務知識を徹底解説します。

---

## 1. ラグジュアリー＆モード：最高峰のキュレーション

ハイエンドなブランドを、最も安全に、かつ驚きの価格で手に入れるための本命ショップです。

### SSENSE（エッセンス）：ハイエンド・ストリートの絶対的リーダー
![SSENSE スクリーンショット](${ssenseImg})

カナダ・モントリオール発。ミニマルで洗練された視覚体験と、圧倒的な日本語対応で知られます。

*   <strong>主要ブランド</strong>: <strong>Maison Margiela</strong>, <strong>Fear of God ESSENTIALS</strong>, <strong>Rick Owens</strong>
*   <strong>利用のメリット</strong>: <strong>関税・消費税込み</strong>の価格表示のため、決済後の追加費用がありません。最短3日で日本に届くスピードも、国内通販と遜色ありません。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SSENSE 公式サイト ↗</a>
</div>

---

### MR PORTER（ミスターポーター）：世界最大のメンズ・クローゼット
![MR PORTER スクリーンショット](${mrporterImg})

イギリス発。男性のためにのみ編集された、世界最高級のオンラインストア。

*   <strong>主要ブランド</strong>: <strong>Brunello Cucinelli</strong>, <strong>Tom Ford</strong>, <strong>Zegna</strong>, <strong>Saint Laurent</strong>
*   <strong>利用のメリット</strong>: 徹底した「メンズ専門」の編集力。大人の男性にふさわしい上質な逸品が見つかります。梱包も非常に美しく、世界一のサービス体験と評されています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.mrporter.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MR PORTER 公式サイト ↗</a>
</div>

---

### 24S（トゥエンティーフォーエス）：LVMH直営、CELINEメンズを日本へ
![24S スクリーンショット](${s24Img})

LVMHグループ公式通販。<strong>Celine（セリーヌ）</strong> のメンズラインを直接、日本へ直送できる数少ない正規ルートを有しています。

---

## 2. ストリート＆スニーカー：世界の熱量を直送

### END. Clothing（エンド）：ストリート・スニーカーの世界的聖地
![END. スクリーンショット](${endImg})

イギリス・ニューカッスル発。最新のスニーカーから、注目の新鋭ストリートブランドまでを網羅。

*   <strong>主要ブランド</strong>: <strong>Nike</strong>, <strong>Adidas</strong>, <strong>Stone Island</strong>, <strong>Moncler</strong>
*   <strong>利用のメリット</strong>: 限定スニーカーの抽選システムが非常に使いやすい。また、プロダクト写真のクオリティが極めて高く、サイズ感や素材感がイメージしやすいのが特徴です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END. 公式サイト ↗</a>
</div>

---

### HBX（エイチビーエックス）：Hypebeastが運営する、感度の頂点
![HBX スクリーンショット](${hbxImg})

ファッションメディア「Hypebeast」が手掛けるセレクトショップ。常に「今、何が流行っているか」という最前線のブランドが並びます。

---

## 3. テックウェア＆ライフスタイル

### Backcountry（バックカントリー）：ゴープコア・テックウェアの本命
![Backcountry スクリーンショット](${backcountryImg})

米国最大級のアウトドアショップ。近年人気の「ゴープコア」スタイルを代表する <strong>Arc\'teryx（アークテリクス）</strong> 等の入手ルートとして欠かせません。

---

## 4. 利便性と網羅性の最強ショップ

### FARFETCH（ファーフェッチ）：世界最大級の在庫を横断検索
世界中のセレクトショップと繋がる巨大モール。アーカイブの名作から最新作まで、メンズの選択肢は無限大です。

### MUSINSA（ムシンサ）：韓国のデザイナーズ・ストリートの総本山
韓国No.1プラットフォーム。本場の最新トレンドを、公式正規販売店として日本へ直送。

### YOOX（ユークス）：ブランドアウトレットの神サイト
憧れのブランドが最大80%〜90%OFF。国内配送・国内返品に対応し、利便性は随一です。

### SHEIN（シーイン）メンズ：圧倒的物量のプチプラ
トレンドのアイテムを、驚きの低価格で。日常のワードローブを賢く補充するのに最適。

---

## 5. 失敗しないための「メンズ海外通販・黄金ルール」

### ① 関税込み（DDP）サイトを味方につける
特に関税率の高い「革靴」や「革製品」を狙うなら、<strong>SSENSE</strong> や <strong>MR PORTER</strong> などの「関税込み表示（DDP）」サイトを選んでください。最終価格が確定している安心感は格別です。

### ② サイズ表記の比較に慣れる
海外サイトにより IT, UK, US 表記が異なります。迷ったら必ず <strong>Size Guide</strong> を開き、モデルの身長と着用サイズ（例: Model is 185cm and wears Size M）を参考にしてください。

### ③ 届いたらすぐに「検品」
海外通販は中身が無事なら箱のダメージは許容される傾向にあります。到着したらすぐに開封し、<strong>「商品本体に傷はないか」「タグや付属品は揃っているか」</strong>をチェック。優良ショップなら万が一の返品も、集荷付きでスムーズに行えます。

---

## 結論：あなたの「こだわり」に合わせたショップ選びを

メンズファッションの海外通販は、単なる買い物以上の「賢い投資」です。

1. <strong>至極のモードと信頼</strong>を求めるなら <strong>SSENSE</strong>。
2. <strong>最高のセレクトと体験</strong>を味わうなら <strong>MR PORTER</strong>。
3. <strong>ストリートの熱量</strong>を直接手に入れたいなら <strong>END.</strong>。

まずは一つのショップを覗くことから始めてみてください。世界中の素晴らしいファッションは、あなたのクリック一つで自宅へと繋がっています。
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
    console.log('Successfully published MENS FASHION GUIDE Ver 3.9 - THE TOP 10!');
    process.exit(0);
  }
}
publishArticle();
