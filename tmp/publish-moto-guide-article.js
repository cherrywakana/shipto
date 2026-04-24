const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】バイク用品・ヘルメットを安く買う！おすすめ海外通販サイト厳選7社まとめ';
const slug = 'motorcycle-gear-overseas-guide';
const category = 'オートバイ用品・ヘルメット';
const heroImg = '/moto-hero.png';

async function publishArticle() {
  console.log('Fetching live URLs from DB...');
  const { data: shops } = await supabase.from('shops').select('slug, image_url, url').in('slug', [
    'fc-moto', 'motardinn', 'chromeburner', 'xlmoto', 'louis-motorrad', 'burnout-italy', 'revzilla'
  ]);

  if (!shops || shops.length === 0) {
    console.error('No shops found in DB! Aborting.');
    process.exit(1);
  }

  const shopMap = shops.reduce((acc, shop) => {
    acc[shop.slug] = shop;
    return acc;
  }, {});

  const comparisonTableHtml = `
<div style="overflow-x: auto; margin: 2rem 0;">
  <table style="width: 100%; border-collapse: collapse; min-width: 600px; border: 1px solid #eee;">
    <thead>
      <tr style="background: #111; color: #fff;">
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">ショップ名</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">拠点</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">強み・特徴</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">日本直送</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="${shopMap['fc-moto'].url}" target="_blank" rel="noopener"><strong>FC-Moto</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">ドイツ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">世界トップクラスの在庫と品揃え</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可能（DHL等）</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="${shopMap['motardinn'].url}" target="_blank" rel="noopener"><strong>MotardInn</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">スペイン</td>
        <td style="padding: 1rem; border: 1px solid #eee;">圧倒的な送料の安さと幅広い小物類</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可能（日本郵便等）</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="${shopMap['chromeburner'].url}" target="_blank" rel="noopener"><strong>ChromeBurner</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">オランダ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">ヘルメットの在庫と発送のスピード感</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可能（FedEx等）</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="${shopMap['xlmoto'].url}" target="_blank" rel="noopener"><strong>XLmoto</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">欧州</td>
        <td style="padding: 1rem; border: 1px solid #eee;">自社ブランドの爆安セールとマフラー</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可能</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="${shopMap['louis-motorrad'].url}" target="_blank" rel="noopener"><strong>Louis Motorrad</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">ドイツ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">キャンプギアやオリジナルブランドが豊富</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可能</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="${shopMap['burnout-italy'].url}" target="_blank" rel="noopener"><strong>BurnOut Italy</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">イタリア</td>
        <td style="padding: 1rem; border: 1px solid #eee;">Dainese・Alpinestarsなどイタリアブランドに特化</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可能</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="${shopMap['revzilla'].url}" target="_blank" rel="noopener"><strong>RevZilla</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">アメリカ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">USフィットや米国限定アパレルに強い</td>
        <td style="padding: 1rem; border: 1px solid #eee;">要転送（一部ブランド不可）</td>
      </tr>
    </tbody>
  </table>
</div>
`;

  const content = `
## バイク用品を「海外通販」で買うべき圧倒的な理由

Dainese（ダイネーゼ）のレザージャケット、AGVのヘルメット、Alpinestarsのレーシングブーツ…。世界の名だたるモーターサイクル用品は、<strong>日本国内の正規代理店で購入すると非常に高額</strong>なケースがほとんどです。

しかし、インターネットを通じてヨーロッパの巨大バイク用品店から直接個人輸入を行うことで、<strong>日本の国内価格の半額〜70%程度の値段で全く同じ本物を購入できる</strong>事実をご存知でしょうか？
例えば、国内で15万円するイタリア製レザースーツが、免税＋セール適用により海外サイトでは実質7万円台で買えてしまうことも珍しくありません。

本記事では、世界規模の在庫と日本語・日本発送への対応により、日本のライダーから絶大な支持を集めている<strong>厳選されたトップ・海外通販サイト7社</strong>を徹底比較します。

---

## 1. ひと目でわかる：バイク用品 海外通販比較表

以下のショップはすべて「正規ルート」で仕入れを行う世界最高峰のディーラーです。海賊版を掴まされるリスクはゼロですのでご安心ください。

${comparisonTableHtml}

---

## 2. 絶対に外せない！おすすめ海外バイク用品店 7選

### 1. FC-Moto（エフシー・モト）
![FC-Moto](${shopMap['fc-moto'].image_url})

ドイツを拠点とし、おそらく<strong>日本人ライダーの利用率が最も高い世界最大級の総合サイト</strong>です。
アパレル、ヘルメット、ブーツからハードパーツまで、とにかく「検索して見つからないものはない」というレベルの圧倒的な在庫量が最大の魅力です。さらに週末や特定のイベント時には「全品10%〜15%オフ」となる強烈なクーポンを頻繁に発行するため、これを狙えば国内価格への大きなアドバンテージを得られます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="${shopMap['fc-moto'].url}" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">FC-Moto 公式サイトへ ↗</a>
</div>

---

### 2. MotardInn（モタードイン）
![MotardInn](${shopMap['motardinn'].image_url})

スペインの巨大ECグループ「TradeInn」が運営するバイク用品専門チャンネル。
このサイトの圧倒的な強みは<strong>「国際送料の安さ」</strong>です。他サイトがFedExやDHLの急ぎ便しか選べず送料が高くつく中、MotardInnは安価な日本郵便（EMS）の配送オプションを選ぶことができるため、グローブ1つ・プロテクター1つといった「小規模な個人輸入」に極めて適しています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="${shopMap['motardinn'].url}" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MotardInn 公式サイトへ ↗</a>
</div>

---

### 3. ChromeBurner（クロームバーナー）
![ChromeBurner](${shopMap['chromeburner'].image_url})

オランダから世界へ猛烈なスピードで進出している急成長中ショップ。
特に<strong>ヘルメット（Arai、SHOEI、AGV、Shark等）の品揃えと価格競争力</strong>においてはトップクラスです。非常にカスタマーサポートの質が高く、発送から日本到着までの「スピード感」に定評があります。高額購入で送料無料キャンペーンを行うこともあります。

<div style="margin: 2rem 0; text-align: center;">
  <a href="${shopMap['chromeburner'].url}" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">ChromeBurner 公式サイトへ ↗</a>
</div>

---

### 4. XLmoto
![XLmoto](${shopMap['xlmoto'].image_url})

ヨーロッパに広大なネットワークを持つメガショップ。
他サイトとは一線を画す<strong>「強烈な独自ブランド商品とメガセール」</strong>が特徴です。例えば自社ブランドのレーシングテントやバックパック、さらにはスリップオンマフラーなどが考えられないほどの低価格で提供されています。「とりあえず安く使えるギア一式を揃えたい」という方にとって最強の味方です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="${shopMap['xlmoto'].url}" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">XLmoto 公式サイトへ ↗</a>
</div>

---

### 5. Louis Motorrad（ルイ）
![Louis Motorrad](${shopMap['louis-motorrad'].image_url})

ドイツのライダーなら誰もが知っている、超老舗のバイク用品コングロマリット。
アパレルだけでなく、ツーリングネットやパニアケース、テント、整備工具に至るまで、「バイクを取り巻くカルチャーすべて」を網羅しています。<strong>Vanucciなどの高品質な自社オリジナルウェアが大人気</strong>で、DHLによる一律の良心的な送料で日本へ安全に送ってくれます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="${shopMap['louis-motorrad'].url}" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Louis Motorrad 公式サイトへ ↗</a>
</div>

---

### 6. BurnOut Italy
![BurnOut Italy](${shopMap['burnout-italy'].image_url})

名前の通り、イタリアを拠点とした専門性の高いショップ。
<strong>DaineseやAlpinestarsといったイタリア発祥のトップレベル・レーシングギア</strong>を本国価格（免税）で買うのであれば、最も品揃えが良く頼りになる存在です。レーシングスーツのオーダーやハイエンドモデルの輸入を得意としています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="${shopMap['burnout-italy'].url}" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">BurnOut Italy 公式サイトへ ↗</a>
</div>

---

### 7. RevZilla
![RevZilla](${shopMap['revzilla'].image_url})

ヨーロッパ主体の中で唯一特筆すべき、アメリカ最大のオンラインストア。
商品動画を使ったレビューが有名で、IconやBiltなど<strong>アメリカンテイストなギアや、US規格（XXL以上のビッグサイズ等）を探す際に最強</strong>です。メーカー都合により日本直送不可のブランドもあるため、購入の際はPlanet Expressなどの「米国転送サービス」の利用をおすすめします。

<div style="margin: 2rem 0; text-align: center;">
  <a href="${shopMap['revzilla'].url}" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">RevZilla 公式サイトへ ↗</a>
</div>

---

## 3. 輸入時の注意点：関税と「ヘルメットの規格」について

海外からバイク用品を買う際に必ず知っておくべき2つのポイントを解説します。

### 関税・消費税は「受け取り時」に払う（免税）
EU圏内のサイト（FC-Moto等）で購入する際、日本への発送を指定すると<strong>現地の高い消費税（約20%前後）が自動で免除された価格</strong>に切り替わります。
ただし、日本国内へ到着し受け取る際に、運送会社（DHLや日本郵便）の配達員に対して、「日本の輸入関税・消費税」を立て替えられた形で支払う必要があります（DDU方式）。おおよそ購入金額の6〜10%程度を見込んでおきましょう。

### ヘルメットの「SGマーク」について
海外から輸入したヘルメット（例えAraiやSHOEIであっても）には、日本国内向けの安全規格である「SGマーク」が貼られていません。
そのため、厳密には<strong>乗車用ヘルメットとして日本国内での販売が禁止</strong>されている規格となります。もちろん「個人の使用」自体は欧米の強固な規格（ECE 22.06やDOT）を通過しているため安全上は問題なく合法ですが、使用はあくまで個人の自己責任となる点に留意してください。

## 結論：バイクライフを圧倒的に豊かにする個人輸入

最初の1回目の購入こそ関税のシステム等に戸惑うかもしれませんが、いざ利用してみると「国内のECサイトと全く同じ感覚」で商品が届くことに驚かされるはずです。

セール期を狙って <strong>FC-Moto</strong> や <strong>ChromeBurner</strong> で欲しかった最高級ギアを半額で手に入れることができれば、浮いたお金でさらに新しいカスタムパーツを買うことも夢ではありません。ぜひ本記事を参考に、海外通販を使ったワンランク上のバイクライフをスタートさせてみてください！
`;

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
    console.error('Error publishing Moto guide:', error);
    process.exit(1);
  } else {
    console.log('Successfully published MOTORCYCLE GEAR OVERSEAS GUIDE perfectly populated from the Supabase Shop mappings!');
    process.exit(0);
  }
}

publishArticle();
