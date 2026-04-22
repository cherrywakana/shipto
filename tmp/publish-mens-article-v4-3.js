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

<strong>メゾン・マルジェラ</strong>の名作、<strong>セリーヌ</strong>のバッグ、あるいは本国でしか手に入らない<strong>限定スニーカー</strong>——。日本のセレクトショップでは完売が続く人気ブランドも、海外通販という選択肢を持てば、適正な本国価格で、かつ豊富な在庫から選ぶことが可能になります。

もはや海外通販は特別なことではありません。本記事では、3,000件以上の個人輸入実績に基づき、<strong>2026年現在、日本の男性が使うべき11のショップ</strong>をプロの視点で選定。関税計算の罠からサイズ選びの決定版まで、この記事一つで完結させる「究極のメンズ個人輸入マニュアル」をお届けします。

---

## 1. 海外メンズファッション通販 主要11社 比較早見表

ショップ名をクリックすると、公式サイトで最新のラインナップを確認できます。

| サイト名 | 関税対応 | 送料 | カテゴリー |
| :--- | :--- | :--- | :--- |
| <a href="https://www.ssense.com" target="_blank" rel="noopener"><strong>SSENSE</strong></a> | <strong>込（DDP）</strong> | 2,750円〜 | モード・ストリート |
| <a href="https://www.mrporter.com" target="_blank" rel="noopener"><strong>MR PORTER</strong></a> | <strong>込（DDP）</strong> | 無料〜 | ラグジュアリー |
| <a href="https://www.24s.com" target="_blank" rel="noopener"><strong>24S</strong></a> | <strong>込（DDP）</strong> | 2,500円〜 | パリ・ラグジュアリー |
| <a href="https://www.luisaviaroma.com" target="_blank" rel="noopener"><strong>LUISAVIAROMA</strong></a> | <strong>込（DDP）</strong> | 4,500円〜 | モード・イタリアン |
| <a href="https://www.endclothing.com" target="_blank" rel="noopener"><strong>END.</strong></a> | 別（DDU） | 2,300円〜 | ストリート・靴 |
| <a href="https://hbx.com" target="_blank" rel="noopener"><strong>HBX</strong></a> | 別（DDU） | 2,500円〜 | 最新トレンド |
| <a href="https://www.farfetch.com" target="_blank" rel="noopener"><strong>FARFETCH</strong></a> | <strong>込（DDP）</strong> | 2,800円〜 | 総合・モール |
| <a href="https://www.asos.com" target="_blank" rel="noopener"><strong>ASOS</strong></a> | 免税枠内 | 2,000円〜 | トレンド・コスパ |
| <a href="https://global.musinsa.com" target="_blank" rel="noopener"><strong>MUSINSA</strong></a> | <strong>込（DDP）</strong> | 1,500円〜 | 韓国ファッション |
| <a href="https://www.yoox.com" target="_blank" rel="noopener"><strong>YOOX</strong></a> | <strong>込（DDP）</strong> | 2,200円〜 | アウトレット |
| <a href="https://www.shein.com" target="_blank" rel="noopener"><strong>SHEIN</strong></a> | 免税枠内 | 無料〜 | 超プチプラ |

---

## 2. カテゴリー別：海外通販の「正解」ショップ徹底解説

現在のファッションシーンにおいて、真に価値あるショップを一つずつ読み解いていきます。

### SSENSE（エッセンス）：信頼、スピード、価格の三冠王
![SSENSE スクリーンショット](${ssenseImg})

カナダ・モントリオールを拠点とする <strong>SSENSE</strong> は、現在日本のメンズファッション層から最も支持されているショップです。その最大の理由は、表示価格に<strong>関税・消費税がすべて含まれている（DDP方式）</strong>という透明性にあります。

