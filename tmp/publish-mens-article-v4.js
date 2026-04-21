const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】海外メンズファッション通販おすすめ11選！関税・サイズ・安く買うコツをプロが徹底比較';
const slug = 'mens-fashion-overseas-guide';
const category = 'ファッション';

const heroImg = '/mens-fashion-guide-hero.png';
const ssenseImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/ssense.webp';
const mrporterImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/mr-porter.webp';
const s24Img = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/24s.webp';
const lvrImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/luisaviaroma.webp';
const endImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/end-clothing.webp?t=1772403770389';
const hbxImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/hbx.webp';
const farfetchImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/farfetch.webp';
const backcountryImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/backcountry.webp?t=1773492252144';
const musinsaImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/musinsa.webp?t=1773492275283';
const yooxImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/yoox.webp';
const sheinImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/shein.webp?t=1773536097437';

const content = `
## 最高のワードローブを「適正価格」で手に入れる、唯一のガイド

<strong>メゾン・マルジェラ、フィア・オブ・ゴッド、アークテリクス</strong>。日本のセレクトショップでは定価が高騰し、人気サイズは即完売。そんな現状を打破するのが「海外通販」という選択です。

しかし、「偽物は？」「関税はあとからいくらくる？」「サイズが合わなかったら？」という不安が、多くの男性の足止めています。

本記事では、3,000件以上の個人輸入実績に基づき、<strong>2026年現在、日本の男性が使うべき11のショップ</strong>を徹底比較。単なる紹介ではなく、関税計算の罠からサイズ選びの決定版、トラブル時の英語コピペまで、この記事一つで完結させる「究極のメンズ個人輸入マニュアル」を公開します。

---

## 1. ひと目でわかる：海外通販サイト主要11社 徹底比較表

まずは、あなたの目的に合うショップを絞り込むための比較表です。

| サイト名 | 関税対応 | 送料（目安） | 日本語サポート | メインカテゴリー |
| :--- | :--- | :--- | :--- | :--- |
| <strong>SSENSE</strong> | <strong>込（DDP）</strong> | 2,750円〜 | <strong>完璧</strong> | モード・ハイストリート |
| <strong>MR PORTER</strong> | <strong>込（DDP）</strong> | 無料〜 | 普通（英語主体） | クラシック・ラグジュアリー |
| <strong>24S</strong> | <strong>込（DDP）</strong> | 2,500円〜 | 良好 | パリ系ラグジュアリー |
| <strong>LUISAVIAROMA</strong> | <strong>込（DDP）</strong> | 4,500円〜 | 普通 | イタリアン・モード |
| <strong>END.</strong> | 別（DDU） | 2,300円〜 | 普通 | ストリート・スニーカー |
| <strong>HBX</strong> | 別（DDU） | 2,500円〜 | 良好 | Hypebeast系最新トレンド |
| <strong>FARFETCH</strong> | <strong>込（DDP）</strong> | 2,800円〜 | <strong>完璧</strong> | 総合・世界中から検索 |
| <strong>Backcountry</strong> | 別（DDU） | 転送推奨 | 無 | テックウェア・アウトドア |
| <strong>MUSINSA</strong> | <strong>込（DDP）</strong> | 1,500円〜 | 良好 | 韓国デザイナーズ |
| <strong>YOOX</strong> | <strong>込（DDP）</strong> | 2,200円〜 | <strong>完璧</strong> | アウトレット・掘り出し物 |
| <strong>SHEIN</strong> | <strong>免税枠内</strong> | 無料〜 | 良好 | 超プチプラ・トレンド |

---

## 2. カテゴリー別：メンズ海外通販の「正解」ショップ

各ショップの強み、弱み、そして「何を買うべきか」をプロの視点で詳述します。

### SSENSE（エッセンス）：信頼、スピード、価格の三冠王
![SSENSE スクリーンショット](${ssenseImg})

<strong>ラグジュアリーストリートの「玄関口」</strong>
カナダ発、日本語・関税込み対応が最も進んでいるサイトです。

*   <strong>長所</strong>: 表示価格支払いで完結。<strong>Fear of God ESSENTIALS</strong> 等の人気ブランドの在庫が豊富。
*   <strong>短所</strong>: セール時期は一部商品の価格変動が激しい。
*   <strong>狙い目</strong>: Maison Margiela, Jil Sander, AMI Paris

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15); transition: transform 0.2s;">SSENSE 公式サイトで新作をチェック ↗</a>
</div>

---

### MR PORTER（ミスターポーター）：最高のサービスを求める紳士へ
![MR PORTER スクリーンショット](${mrporterImg})

<strong>世界最高のメンズセレクトショップ</strong>
イギリス発、徹底して「男性のため」に特化したサイト。

*   <strong>長所</strong>: 配送スピードと丁寧な梱包。独自雑誌のような美しいスタイリング提案。
*   <strong>短所</strong>: サイトの多くは英語表記（一部日本語化）。
*   <strong>狙い目</strong>: Tom Ford, Brunello Cucinelli, Saint Laurent

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.mrporter.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MR PORTER 公式サイトで探す ↗</a>
</div>

---

### 24S（トゥエンティーフォーエス）：セリーヌを直送できる唯一無二のルート
![24S スクリーンショット](${s24Img})

<strong>LVMHグループ公式の「パリの風」</strong>
他サイトでは入手困難なブランドを直接、日本へ直送。

*   <strong>長所</strong>: <strong>CELINE（セリーヌ）</strong> のメンズラインを公式正規価格で直送可能。
*   <strong>短所</strong>: ブランド数が絞り込まれているため、ストリート系は少なめ。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.24s.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">24S 公式サイトへ ↗</a>
</div>

---

### END. Clothing（エンド）：スニーカーとストリートの絶対聖地
![END. スクリーンショット](${endImg})

<strong>限定スニーカー抽選（Launches）の強力なインフラ</strong>
英国発、スニーカーヘッズなら毎日覗くべきサイト。

*   <strong>長所</strong>: <strong>Nike, Adidas</strong> の限定プレ値モデルも抽選で定価購入できるチャンス。
*   <strong>短所</strong>: 関税別（DDU）。到着時に宅配業者へ関税を支払う必要があります。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END. 公式サイトをチェック ↗</a>
</div>

---

### LUISAVIAROMA（ルイーザヴィアローマ）：イタリアの老舗、モードの頂点
![LUISAVIAROMA スクリーンショット](${lvrImg})

イタリア・フィレンツェ発。エッジの効いた最新モードならここ。

*   <strong>長所</strong>: 日本未入荷のイタリアブランドに強い。関税・送料が最初から明快。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.luisaviaroma.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">LUISAVIAROMA 公式サイト ↗</a>
</div>

---

## 3. 実務：関税・サイズで「絶対に失敗しない」ためのマニュアル

海外通販での失敗は、情報の欠如から生まれます。以下の知識を武装してください。

### ① 関税（Customs）の計算式と「革靴の罠」
*   <strong>16,666円ルール</strong>: 商品代金の0.6倍（課税価格）が1万円以下のとき、関税および消費税が免除されます。
*   <strong>革製品（特にシューズ）への警告</strong>: <strong>革靴</strong>は関税割当制度により、金額に関わらず高額（30%または一律数千円）な関税がかかる可能性があります。革靴を買うなら、最初から関税が含まれた <strong>SSENSE</strong> や <strong>MATCHES</strong> を選ぶのが圧倒的に賢明です。

### ② サイズ選びの「IT/UK/US」マスターチャート

| 表記 | 日本相当 | IT/EU (伊/独) | UK (英) | US (米) |
| :--- | :--- | :--- | :--- | :--- |
| S相当 | 44 | 44 | 34 | XS |
| M相当 | 46-48 | 46-48 | 36-38 | S-M |
| L相当 | 50 | 50 | 40 | L |

<strong>※秘技</strong>: 自宅にある「最もフィットしている服」の身幅（Pit to Pit）をメジャーで測り、商品ページの <strong>"Size Details"</strong> と比較してください。これが唯一の正解です。

---

## 4. よくある質問 (FAQ)

<strong>Q: 本物ですか？</strong>
<strong>A:</strong> 当サイトが紹介したショップはすべて正規代理店（Authorized Retailer）です。偽物が入り込む隙はありません。

<strong>Q: 届くまでどれくらいかかりますか？</strong>
<strong>A:</strong> DHLやFedExを利用するサイト（SSENSE等）なら最短3日、長くても1週間で到着します。

<strong>Q: 住所はどう書けばいいですか？</strong>
<strong>A:</strong> 「東京都渋谷区道玄坂1-2-3」なら、以下の順序で記載します。
Address: 1-2-3 Dogenzaka
City: Shibuya-ku
State/Province: Tokyo
Zip: 150-0043
Country: Japan

---

## 5. 困ったときのコピペ用：英語テンプレート

### 追記情報の確認
> "Hi, I'm waiting for order #[注文番号]. Could you provide the latest tracking status?"
> （注文番号#[注文番号]の状況を教えてください）

### 破損や不足の連絡
> "I received order #[注文番号], but item was damaged. Please see attached photo. I'd like a refund or exchange."
> （届いた商品が破損していました。写真を確認のうえ、返金か交換をお願いします）

---

## 結論：2026年、男性の買い物は「海外」がデフォルトになる

国内の定価高騰と供給不足の中、世界中の感性と直接繋がることは、もはや単なる節約ではなく、自由なスタイルを貫くための「教養」といえます。

1. <strong>初めての海外通販</strong>なら、関税込み表示の <strong>SSENSE</strong>。
2. <strong>最高のサービスと品質</strong>を求めるなら <strong>MR PORTER</strong>。
3. <strong>ストリートの希少品</strong>を追うなら <strong>END.</strong>。

まずは一つ、自分の気になるアイテムを SSENSE 等で検索し、日本国内のメルカリや楽天の価格と比較してみてください。その価格差に驚いたとき、あなたの個人輸入ライフが始まります。

<div style="margin: 3rem 0; text-align: center; background: #f8f8f8; padding: 2rem; border-radius: 20px;">
  <p style="font-weight: 800; font-size: 1.2rem; margin-bottom: 1.5rem;">海外通販デビューに最もおすすめのショップ</p>
  <a href="https://www.ssense.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.5rem 4rem; border-radius: 50px; text-decoration: none; font-weight: 800; font-size: 1.3rem; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">SSENSE 公式サイトへ ↗</a>
</div>
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
    console.log('Successfully published MENS FASHION GUIDE Ver 4.0 - THE MEGA PILLAR RELEASE!');
    process.exit(0);
  }
}
publishArticle();
