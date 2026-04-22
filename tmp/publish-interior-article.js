const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】海外インテリア通販おすすめ5選！北欧家具・雑貨を安全に個人輸入する極意';
const slug = 'interior-furniture-overseas-guide';
const category = 'ライフスタイル';

const heroImg = '/interior-hero.png';
const nordicNestImg = 'https://placehold.co/800x533/111110/FFFFFF.png?text=Nordic+Nest';
const fdsImg = 'https://placehold.co/800x533/111110/FFFFFF.png?text=Finnish+Design+Shop';
const royalImg = 'https://placehold.co/800x533/111110/FFFFFF.png?text=RoyalDesign';
const anthroImg = 'https://placehold.co/800x533/111110/FFFFFF.png?text=Anthropologie';
const westelmImg = 'https://placehold.co/800x533/111110/FFFFFF.png?text=West+elm';

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
        <td style="padding: 1rem; border: 1px solid #eee;">別（到着時支払）</td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>完璧な日本語</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">北欧デザイン全般</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.finnishdesignshop.com/" target="_blank" rel="noopener"><strong>Finnish Design Shop</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">込 / 別 選択可能</td>
        <td style="padding: 1rem; border: 1px solid #eee;">英語のみ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">本場フィンランド家具</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://royaldesign.jp/" target="_blank" rel="noopener"><strong>RoyalDesign</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;"><strong>関税込み</strong></td>
        <td style="padding: 1rem; border: 1px solid #eee;">日本語あり</td>
        <td style="padding: 1rem; border: 1px solid #eee;">北欧食器・照明</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.anthropologie.com/" target="_blank" rel="noopener"><strong>Anthropologie</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">別（到着時支払）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">英語のみ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">ボヘミアン・雑貨</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.westelm.com/" target="_blank" rel="noopener"><strong>West elm</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">別（到着時支払）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">英語のみ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">NYモダン・都会派</td>
      </tr>
    </tbody>
  </table>
</div>
`;

const content = `
## 憧れの空間を、国内流通価格の「約半額」で組み上げる

アルテックの美しい木目、ルイスポールセンの柔らかな照明、アンソロポロジーの華やかなラグ。
これら海外の一流インテリアを日本の代理店で購入しようとすると、関税やマージンが上乗せされ、時に本国価格の2倍近くになることも珍しくありません。

しかし、現在では優れた国際物流により、<strong>大型家具から繊細なガラス食器まで、誰でも安全に「個人輸入」できる時代</strong>になりました。

本記事では、品質・配送ともに信頼できる<strong>2026年最新のおすすめ海外インテリア通販サイト5選</strong>をプロの視点で厳選。家具特有の関税ルールから電圧の違いまで、絶対に失敗しないための「完全実務マニュアル」とともに解説します。

---

## 1. ひと目でわかる：海外インテリア通販 主要5社 比較表

ショップ名をクリックすると、公式サイトへ直接遷移し、現在のキャンペーンを確認できます。

${comparisonTableHtml}

---

## 2. 絶対に外さない「海外インテリア通販」5選 徹底解説

デザインの美しさはもちろん、「日本への発送が確実」である優良ショップのみを深掘りします。

### Nordic Nest（ノルディックネスト）：北欧インテリアの登竜門
![Nordic Nest](${nordicNestImg})

スウェーデンから直送される <strong>Nordic Nest</strong> は、北欧インテリアを愛する日本人にとって「絶対的インフラ」と言えるショップです。

最大の特徴は、<strong>日本人スタッフによる完璧な日本語サポートとサイト設計</strong>にあります。ストックホルムの洗練された家具、照明、食器類がすべて本国価格で並び、セール時期には国内価格の半額以下になることも。海外通販が初めての方でも、国内の楽天市場等と全く同じ感覚で購入できます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.nordicnest.jp/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Nordic Nest 公式サイトへ ↗</a>
</div>

---

### Finnish Design Shop（フィニッシュデザインショップ）：本場フィンランドの巨匠が集う
![Finnish Design Shop](${fdsImg})

アルヴァ・アアルトの「Artek」や「Marimekko」など、フィンランドを代表するブランドの正規本拠地。圧倒的な在庫量と専門性を誇るのが <strong>Finnish Design Shop</strong> です。

サイトは英語のみですが、チェックアウト時に関税を「事前支払い（DDP）」か「到着時支払い（DDU）」か選べる画期的なシステムを導入しています。大型家具の取り扱いにおいて世界最高峰の信頼性があり、一生もののダイニングテーブルやチェアを探すならここが最終到達点です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.finnishdesignshop.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Finnish Design Shop 公式サイトへ ↗</a>
</div>

---

### RoyalDesign（ロイヤルデザイン）：食器・照明の最強コスパ
![RoyalDesign](${royalImg})

スウェーデンを拠点とする <strong>RoyalDesign</strong> は、Iittala（イッタラ）やArabia（アラビア）をはじめとする北欧食器や、Louis Poulsen（ルイスポールセン）等の照明機器を驚異的な価格で提供するメガストアです。

<strong>関税込み</strong>の明瞭な価格表示と、15,000円以上の購入で送料が大幅に安くなるシステムにより、大量の食器をまとめ買いする際や、新生活のセットアップにおいて比類なきコストパフォーマンスを発揮します。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://royaldesign.jp/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">RoyalDesign 公式サイトへ ↗</a>
</div>

---

### Anthropologie（アンソロポロジー）：圧倒的な華やかさ
![Anthropologie](${anthroImg})

アメリカ発の <strong>Anthropologie</strong> は、ボヘミアンでアーティスティックな世界観で、世界中の女性たちを魅了し続けています。

日本ではアパレルのイメージが強いかもしれませんが、本国では家具やラグ、食器、さらには「引き出しの取っ手（ハードウェア）」に至るまで、細部までデザインされた圧倒的なホームコレクションを展開しています。シンプルな部屋に「主役」となる一点モノの魔法を加えたい時に、このサイトの右に出るものはありません。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.anthropologie.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Anthropologie 公式サイトへ ↗</a>
</div>

---

### West elm（ウエストエルム）：NYブルックリン・モダン
![West elm](${westelmImg})

NY・ブルックリンの洗練された香りをそのまま届けてくれるのが <strong>West elm</strong> です。ミッドセンチュリーとモダンを融合させた、都會的でエッジの効いた家具が揃います。

木材と異素材（真鍮や大理石）を組み合わせたソリッドなデザインが多く、北欧の温もりとはまた違った「シティボーイ／シティガール」の空間を作るのに最適です。アメリカ本国からの発送となるため送料は要確認ですが、日本国内では絶対に被らない洗練された空間が手に入ります。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.westelm.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">West elm 公式サイトへ ↗</a>
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
    console.log('Successfully published INTERIOR GUIDE: Full HTML Table, 100% CTAs, and Pro Manual!');
    process.exit(0);
  }
}
publishArticle();
