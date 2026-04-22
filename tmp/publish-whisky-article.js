const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】ウイスキー海外通販おすすめ8選！関税計算から個人輸入の極意まで';
const slug = 'whisky-overseas-shopping-guide';
const category = 'ライフスタイル';

const heroImg = '/whisky-hero.png';
const imgBase = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails';

// Real Images
const tweImg = imgBase + '/thewhiskyexchange.webp';
const momImg = imgBase + '/masterofmalt.webp';
const wioImg = imgBase + '/whiskyinternationalonline.webp';
const twbImg = imgBase + '/thewhiskybarrel.webp';
const fdImg = imgBase + '/finedrams.webp';

// Placeholders for the 3 New Shops
const htfwImg = 'https://placehold.co/800x533/111110/FFFFFF.png?text=Hard+To+Find+Whisky';
const rmwImg = 'https://placehold.co/800x533/111110/FFFFFF.png?text=Royal+Mile+Whiskies';
const wbImg = 'https://placehold.co/800x533/111110/FFFFFF.png?text=WhiskyBase+Shop';


const comparisonTableHtml = `
<div style="overflow-x: auto; margin: 2rem 0;">
  <table style="width: 100%; border-collapse: collapse; min-width: 600px; border: 1px solid #eee;">
    <thead>
      <tr style="background: #111; color: #fff;">
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">サイト名</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">拠点</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">特徴</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">日本発送</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.thewhiskyexchange.com/" target="_blank" rel="noopener"><strong>The Whisky Exchange</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">イギリス🇬🇧</td>
        <td style="padding: 1rem; border: 1px solid #eee;">世界最大級・圧倒的品揃え</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>◎ 豊富</strong></td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.masterofmalt.com/" target="_blank" rel="noopener"><strong>Master of Malt</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">イギリス🇬🇧</td>
        <td style="padding: 1rem; border: 1px solid #eee;">独自ボトリング・小瓶充実</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>◎ 豊富</strong></td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://whiskyinternationalonline.com/" target="_blank" rel="noopener"><strong>Whisky International</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">スコットランド🏴󠁧󠁢󠁳󠁣󠁴󠁿</td>
        <td style="padding: 1rem; border: 1px solid #eee;">日本向けサポートが手厚い</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>◎ 積極的</strong></td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.thewhiskybarrel.com/" target="_blank" rel="noopener"><strong>The Whisky Barrel</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">スコットランド🏴󠁧󠁢󠁳󠁣󠁴󠁿</td>
        <td style="padding: 1rem; border: 1px solid #eee;">独占ボトラーズが人気</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>◎ 確実</strong></td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.htfw.com/" target="_blank" rel="noopener"><strong>Hard To Find Whisky</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">イギリス🇬🇧</td>
        <td style="padding: 1rem; border: 1px solid #eee;">オールドボトルの宝庫</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>〇 対応</strong></td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.royalmilewhiskies.com/" target="_blank" rel="noopener"><strong>Royal Mile Whiskies</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">エディンバラ🏴󠁧󠁢󠁳󠁣󠁴󠁿</td>
        <td style="padding: 1rem; border: 1px solid #eee;">実店舗の安心感・限定品</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>◎ 確実</strong></td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://shop.whiskybase.com/" target="_blank" rel="noopener"><strong>WhiskyBase Shop</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">オランダ🇳🇱</td>
        <td style="padding: 1rem; border: 1px solid #eee;">世界最強DBの巨大公式</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>〇 対応</strong></td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.finedrams.com/" target="_blank" rel="noopener"><strong>Fine Drams</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">デンマーク🇩🇰</td>
        <td style="padding: 1rem; border: 1px solid #eee;">欧州限定リリースに強い</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>〇 対応</strong></td>
      </tr>
    </tbody>
  </table>
</div>
`;

