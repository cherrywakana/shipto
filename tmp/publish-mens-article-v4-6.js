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
const asosImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/asos.webp?t=1773492251025';
const musinsaImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/musinsa.webp?t=1773492275283';
const yooxImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/yoox.webp';
const sheinImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/shein.webp?t=1773536097437';

// HTML Table for comparison
const comparisonTableHtml = `
<div style="overflow-x: auto; margin: 2rem 0;">
  <table style="width: 100%; border-collapse: collapse; min-width: 600px; border: 1px solid #eee;">
    <thead>
      <tr style="background: #111; color: #fff;">
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">サイト名</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">関税対応</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">送料</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">カテゴリー</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.ssense.com" target="_blank" rel="noopener"><strong>SSENSE</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>込 (DDP)</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">2,750円〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">モード・ストリート</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.mrporter.com" target="_blank" rel="noopener"><strong>MR PORTER</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>込 (DDP)</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">無料〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">ラグジュアリー</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.24s.com" target="_blank" rel="noopener"><strong>24S</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>込 (DDP)</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">2,500円〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">パリ・ラグジュアリー</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.luisaviaroma.com" target="_blank" rel="noopener"><strong>LUISAVIAROMA</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>込 (DDP)</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">4,500円〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">モード・伊</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.endclothing.com" target="_blank" rel="noopener"><strong>END.</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">別 (DDU)</td>
        <td style="padding: 1rem; border: 1px solid #eee;">2,300円〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">ストリート・スニーカー</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://hbx.com" target="_blank" rel="noopener"><strong>HBX</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">別 (DDU)</td>
        <td style="padding: 1rem; border: 1px solid #eee;">2,500円〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">最新トレンド</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.farfetch.com" target="_blank" rel="noopener"><strong>FARFETCH</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>込 (DDP)</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">2,800円〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">総合・モール</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.asos.com" target="_blank" rel="noopener"><strong>ASOS</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">免税枠内</td>
        <td style="padding: 1rem; border: 1px solid #eee;">2,000円〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">トレンド・コスパ</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://global.musinsa.com" target="_blank" rel="noopener"><strong>MUSINSA</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>込 (DDP)</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">1,500円〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">韓国ファッション</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.yoox.com" target="_blank" rel="noopener"><strong>YOOX</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>込 (DDP)</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">2,200円〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">ブランドアウトレット</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.shein.com" target="_blank" rel="noopener"><strong>SHEIN</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">免税枠内</td>
        <td style="padding: 1rem; border: 1px solid #eee;">無料〜</td>
        <td style="padding: 1rem; border: 1px solid #eee;">超プチプラ</td>
      </tr>
    </tbody>
  </table>
</div>
`;