ラグジュアリーストリートから新鋭デザイナーズまで、ブランドの選定眼は世界屈指。特に <strong>Maison Margiela</strong> や <strong>Essentials</strong> の品揃えは圧倒的で、日本語サポートの質も完璧であるため、海外通販初心者から上級者まで「まずはここ」と胸を張って推奨できる一軒です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SSENSE 公式サイトで新作をチェック ↗</a>
</div>

---

### MR PORTER（ミスターポーター）：最高のサービスを求める紳士へ
![MR PORTER スクリーンショット](${mrporterImg})

英国発、男性のためだけに編集された世界最高峰のメンズセレクトショップが <strong>MR PORTER</strong> です。単なる通販サイトではなく、洗練されたオンライン・マガジンのような体裁をとっており、提案されるスタイリングの完成度は他の追随を許しません。

<strong>Tom Ford</strong> や <strong>Saint Laurent</strong> といった超一流ブランドはもちろん、丁寧な梱包や迅速な配送など、サービスレベルにおいても「プレミアム」を体現しています。大人の男性が、一過性のトレンドではなく「一生もの」の一着を探す場所として、これ以上の選択肢はありません。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.mrporter.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MR PORTER 公式サイトで探す ↗</a>
</div>

---

### 24S（トゥエンティーフォーエス）：LVMHグループ直営、パリの真髄
![24S スクリーンショット](${s24Img})

<strong>24S</strong> は、ルイ・ヴィトン・モエ・ヘネシー（LVMH）グループが公式に運営するオンラインブティックです。このサイトの唯一無二の価値は、他の通販サイトではまず見かけない <strong>CELINE（セリーヌ）</strong> のメンズラインを、正規ルートで日本へ直送できる点にあります。

パリの名門百貨店「ボン・マルシェ」に並ぶ、選び抜かれたラグジュアリーなラインナップは、まさにパリのモードを象徴しています。信頼性という点では世界で最も堅固なショップの一つであり、高価なハイエンド品を安心して取り寄せたい層に最適です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.24s.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">24S 公式サイトへ ↗</a>
</div>

---

### LUISAVIAROMA（ルイーザヴィアローマ）：イタリアの美意識、モードの最前線
![LUISAVIAROMA スクリーンショット](${lvrImg})

イタリア・フィレンツェの老舗ブティックが運営する <strong>LUISAVIAROMA</strong> は、イタリア独特の華やかさとエッジの効いたモードブランドに強いのが特徴です。

<strong>Stone Island</strong> や <strong>Gucci</strong> といった定番のイタリアブランドはもちろん、新人デザイナーの先行予約など、ファッション感度の高い層を飽きさせないキュレーションが魅力です。送料設定はやや高めですが、イタリアからの超高速配送は特筆。今すぐ最新のモードを手に入れたい時に頼れる存在です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.luisaviaroma.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">LUISAVIAROMA 公式サイト ↗</a>
</div>

---

### END. Clothing（エンド）：ストリート・スニーカーの絶対聖地
![END. スクリーンショット](${endImg})

イギリス・ニューカッスル発の <strong>END.</strong> は、もはや単なるショップではなく、ストリートカルチャーの発信地です。特に限定スニーカーの抽選システム（END. Launches）の使いやすさは随一で、世界中のスニーカーヘッズの熱狂的な支持を集めています。

一方で、関税が別（DDU）であるため、到着時に支払いが発生する点は注意が必要ですが、それを補って余りあるプロダクト写真の美しさと、<strong>Stone Island</strong> や <strong>Nike</strong> 等の圧倒的な品揃えは、男性にとっての「宝箱」そのものです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END. 公式サイトをチェック ↗</a>
</div>

---

### HBX（エイチビーエックス）：Hypebeastが運営する感度の頂点
![HBX スクリーンショット](${hbxImg})

ファッションメディア「Hypebeast」が手掛ける <strong>HBX</strong> は、まさに「今、何がクールか」の基準を示してくれるショップです。ストリートの最前線を走る <strong>Stussy</strong> や <strong>Off-White</strong> などの主要ブランドを一挙にチェックでき、ライフスタイル雑貨やテック関連の感度も非常に優れています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://hbx.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">HBX 公式サイト ↗</a>
</div>

