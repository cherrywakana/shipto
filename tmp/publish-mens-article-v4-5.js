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

const content = `
## 妥協のない一着を、世界中のストックから「適正価格」で引き寄せる

<strong>メゾン・マルジェラ</strong>の名作、<strong>セリーヌ</strong>のバッグ、あるいは国内完売の<strong>限定スニーカー</strong>——。日本のセレクトショップでは入手困難、あるいは定価が跳ね上がっている人気ブランドも、海外通販を駆使すれば、本国の適正価格で、しかも豊富な在庫から選ぶことが可能になります。

本記事では、3,000件以上の個人輸入実績に基づき、<strong>2026年現在、日本の男性が使うべき11のショップ</strong>をプロの視点で絞り込みました。関税計算の罠からサイズ選びの決定版まで、この記事一つで完結させる「究極のメンズ個人輸入マニュアル」をお届けします。

---

## 1. 海外メンズファッション通販 主要11社 比較早見表

ショップ名をクリックすると、公式サイトで最新のラインナップを直接確認できます。

サイト名 | 関税対応 | 送料 | カテゴリー
:--- | :--- | :--- | :---
<a href="https://www.ssense.com" target="_blank" rel="noopener"><strong>SSENSE</strong></a> | <strong>込（DDP）</strong> | 2,750円〜 | モード・ストリート
<a href="https://www.mrporter.com" target="_blank" rel="noopener"><strong>MR PORTER</strong></a> | <strong>込（DDP）</strong> | 無料〜 | ラグジュアリー
<a href="https://www.24s.com" target="_blank" rel="noopener"><strong>24S</strong></a> | <strong>込（DDP）</strong> | 2,500円〜 | パリ・ラグジュアリー
<a href="https://www.luisaviaroma.com" target="_blank" rel="noopener"><strong>LUISAVIAROMA</strong></a> | <strong>込（DDP）</strong> | 4,500円〜 | モード・イタリアン
<a href="https://www.endclothing.com" target="_blank" rel="noopener"><strong>END.</strong></a> | 別（DDU） | 2,300円〜 | ストリート・靴
<a href="https://hbx.com" target="_blank" rel="noopener"><strong>HBX</strong></a> | 別（DDU） | 2,500円〜 | 最新トレンド
<a href="https://www.farfetch.com" target="_blank" rel="noopener"><strong>FARFETCH</strong></a> | <strong>込（DDP）</strong> | 2,800円〜 | 総合・モール
<a href="https://www.asos.com" target="_blank" rel="noopener"><strong>ASOS</strong></a> | 免税枠内 | 2,000円〜 | トレンド・コスパ
<a href="https://global.musinsa.com" target="_blank" rel="noopener"><strong>MUSINSA</strong></a> | <strong>込（DDP）</strong> | 1,500円〜 | 韓国ファッション
<a href="https://www.yoox.com" target="_blank" rel="noopener"><strong>YOOX</strong></a> | <strong>込（DDP）</strong> | 2,200円〜 | アウトレット
<a href="https://www.shein.com" target="_blank" rel="noopener"><strong>SHEIN</strong></a> | 免税枠内 | 無料〜 | 超プチプラ

---

## 2. カテゴリー別：海外通販の「正解」ショップ徹底解説

現在のファッションシーンにおいて、真に価値あるショップを一つずつ深掘りします。

### SSENSE（エッセンス）：信頼、スピード、価格の三冠王
![SSENSE スクリーンショット](${ssenseImg})

カナダ・モントリオール発。ハイエンド・ストリートの玄関口として、圧倒的支持を得ているのが <strong>SSENSE</strong> です。表示価格に<strong>関税・消費税がすべて含まれている（DDP）</strong>透明性は、海外通販の概念を国内通販と同等まで引き下げました。

<strong>Maison Margiela</strong> や <strong>Essentials</strong> の品揃えは世界最大級。日本語サポートの質も極めて高く、初心者が迷わず最初に選ぶべき絶対的ショップです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SSENSE 公式サイトで新作をチェック ↗</a>
</div>

---

### MR PORTER（ミスターポーター）：最高のサービスを求める紳士へ
![MR PORTER スクリーンショット](${mrporterImg})

英国発、男性のために研ぎ澄まされた世界最高峰のメンズセレクトショップ。単なる通販サイトの枠を超え、オンライン・マガジンのような体裁で提案されるスタイリングの完成度は圧巻です。

<strong>Tom Ford</strong> や <strong>Saint Laurent</strong> といった超一流ブランドはもちろん、配送スピードや高級感あふれる梱包など、サービス全般において「世界一」の評価を不動のものにしています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.mrporter.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MR PORTER 公式サイトで探す ↗</a>
</div>

---

### 24S（トゥエンティーフォーエス）：LVMHグループ直営、パリの真髄
![24S スクリーンショット](${s24Img})

LVMHグループ公式通販。<strong>CELINE（セリーヌ）</strong> のメンズラインを正規ルートで直送できる唯一無二のプラットフォームです。パリの老舗百貨店「ボン・マルシェ」に並ぶ洗練されたアイテムを、安全かつ迅速に自宅へ届けてくれます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.24s.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">24S 公式サイトへ ↗</a>
</div>

---

### LUISAVIAROMA（ルイーザヴィアローマ）：イタリアの美意識、モードの最前線
![LUISAVIAROMA スクリーンショット](${lvrImg})

イタリア・フィレンツェ発。エッジの効いた最新モードから本格的なイタリアンカジュアルまでカバー。 <strong>Stone Island</strong> や <strong>Gucci</strong> 等、イタリアブランドの速報性と価格メリットは随一で、モード愛好家には欠かせない一軒です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.luisaviaroma.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">LUISAVIAROMA 公式サイト ↗</a>
</div>

---

### END. Clothing（エンド）：ストリート・スニーカーの絶対聖地
![END. スクリーンショット](${endImg})

英国発、ストリートカルチャーの絶対的発信地。限定スニーカーの抽選システムや、プロダクト写真の美しさは右に出るものがありません。関税別（DDU）ではありますが、<strong>Moncler</strong> 等の人気ブランドの品揃えは全ショップでもトップクラスの魅力があります。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END. 公式サイトをチェック ↗</a>
</div>

---

### HBX（エイチビーエックス）：Hypebeastが運営する感度の頂点
![HBX スクリーンショット](${hbxImg})

「Hypebeast」編集部が厳選した、常に「今」を象徴するブランドが揃う <strong>HBX</strong>。ストリートの最前線ブランドからテックウェア、ライフスタイル雑貨まで、独自の高い審美眼でキュレーションされたラインナップが、ファッション感度の高い男性を引きつけています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://hbx.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">HBX 公式サイト ↗</a>
</div>

---

### FARFETCH（ファーフェッチ）：世界最大の在庫を横断検索
![FARFETCH スクリーンショット](${farfetchImg})

世界2,000以上のブティックを繋ぐ巨大プラットフォーム。他店で売り切れたサイズや、アーカイブを探し出すための「最後の砦」です。日本語サポートも手厚く、探しているブランドがあるなら真っ先に覗くべき万能サイトであり、初心者でもまず失敗のない選択肢となります。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.farfetch.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">FARFETCH 公式サイト ↗</a>
</div>

---

### ASOS（エイソス）：世界最大級のファストファッション・デパート
![ASOS スクリーンショット](${asosImg})

英国発。圧倒的なアイテム数と安さを誇る <strong>ASOS</strong>。最新のトレンドを日常のワードローブに手軽に、しかも圧倒的な低予算で取り入れたい時の最強のサポーターです。自社ラインのデザイン性の高さは世界的に評価されています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.asos.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">ASOS 公式サイト ↗</a>
</div>

---

### MUSINSA（ムシンサ）：韓国のトレンドを正規直送
![Musinsa スクリーンショット](${musinsaImg})

韓国No.1。デザイナーズブランドを公式に直送できる唯一の大型プラットフォームです。<strong>MARDI MERCREDI</strong> などの本場のトレンドを、日本から最も安全かつ正規価格で取り寄せられる、韓国ファッション好き必携の窓口です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://global.musinsa.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MUSINSA 公式サイト ↗</a>
</div>

---

### YOOX（ユークス）：ハイブランドを「アウトレット価格」で攻略
![YOOX スクリーンショット](${yooxImg})

ハイブランドのアウトレット品が最大最大80〜90%OFFで並ぶ光景は圧巻です。日本国内拠点としての利便、日本円での決済、国内返品対応など、実利の面で極めて優秀な「賢者のためのショップ」と言えます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.yoox.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">YOOX 公式サイト ↗</a>
</div>

---

### SHEIN（シーイン）：超プチプラ・トレンド
![SHEIN スクリーンショット](${sheinImg})

もはやライフラインとなった絶対王者。圧倒的な安さで最新トレンドを試すことができます。メンズラインも拡大の一途を辿り、カジュアルウェアやアクセサリーの補填において、比類なき効率を提供してくれます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.shein.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SHEIN 公式サイト ↗</a>
</div>

---

## 3. 実務：失敗しないための海外通販マニュアル

### 関税（Customs）と「革靴」の警告
支払額（送料除く）に0.6（課税価格）をかけ、それが1万円（商品代金約16,666円）を超えない限り、関税は原則免除されます。しかし <strong>革靴</strong> は金額に関わらず高額な関税がかかる不文律があるため、安全を期すなら <strong>SSENSE</strong> 等の関税込み表示のサイトを強く推奨します。

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
    console.log('Successfully published MENS FASHION GUIDE Ver 4.5 - TECHNICAL TABLE FIX & CTA COMPLETION!');
    process.exit(0);
  }
}
publishArticle();
