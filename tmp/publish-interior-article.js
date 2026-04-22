const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】海外インテリア通販おすすめ9選！北欧家具・雑貨を安全に個人輸入する極意';
const slug = 'interior-furniture-overseas-guide';
const category = 'ライフスタイル';

const heroImg = '/interior-hero.png';
const imgBase = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails';

const ssenseImg = imgBase + '/ssense.webp';
const nordicNestImg = imgBase + '/nordicnest.webp';
const royalImg = imgBase + '/royaldesign.webp';
const uoImg = imgBase + '/urbanoutfitters.webp';
const westelmImg = imgBase + '/westelm.webp';
const flymeeImg = imgBase + '/flymee.webp';
const fdsImg = imgBase + '/finnishdesignshop.webp';
const conranImg = imgBase + '/conranshop.webp';
const museImg = imgBase + '/musehome.webp';

const comparisonTableHtml = `
<div style="overflow-x: auto; margin: 2rem 0;">
  <table style="width: 100%; border-collapse: collapse; min-width: 600px; border: 1px solid #eee;">
    <thead>
      <tr style="background: #111; color: #fff;">
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">サイト名</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">関税表示</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">言語対応</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">カテゴリー</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.nordicnest.jp/" target="_blank" rel="noopener"><strong>Nordic Nest</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">別（到着時）</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>完璧な日本語</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">北欧デザイン全般</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://royaldesign.com/jp" target="_blank" rel="noopener"><strong>RoyalDesign</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>関税込み</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">日本語あり</td>
        <td style="padding: 1rem; border: 1px solid #eee;">北欧食器・照明</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.urbanoutfitters.com/" target="_blank" rel="noopener"><strong>Urban Outfitters</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">別（到着時）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">英語のみ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">US若年層トレンド</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.westelm.com/" target="_blank" rel="noopener"><strong>West elm</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">別（到着時）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">英語のみ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">NYモダン・都会派</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://flymee.jp/" target="_blank" rel="noopener"><strong>FLYMEe</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">国内発送</td>
        <td style="padding: 1rem; border: 1px solid #eee;">日本語</td>
        <td style="padding: 1rem; border: 1px solid #eee;">国内最大級セレクト</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.ssense.com/ja-jp/everything-else" target="_blank" rel="noopener"><strong>SSENSE (Home)</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>関税込み</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>完璧な日本語</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">ハイブランド雑貨</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.finnishdesignshop.com/" target="_blank" rel="noopener"><strong>Finnish Design Shop</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">込 / 別 選択式</td>
        <td style="padding: 1rem; border: 1px solid #eee;">英語のみ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">フィンランド直</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.conranshop.jp/" target="_blank" rel="noopener"><strong>The Conran Shop</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">国内発送</td>
        <td style="padding: 1rem; border: 1px solid #eee;">日本語</td>
        <td style="padding: 1rem; border: 1px solid #eee;">UK発・プレミアム</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://musehome.shop/" target="_blank" rel="noopener"><strong>MUSE HOME</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">国内発送</td>
        <td style="padding: 1rem; border: 1px solid #eee;">日本語</td>
        <td style="padding: 1rem; border: 1px solid #eee;">ドラマ風ラグジュアリ</td>
      </tr>
    </tbody>
  </table>
</div>
`;