---

### FARFETCH（ファーフェッチ）：世界最大の在庫を横断検索
![FARFETCH スクリーンショット](${farfetchImg})

<strong>FARFETCH</strong> は、世界2,000以上のセレクトショップと繋がる、文字通り世界最大のファッションプラットフォームです。その膨大な在庫量は他を圧倒しており、他店で売り切れたサイズや、数シーズン前のアーカイブを探し出すための「最後の砦」として重宝します。日本語サポートも手厚く、海外通販の万能選手と言えます。

---

### ASOS（エイソス）：世界最大級のファストファッション・デパート
![ASOS スクリーンショット](${asosImg})

英国発、圧倒的なアイテム数と安さを誇る <strong>ASOS</strong>。ラグジュアリーではなく、最新のトレンドを日常のワードローブに手軽に取り入れたい時の最強の味方です。オリジナルブランドのデザイン性は非常に高く、16,666円以下の免税枠を賢く使えば、驚くほど満足度の高い買い物が可能です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.asos.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">ASOS 公式サイト ↗</a>
</div>

---

### MUSINSA（ムシンサ）：韓国のトレンドを正規直送
![Musinsa スクリーンショット](${musinsaImg})

韓国最大級のプラットフォーム <strong>MUSINSA</strong> がついに日本へ本格上陸。<strong>MARDI MERCREDI</strong> などの新鋭ブランドを公式価格で直送できるため、韓国ストリートファッションを楽しみたい若い世代やトレンドセッターには欠かせない窓口です。

---

### YOOX（ユークス）：ハイブランドを「アウトレット価格」で攻略
![YOOX スクリーンショット](${yooxImg})

ハイブランドのアウトレット品を狙うなら <strong>YOOX</strong> が最適解です。数シーズン前の <strong>Prada</strong> や <strong>Marni</strong> が最大80〜90%OFFで並ぶ光景は圧巻。日本国内から発送されているかのような利便性、国内返品への対応など、実利の面で極めて優秀なショップです。

---

### SHEIN（シーイン）：超プチプラ・トレンド
![SHEIN スクリーンショット](${sheinImg})

もはや説明不要の絶対王者が。圧倒的な安さで、トレンドを恐れず試すことができるインフラとして機能しています。メンズラインも拡大を続けており、小物やカジュアルウェアの補填において比類なきコスパを提供します。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.shein.com" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SHEIN 公式サイト ↗</a>
</div>

---

## 3. 実務：失敗しないための海外通販マニュアル

### 関税（Customs）と「革靴」の罠
商品価格の合計に0.6（課税価格）をかけ、それが1万円（商品代金約16,666円）を超えない限り、関税は原則免除されます。ただし、<strong>革靴</strong>は独自の厳しい関税対象であり、金額に関わらず高額な関税がかかるケースがあるため、安全を期すなら <strong>SSENSE</strong> 等の関税込み表示のサイトを選ぶのが唯一の正解です。

---

## 結論：あなたの目的に合わせた「最適の窓口」を

1. <strong>ハイエンドな信頼と速度</strong>を求めるなら <strong>SSENSE</strong>。
2. <strong>最高のラグジュアリー体験</strong>なら <strong>MR PORTER</strong>。
3. <strong>最新のトレンドとコストパフォーマンス</strong>なら <strong>ASOS</strong> や <strong>SHEIN</strong>。

まずは一つのショップを覗き、日本国内の定価と比較してみてください。あなたのファッションライフが世界へと繋がる扉は、すぐそこにあります。
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
    console.log('Successfully published MENS FASHION GUIDE Ver 4.3 - LITERARY POLISH & TABLE FIX!');
    process.exit(0);
  }
}
publishArticle();