const content = `
## 妥協のない一着を、世界中のストックから「適正価格」で引き寄せる

日本のセレクトショップでは完売続き、あるいは驚くほど価格が上乗せされている人気ブランドも、海外通販を駆使すれば、本国の適正価格で、しかも豊富な在庫から選ぶことが可能になります。

本記事では、3,000件以上の個人輸入実績に基づき、<strong>2026年現在、日本の男性が使うべき11のショップ</strong>をプロの視点で選抜。関税計算の罠からサイズ選びの決定版まで、この記事一つで完結させる「究極のメンズ個人輸入マニュアル」をお届けします。

---

## 1. 海外メンズファッション通販 主要11社 徹底比較早見表

ショップ名をクリックすると、公式サイトで最新のラインナップを直接確認できます。

${comparisonTableHtml}

---

## 2. カテゴリー別：海外通販の「正解」ショップ徹底解説

現在のファッションシーンにおいて、真に価値あるショップを深掘りします。

### SSENSE（エッセンス）：信頼、スピード、価格の三冠王
![SSENSE スクリーンショット](${ssenseImg})

カナダ・モントリオール発。ハイエンド・ストリートの玄関口として、現在最も信頼されているのが <strong>SSENSE</strong> です。表示価格に<strong>関税・消費税がすべて含まれている（DDP方式）</strong>ため、届いた時にお金を支払う煩わしさが一切ありません。 <strong>Maison Margiela</strong> や <strong>Essentials</strong> の品揃えは世界最大級。日本語サポートも完璧で、初心者がまず最初に訪れるべき「正解」の場所です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SSENSE 公式サイトで新作をチェック ↗</a>
</div>

---

### MR PORTER（ミスターポーター）：最高のサービスを求める紳士へ
![MR PORTER スクリーンショット](${mrporterImg})

英国発、男性のために研ぎ澄まされた世界最高峰のメンズセレクトショップ。単なる通販サイトの枠を超え、オンライン・マガジンのような体裁で提案されるスタイリングの完成度は圧巻です。 <strong>Tom Ford</strong> や <strong>Saint Laurent</strong> といった一流ブランドを、「プレミアム」なサービス体験とともに自宅へ届けてくれます。大人の男性が「一生もの」を探すなら、ここ以上の選択肢はありません。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.mrporter.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MR PORTER 公式サイトで探す ↗</a>
</div>

---

### 24S（トゥエンティーフォーエス）：LVMHグループ直営、パリの真髄
![24S スクリーンショット](${s24Img})

LVMHグループ公式通販。<strong>CELINE（セリーヌ）</strong> のメンズラインを正規価格で直送できる、世界でも数少ない認定ルートです。パリの老舗百貨店「ボン・マルシェ」に並ぶ洗練されたアイテム群は、まさにパリのモードその周。本物のラグジュアリーを安心して手に入れたい、感度の高い層に支持されています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.24s.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">24S 公式サイトへ ↗</a>
</div>

---

### LUISAVIAROMA（ルイーザヴィアローマ）：イタリアの美意識、モードの最前線
![LUISAVIAROMA スクリーンショット](${lvrImg})

イタリア・フィレンツェ発。エッジの効いた最新モードとイタリアンカジュアルを繋ぐ名店です。 <strong>Stone Island</strong> やイタリアの新鋭デザイナーに強く、配送スピードも驚異的。今すぐ最新のイタリアンモードを装いたい時、最も頼りになるショップの一つです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.luisaviaroma.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">LUISAVIAROMA 公式サイト ↗</a>
</div>

---

### END. Clothing（エンド）：ストリート・スニーカーの絶対聖地
![END. スクリーンショット](${endImg})

英国発。スニーカーヘッズにとって、ここは単なるショップではなくバイブルです。限定モデルの抽選システムなどは世界基準。関税が別途発生（DDU方式）する点だけ注意が必要ですが、それを補う圧倒的なラインナップとプロダクト写真の美しさは、男性の物欲を最高潮まで高めます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END. 公式サイトをチェック ↗</a>
</div>

---

### HBX（エイチビーエックス）：Hypebeastが運営する感度の頂点
![HBX スクリーンショット](${hbxImg})

最新トレンドを定義するグローバルメディア「Hypebeast」が手掛ける <strong>HBX</strong>。ストリートの最前線からハイエンド、さらにはデジタルライフスタイルに至るまで、今追うべきブランドが最速で揃います。トレンドのコアにいたい層にとって、ここは欠かせないチェックポイントです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://hbx.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">HBX 公式サイト ↗</a>
</div>

---

### FARFETCH（ファーフェッチ）：世界最大の在庫を横断検索
![FARFETCH スクリーンショット](${farfetchImg})

世界最大のファッションプラットフォーム。他で売り切れたサイズや数シーズン前のアーカイブを探すなら、ここが「最後の砦」となります。日本語サポートも手厚いため、安心して探検を楽しむことができます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.farfetch.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">FARFETCH 公式サイト ↗</a>
</div>

---

### ASOS（エイソス）：世界最大級のファストファッション・デパート
![ASOS スクリーンショット](${asosImg})

英国発。圧倒的な安さとトレンドの速さを楽しむ場所です。最新スタイルを低予算で試したい時の最強のサポーターであり、自社ラインのデザイン性の高さは世界中にファンを持つ所以です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.asos.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">ASOS 公式サイト ↗</a>
</div>

---

### MUSINSA（ムシンサ）：韓国のトレンドを正規直送
![Musinsa スクリーンショット](${musinsaImg})

韓国No.1。デザイナーズブランドを公式直送できる唯一の大型窓口。本場の人気デザイナーズを日本から最も安全に、かつ正規の価格で取り寄せられる、韓国ファッション好き必携のサイトです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://global.musinsa.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MUSINSA 公式サイト ↗</a>
</div>

---

### YOOX（ユークス）：ハイブランドを「アウトレット価格」で攻略
![YOOX スクリーンショット](${yooxImg})

ハイブランドの名品が最大80〜90%OFFで並ぶ光景は圧巻。日本円での決済、国内返品への対応など、もはや国内通販と同等の使い勝手でありながら、驚異的な値引きメリットを享受できる実利最強のショップと言えます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.yoox.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">YOOX 公式サイト ↗</a>
</div>

---

### SHEIN（シーイン）：超プチプラ・トレンド
![SHEIN スクリーンショット](${sheinImg})

もはやライフラインとなった絶対王者。圧倒的な安さで最新トレンドを試すことができます。メンズファッションの補強において、これほどコストパフォーマンスに優れたインフラは他に存在しません。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.shein.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SHEIN 公式サイト ↗</a>
</div>

---

## 3. 実務：失敗しないための海外通販マニュアル

### 関税（Customs）と「革靴」の警告
商品代金の合計に0.6（課税価格）をかけ、それが1万円（商品代金約16,666円）を超えない限り、関税は原則免除されます。しかし、<strong>革靴</strong>は独自の厳しい関税対象であり、金額に関わらず高額な関税がかかる不文律があるため、安全を期すなら <strong>SSENSE</strong> 等の関税込み表示のサイトを選ぶのが唯一の正解です。

---

## 結論：あなたの目的に合わせた「最適の窓口」を

1. <strong>最高の信頼と速度</strong>を求めるなら <strong>SSENSE</strong>。
2. <strong>最高のラグジュアリー体験</strong>なら <strong>MR PORTER</strong>。
3. <strong>コストパフォーマンス</strong>なら <strong>ASOS</strong> や <strong>SHEIN</strong>。

あなたのファッションライフが、世界へと繋がる扉はすぐそこにあります。
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
    console.log('Successfully published MENS FASHION GUIDE Ver 4.6 - HTML TABLE REBUILD!');
    process.exit(0);
  }
}
publishArticle();