const content = `
## 憧れの空間を、国内流通価格の「約半額」で組み上げる

アルテックの美しい木目、ルイスポールセンの柔らかな照明、洗練された海外テイストのラグ。
これら海外の一流インテリアを日本の店舗で購入しようとすると、関税やマージンが上乗せされ、驚くほど高額になることも珍しくありません。

しかし、現在では優れた国際物流により、<strong>大型家具から繊細なガラス食器まで、誰でも安全に「個人輸入」できる時代</strong>になりました。ハードルが心配な方のために、海外テイストをそのまま日本へ届けてくれる優秀な国内セレクトショップも存在します。

本記事では、品質・配送ともに信頼できる<strong>2026年最新のおすすめ海外インテリア通販サイト9選</strong>をプロの視点で徹底比較。絶対に失敗しないための「完全実務マニュアル」とともにお届けします。

---

## 1. ひと目でわかる：海外インテリア通販 決定版9社 比較表

ショップ名をクリックすると、公式サイトで最新のキャンペーン状況を確認できます。

${comparisonTableHtml}

---

## 2. 絶対に外さない「海外インテリア通販」9選 徹底解説

デザインの美しさはもちろん、「日本への到着・決済が確実」である優良ショップのみを深掘りします。

### 1. Nordic Nest（ノルディックネスト）：北欧インテリアの登竜門
![Nordic Nest](${nordicNestImg})

スウェーデンから直送される <strong>Nordic Nest</strong> は、北欧インテリアを愛する日本人にとって「絶対的インフラ」と言えるショップです。

最大の特徴は、<strong>日本人スタッフによる完璧な日本語サポートとサイト設計</strong>にあります。ストックホルムの洗練された家具、照明、食器類がすべて本国価格で並び、セール時期には国内価格の半額以下になることも。海外通販が初めての方でも、国内の楽天市場等と全く同じ感覚で購入できます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.nordicnest.jp/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Nordic Nest 公式サイトへ ↗</a>
</div>

---

### 2. RoyalDesign（ロイヤルデザイン）：食器・照明の最強コスパ
![RoyalDesign](${royalImg})

スウェーデンを拠点とする <strong>RoyalDesign</strong> は、Iittala（イッタラ）やArabia（アラビア）をはじめとする北欧食器や照明機器を驚異的な価格で提供するメガストアです。

<strong>関税込み</strong>の明瞭な価格表示と、一定額以上の購入で送料が割引になるシステムにより、大量の食器をまとめ買いする際において比類なきコストパフォーマンスを発揮します。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://royaldesign.com/jp" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">RoyalDesign 公式サイトへ ↗</a>
</div>

---

### 3. Urban Outfitters（アーバンアウトフィッターズ）：若年層の最先端トレンド
![Urban Outfitters](${uoImg})

アメリカ発。インテリアにおいてもファッションに並ぶ「遊び心」に突き抜けています。

Y2Kテイストやレトロポップなレコードプレイヤー、ちょっとエッジの効いたネオンサインやクッションなど、部屋のアクセントになる尖ったアイテムが豊富。海外のティーンの部屋のような独自の空間を作りたい方に絶大な支持を得ています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.urbanoutfitters.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Urban Outfitters 公式サイトへ ↗</a>
</div>

---

### 4. West elm（ウエストエルム）：NYブルックリン・モダン
![West elm](${westelmImg})

NY・ブルックリンの洗練された香りをそのまま届けてくれるのが <strong>West elm</strong> です。ミッドセンチュリーとモダンを融合させた、都會的でエッジの効いた家具が揃います。

木材と真鍮・大理石などの異素材を組み合わせたソリッドなデザインは、北欧の温もりとはまた違った「シティボーイ／シティガール」の空間を作るのにおすすめです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.westelm.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">West elm 公式サイトへ ↗</a>
</div>

---

### 5. FLYMEe（フライミー）：日本最大級のセレクトの壁
![FLYMEe](${flymeeImg})

海外から取り寄せるのが不安な場合や、数百のブランドを一度に比較したい場合の最終兵器が <strong>FLYMEe</strong> です。

国内外500以上のブランドを取り扱う日本最大級のインテリア通販であり、CassinaやVitraなどの海外トップブランドも網羅しています。独自のポイント還元などが手厚いため、高額な家具を買う際は実質的な値引きを見込めることも多いです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://flymee.jp/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">FLYMEe 公式サイトへ ↗</a>
</div>

---

### 6. SSENSE（エッセンス）：ハイブランドのエッジイなホームグッズ
![SSENSE](${ssenseImg})

ファッション通販の王者 <strong>SSENSE</strong> には「EVERYTHING ELSE（それ以外すべて）」という隠れた名物カテゴリーがあります。

ここにはMaison Margielaのキャンドルから、Alessiのキッチンウェア、Bang & Olufsenのスピーカーまで、モードファッションと親和性の高いデザイナーズ雑貨が凝縮されています。関税込みの明朗会計で、お洒落な男性・女性へのギフト探しにも最強の威力を発揮します。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com/ja-jp/everything-else" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SSENSE ホーム＆インテリア ↗</a>
</div>

---

### 7. Finnish Design Shop（フィニッシュデザインショップ）：本場フィンランド直
![Finnish Design Shop](${fdsImg})

アルヴァ・アアルトの「Artek」や「Marimekko」など、フィンランドを代表するブランドの正規本拠地。圧倒的な在庫量と専門性を誇るのが <strong>Finnish Design Shop</strong> です。

チェックアウト時に関税を「事前支払い（DDP）」か「到着時支払い（DDU）」か選べる画期的なシステムを導入しています。大型家具の取り扱いにおいて世界最高峰の信頼性があり、一生もののダイニングテーブルやチェアを探すならここがベストです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.finnishdesignshop.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Finnish Design Shop 公式サイトへ ↗</a>
</div>

---

### 8. The Conran Shop（ザ・コンランショップ）：モダンデザインの最高峰
![The Conran Shop](${conranImg})

イギリス発。テレンス・コンランによって設立された、世界中から「本当に質の高いモダンデザイン」だけを集めたプレミアムなショップです。

巨匠のマスターピースから若手デザイナーの新作まで、ここに置かれている物こそが世界の基準と言っても過言ではありません。価格帯は高いですが、日本の代理店経由で完璧な品質管理のもと購入できるのは大きなメリットです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.conranshop.jp/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">The Conran Shop 公式へ ↗</a>
</div>

---

### 9. MUSE HOME（ミューズホーム）：SNSで話題の「海外風」
![MUSE HOME](${museImg})

「手軽に海外ドラマのような部屋を作りたい」という若い女性を中心に爆発的な人気を誇るのが <strong>MUSE HOME</strong> です。

大理石柄のテーブル、ゴールドのフレーム、ベロア素材のチェアなど、SNS映えするラグジュアリーなアイテムが驚くほど手頃な価格で揃います。厳密には輸入代行・セレクトの形をとっているため、日本の住環境にサイズ感がフィットしやすいのも魅力です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://musehome.shop/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MUSE HOME 公式サイトへ ↗</a>
</div>

---

## 3. 絶対に失敗しないための「海外インテリア・実践マニュアル」

大型で高価な家具の輸入は、ファッションとは異なる特有の「罠」があります。以下の実務知識を必ず抑えてください。

### 3.1 家具の関税は「無税」だが、消費税はかかる
ファッション（衣服）には高い関税がかかることが多いですが、実は<strong>テーブルや椅子などの「家具類」は、WTO協定により関税が無税（0%）</strong>と定められています。
ただし、<strong>輸入消費税（10%）</strong>は発生します。商品代金の60%（課税対象額）に対して10%がかけられるため、商品代金の約6%が到着時に請求されると考えておくと計算が狂いません。

### 3.2 照明器具の「電圧」と「プラグ形状」問題
北欧などヨーロッパのショップで照明を買う場合、コンセントのプラグが丸い「Cタイプ」などのヨーロッパ仕様になっています。
*   <strong>対策</strong>: 家電量販店やAmazonで数百円で売られている「変換プラグ」を挟めば、日本のコンセントに挿すことが可能です。
*   <strong>電圧の違い</strong>: ヨーロッパは220V〜240V仕様ですが、電球を入れるだけの「ペンダントライト」等の場合、日本の100V環境で日本のLED電球（E26口金などサイズが合うもの）をハメれば、問題なく点灯します（※ただし自己責任での利用となります）。

### 3.3 万が一の破損に備える「クレーム例文」
ガラス製品や家具など、長旅で破損するリスクはゼロではありません。届いたらすぐにダンボールを開け、傷があれば以下のメールとともに写真を送ってください。優良店は速やかに再送や返金に応じてくれます。

<strong>■ 破損があった場合の英語テンプレート</strong>
> "Hi Customer Support,
> I received order #[自分の注文番号], but unfortunately, the item arrived damaged. I have attached a few photos showing the condition of the package and the broken parts. Could you please arrange a replacement or a full refund?
> Thank you."
> （注文商品が破損して届きました。パッケージと破損箇所の写真を添付します。交換か全額返金をお願いできますか？）

---

## 結論：インテリアこそ、世界と繋がる価値が最も大きい

日本国内の限られたラインナップと高額なマージンから解放され、現地の人々と同じ価格でデザインを享受する。
初めての個人輸入なら、日本語が完璧な <strong>Nordic Nest</strong> か <strong>RoyalDesign</strong> から、小さなマグカップや照明一つから始めてみてください。あなたの部屋に確かな「本物の質感」が宿るはずです。
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
    console.log('Successfully published INTERIOR GUIDE V3: 9 Shops, Fixed URLs, Real Screenshots!');
    process.exit(0);
  }
}
publishArticle();