const content = `
## 日本未発売のレアボトルを、世界の酒屋から直接買い付ける

日本のウイスキー市場は世界的に見ても成熟していますが、それでも「スコットランドの蒸留所限定ボトル」や「欧州市場向け（EU向け）リリースのボトラーズ」など、どうしても日本の酒屋には並ばない銘柄が存在します。

そんな時に利用したいのが、海を越えて世界中へボトルを発送してくれる<strong>海外のウイスキー専門通販サイト</strong>です。

本記事では、日本国内のモルトラバー（ウイスキー愛好家）が日常的に「個人輸入」で利用している、信頼と実績のある<strong>世界最高峰のウイスキーショップ8選</strong>を徹底解説。さらに、ウイスキー特有の「酒税・関税の計算方法」など、実務的なノウハウも完全網羅します。

---

## 1. ひと目でわかる：海外ウイスキー通販 最強8社 比較表

リンクをクリックすると、各ショップの現在の新入荷（New Arrivals）を確認できます。

${comparisonTableHtml}

---

## 2. 絶対に外さない「ウイスキー個人輸入」8選 徹底解説

ウイスキーの海外通販において最も重要なのは「梱包の堅牢さ」と「発送実績の多さ」です。ここでは、日本への確実な配送実績を持つ優良ショップのみを厳選しました。

### 1. The Whisky Exchange (TWE)：業界最大のインフラ
![The Whisky Exchange](${tweImg})

イギリス・ロンドンに拠点を置く、言わずと知れた世界最大級のウイスキー通販サイトです。

最新のオフィシャルボトルから、見たこともないようなオールドボトルまで、その在庫量は圧倒的。日本からの利用者も非常に多く、梱包に関しても「エアーチューブ」と呼ばれる強固な緩衝材でボトルを包んでくれるため、液漏れや破損のリスクが極めて低いのが特徴です。海外通販が初めてなら、まずはここから始めるのが最も安全です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.thewhiskyexchange.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">The Whisky Exchange 公式サイトへ ↗</a>
</div>

---

### 2. Master of Malt（マスター・オブ・モルト）：小瓶と独自ボトル
![Master of Malt](${momImg})

TWEと双璧をなすイギリスの大手通販サイトが <strong>Master of Malt</strong> です。

フルボトルだけでなく、「Dram（ドラム）」と呼ばれる30mlのサンプリング用小瓶を大量に販売しており、高額なボトルを買う前にテイスティングできる画期的なシステムが世界中でウケています。また、「Boutique-y Whisky Company（ブティックウイスキー）」など自社系列のインディペンデント・ボトラーズの発信源でもあり、ここでしか買えない限定品が多数存在します。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.masterofmalt.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Master of Malt 公式サイトへ ↗</a>
</div>

---

### 3. Whisky International Online：圧倒的な日本向けサポート
![Whisky International Online](${wioImg})

スコットランドの首都・エディンバラを拠点とするショップ。名前の通り「国際発送」に極めて特化しています。

このショップの最大の特徴は、日本市場への強い意識です。通関時に必要な書類作成に慣れており、関税手続きで引っかかるリスクを最小限に抑えてくれます。梱包の丁寧さも日本のユーザーから高く評価されており、安心して到着を待つことができる優良ショップです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://whiskyinternationalonline.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Whisky International Online 公式サイトへ ↗</a>
</div>

---

### 4. The Whisky Barrel：独占販売のボトラーズを探すなら
![The Whisky Barrel](${twbImg})

こちらもスコットランド拠点。TWEなどの超大手にはない、独自の仕入れルートとコネクションを持つ中堅・実力派ショップです。

Signatory（シグナトリー）やHunter Laing（ハンターレイン）といった有名ボトラーズとコラボした「The Whisky Barrel独占販売ボトル」を頻繁にリリースしており、これらは日本国内の酒屋には絶対に入荷しません。レアボトルを狙うマニアは必ずチェックしているサイトです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.thewhiskybarrel.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">The Whisky Barrel 公式サイトへ ↗</a>
</div>

---

### 5. Hard To Find Whisky：オールドボトルの絶対的宝庫
![Hard To Find Whisky](${htfwImg})

イギリス発。その名の通り、「見つけるのが困難なウイスキー」の在庫においては世界でも一二を争うコレクター向けのショップです。

予算さえ許せば、1960年代のボウモアやマッカランといった伝説のボトルから限定ボトラーズまで、探しているヴィンテージが必ず見つかるほどの魔境です。免税での購入設定も機能しており、高級ボトルの個人輸入には欠かせません。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.htfw.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Hard To Find Whisky 公式へ ↗</a>
</div>

---

### 6. Royal Mile Whiskies：エディンバラの実店舗ショッピ
![Royal Mile Whiskies](${rmwImg})

スコットランド・エディンバラの歴史的中心街「ロイヤルマイル」に実店舗を構える、権威ある老舗ウイスキーショップです。

歴史と信用を背景に、各ボトラーズとの関係が非常に深く、他のオンラインショップでは売り切れてしまうようなシグナトリーやケイデンヘッドの新作がふと並ぶことがあります。英国のウイスキーマガジンで「Retailer of the Year」を何度も受賞している実力派です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.royalmilewhiskies.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Royal Mile Whiskies 公式へ ↗</a>
</div>

---

### 7. WhiskyBase Shop：世界最強データベースの公式店
![WhiskyBase Shop](${wbImg})

世界中すべてのウイスキーが登録され、愛好家が日々評価を書き込んでいるオランダ発の最強データベース「WhiskyBase」が直営しているショップです。

欧州のインディペンデント・ボトラーに極めて強く、ここでしか見ないようなマニアックなドイツやオランダのボトラーズが手に入ります。最新リリースが欧州圏ではどれほど評価されているか、WhiskyBaseの点数を見ながら購入できるのも強力なメリットです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://shop.whiskybase.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">WhiskyBase Shop 公式へ ↗</a>
</div>

---

### 8. Fine Drams：デンマーク発・欧州の穴場
![Fine Drams](${fdImg})

イギリス以外の選択肢として非常に優秀なのが、デンマークに拠点を置く <strong>Fine Drams</strong> です。

イギリスのショップでは売り切れてしまったボトルが、欧州大陸（EU）向けの流通在庫としてこちらには残っていることが多々あります。また免税（VAT抜き）での購入がスムーズで、ユーロ圏ならではのユニークな品揃え（珍しいラム酒やコニャックなども豊富）が光る穴場的ショップです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.finedrams.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Fine Drams 公式サイトへ ↗</a>
</div>

---

## 3. ウイスキー個人輸入・絶対に知っておくべき「税金と送料」の知識

ファッションの個人輸入とは異なり、お酒（ウイスキー）を輸入する際は独自の税金計算が必要です。ここを理解しておかないと、「安く買えたと思ったら到着時に高額な税金を請求された」という失敗に直面します。

### 3.1 酒税・関税・消費税のトリプルパンチ
ウイスキーを海外から輸入して日本で受け取る際、以下の3つの税金が課せられます。

1. **関税（免税になる場合も多い）**：商品代金に対してかかります。しかし、ウイスキーはEPA（経済連携協定）などにより、イギリスやEUからの輸入は実質「無税」になるケースがほとんどです。
2. **酒税（これが高い）**：ウイスキーの場合、アルコール度数によって計算されます。ざっくりと言うと、**700mlボトル1本で「約300円〜400円」程度の酒税**がかかります。
3. **輸入消費税**：（商品代金 × 0.6 ＋ 送料 ＋ 酒税）に対して、10%（軽減税率対象外）がかかります。

**💡 実践的な計算の目安**
細かい計算を省くための目安として、**「1万円のボトルを1本輸入すると、到着時にだいたい1,500円〜2,000円ほどの税金（酒税＋消費税）を配達員に支払う必要がある」** と覚えておくと間違いありません。

### 3.2 送料を分割する「共同購入」のすすめ
海外からガラス瓶（液体）を空輸するため、送料はどうしても高額になります（イギリスからだと1本あたり3,000円〜5,000円が相場）。
しかし、1本送るのも3本送るのも、送料はそこまで大きく跳ね上がりません。そのため、**「同じショップで一度に複数本買う」か、「ウイスキー仲間の友人と一緒に注文して送料を割り勘する」のが、個人輸入の鉄則**です。

※ただし、個人消費の範囲を著しく超える本数（例えば同じボトルを10本など）を輸入すると、税関で「転売目的の商用輸入」とみなされ、食品衛生法などの厳しい審査に引っかかる可能性があるため注意してください。（個人使用の目安は1回あたり10kg、約6〜8本程度までと言われています）。

---

## 結論：海を越える価値のあるボトルを手に入れよう

国内の酒屋の棚を眺めているだけでは、ウイスキーの世界のほんの数パーセントしか見えません。
The Whisky Exchange のような巨大な倉庫から、自分だけの一本を探し出し、それが遠く海を越えて玄関に届いた時の喜びは、何物にも代えがたい体験です。

到着時の税金と送料という「ハードル」さえ理解してしまえば、あなたのウイスキーライフは国境を越えて無限に広がります。
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
    console.error('Error publishing whisky article:', error);
    process.exit(1);
  } else {
    console.log('Successfully published WHISKY OVERSEAS GUIDE: 8 Shops (5 Real Screens, 3 Placeholders)');
    process.exit(0);
  }
}
publishArticle();
