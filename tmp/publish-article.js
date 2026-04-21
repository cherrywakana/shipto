const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】海外通販サイトのアウトドアおすすめ6選！アークテリクスやパタゴニアが驚きの現地価格で買える優良店を厳選';
const slug = 'overseas-outdoor-shops-guide';
const category = 'アウトドア';

// 画像パス (publicディレクトリ配下の実際の名前に基づく)
const heroImg = '/outdoor_guide_main_hero_v2_1776764001023.png';
const backcountryImg = '/shop_backcountry_visual_1776764018948.png';
const wildboundsImg = '/shop_wildbounds_visual_v3_premium_1776764198175.png';
const hmgImg = '/shop_hmg_visual_v3_minimal_retry_1776764247982.png';
const ellisImg = '/shop_ellis_brigham_visual_v3_uk_1776764262228.png';
const trekkinnImg = '/shop_trekkinn_visual_v4_scale_final_1776764314677.png';
const varusteImg = '/shop_varuste_visual_v3_nordic_final_1776764300588.png';

const content = `
## 海外通販で本物のアウトドアギアを「現地価格」で手に入れる時代

登山、キャンプ、そして本格的なバックカントリー。アウトドア愛好家にとって、**アークテリクス（ARC'TERYX）**や**パタゴニア（Patagonia）**などのトップブランドのギアは、もはや単なる装備ではなく「一生の相棒」です。

しかし、近年続く物価高騰と円安の影響により、国内の直営店価格は上昇の一途をたどっています。「憧れのギアがあるが、日本では高すぎて手が出ない」「国内では完売してどこにも在庫がない」——。そんな悩みを解決するのが、海外の有力ショップから直接取り寄せる「個人輸入」です。

本記事では、日本からの利用実績が豊富かつ、世界中のハイカーから絶大な信頼を寄せられている**「本気で選ぶべき海外通販サイト」**を6つに厳選。関税の仕組みから送料、そして最も安く買うためのコツまで、3500文字を超える圧倒的なボリュームで徹底解説します。

---

## 2026年版：主要アウトドア海外通販サイト比較表

| ショップ名 | 得意なブランド | 関税方式 | 日本発送 | 特徴 |
| :--- | :--- | :--- | :--- | :--- |
| **Backcountry** | 総合（ARC, Patagonia等） | DDU（到着時） | ✈️ 直送OK | 世界最大級の在庫量 |
| **Wildbounds** | 英国系レアギア・EDC | DDU（到着時） | ✈️ 直送OK | センスが光るセレクト |
| **HMG** | ULバックパック | DDU（到着時） | ✈️ 直送OK | ULギアの最高峰 |
| **Ellis Brigham** | 英国老舗・テクニカル | DDU（到着時） | ✈️ 直送OK | 圧倒的な信頼感 |
| **Varuste.net** | 北欧ブランド | DDU（到着時） | ✈️ 直送OK | 現地VAT免除で格安 |
| **Trekkinn** | 圧倒的な安さ・小物 | DDU（到着時） | ✈️ 直送OK | 日本郵便利用で安心 |

---

## 1. Backcountry（バックカントリー）：世界最大級のアウトドア・デパートメント

### Backcountry (バックカントリー)
![Backcountry ショップイメージ](${backcountryImg})

**「ここに無ければ、世界中どこにもない」**。そう言わしめるほどの圧倒的な在庫量を誇るのが、米国ユタ州を拠点とする[Backcountry.com](https://www.backcountry.com)です。

#### 圧倒的なブランドリストと在庫の深さ
Backcountryの最大の強みは、その取り扱いブランドの幅広さです。アークテリクス、パタゴニア、ノースフェイス、ブラックダイヤモンド、スポルティバ……など、1,000を超えるトップブランドの最新モデルが、全サイズ・全カラーで揃う勢いです。
特に「国内では即完売してしまう人気カラー」や、限定モデルの在庫が豊富に残っていることが多く、最後の砦として利用するユーザーも少なくありません。

#### 日本への発送と関税のポイント
Backcountryは日本への直送に対応していますが、アウトドアウェア、キャンプギア、シューズに関しては、多くが直送可能です。
関税については、到着時に運送会社（UPSやFedEx等）に支払う「DDU」形式が一般的です。決済金額から「米国現地の消費税」が差し引かれるため、表示価格以上に安く買えるのが魅力です。

<div style="margin: 2.5rem 0; text-align: center;">
  <a href="https://www.backcountry.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15); transition: transform 0.2s;">Backcountry 公式サイトへ ↗</a>
</div>

*   **ショップ詳細：[Backcountry（バックカントリー）のガイド](/shops/backcountry)**

---

## 2. Wildbounds（ワイルドバウンズ）：感性を揺さぶる「次世代」のセレクト

### Wildbounds (ワイルドバウンズ)
![Wildbounds ショップイメージ](${wildboundsImg})

一般的な量販店に飽きた玄人ハイカーが辿り着くのが、イギリス発の[Wildbounds](https://wildbounds.com/)です。「Quality, Sustainability, and Adventure」をテーマに、世界中から選び抜かれたブティックブランド（新進気鋭の小規模ブランド）を多数扱っています。

#### 他のショップでは見つからない「一点モノ」の出会い
Wildboundsが扱うギアは、どれも機能性だけでなく「美しさ」を兼ね備えています。北欧のハンドメイドナイフ、ガレージブランドのバックパック、一生モノのチタン製キャンプ用品など、日本のセレクトショップでもなかなかお目にかかれないアイテムが並びます。

<div style="margin: 2.5rem 0; text-align: center;">
  <a href="https://wildbounds.com/" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Wildbounds 公式サイトへ ↗</a>
</div>

*   **ショップ詳細：[Wildbounds (ワイルドバウンズ)のガイド](/shops/wildbounds)**

---

## 3. Hyperlite Mountain Gear（HMG）：ULハイカーの頂点に君臨する

### Hyperlite Mountain Gear (ハイパーライト・マウンテン・ギア)
![HMG ショップイメージ](${hmgImg})

軽量化を追求するハイカーたちのアイコンとも言える白いバックパック。その生みの親である[Hyperlite Mountain Gear](https://www.hyperlitemountaingear.com/)の直販サイトです。米国メイン州の自社工場で職人が一つひとつ作り上げる、妥協なきULギアを「本国価格」で手に入れられます。

#### DCF（ダイニーマ）という革命
HMGが採用しているDCF（旧キューベンファイバー）は、鋼鉄の15倍の強度を持ち、なおかつ水に浮くほど軽い魔法の素材です。この素材を知り尽くしたHMGのバックパックやテントは、過酷な山行にも耐えうる耐久性を持ちながら、背負っていることを忘れるほどの軽さを提供します。

<div style="margin: 2.5rem 0; text-align: center;">
  <a href="https://www.hyperlitemountaingear.com/" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">HMG 公式サイトへ ↗</a>
</div>

*   **ショップ詳細：[Hyperlite Mountain Gear (ハイパーライト・マウンテン・ギア)のガイド](/shops/hyperlite-mountain-gear)**

---

## 4. Ellis Brigham（エリス・ブリガム）：イギリスが誇るテクニカルショップの老舗

### Ellis Brigham (エリス・ブリガム)
![Ellis Brigham ショップイメージ](${ellisImg})

イギリス国内に多数の実店舗を構える[Ellis Brigham](https://www.ellis-brigham.com/)は、山岳ガイドやプロの冒険家も利用するガチのテクニカルショップです。派手さはありませんが、その信頼性と取り扱いアイテムの「質」の高さは折り紙付きです。

#### 登山靴とテクニカルウェアの宝庫
スポルティバやスカルパなどの本格登山靴、Rab（ラブ）やMountain Equipmentといったイギリス発の質実剛健なブランドを探すならここがベストです。プロのスタッフが厳選した「本当に現場で使えるギア」しか置かないというポリシーが感じられます。

<div style="margin: 2.5rem 0; text-align: center;">
  <a href="https://www.ellis-brigham.com/" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Ellis Brigham 公式サイトへ ↗</a>
</div>

*   **ショップ詳細：[Ellis Brigham (エリス・ブリガム)のガイド](/shops/ellis-brigham)**

---

## 5. Varuste.net（バルステ・ネット）：北欧ブランドを「現地価格」で。

### Varuste.net (バルステ・ネット)
![Varuste ショップイメージ](${varusteImg})

フィンランドのアウトドア愛好家たちのハブとなっているのが[Varuste.net](https://varuste.net/en/)です。このサイトを知っているかどうかで、北欧ブランドの買い物コストは劇的に変わります。
**Fjallraven（フェールラーベン）**、**Hilleberg（ヒルバーグ）**といったブランドの価格は、フィンランド国内のVAT（24%）が免税されるため、日本への送料を払っても十分にお釣りが出ます。

<div style="margin: 2.5rem 0; text-align: center;">
  <a href="https://varuste.net/en/" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Varuste.net 公式サイトへ ↗</a>
</div>

*   **ショップ詳細：[Varuste.net (バルステ・ネット)のガイド](/shops/varuste)**

---

## 6. Trekkinn（トレッキン）：世界中のギアがここに集約される

### Trekkinn (トレッキン)
![Trekkinn ショップイメージ](${trekkinnImg})

世界最大級のスポーツ・アウトドアモール「Tradeinn」グループの[Trekkinn](https://www.tradeinn.com/trekkinn/en)です。圧倒的な在庫数と、日本郵便が選べる安心感が特徴です。

#### 圧倒的な消耗品とアクセサリーの品揃え
メインのギアだけでなく、各種パーツ、スタッフサック、登山用ソックスなどの小物の種類が桁違いです。価格も常に世界最安水準に自動調整されており、コストパフォーマンスは最高です。

<div style="margin: 2.5rem 0; text-align: center;">
  <a href="https://www.tradeinn.com/trekkinn/en" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Trekkinn 公式サイトへ ↗</a>
</div>

*   **ショップ詳細：[Trekkinn (トレッキン)のガイド](/shops/trekkinn)**

---

## 最後に：世界へ冒険の準備を始めよう

海外通販は、一歩踏み出すまでは勇気がいりますが、一度その安さと選択肢の多さを知ってしまうと、世界が劇的に広がります。当サイト「Original Price」では、掲載ショップを厳選しており、すべて本物の正規品が届くことを保証します。

まずは気になるショップの専門ガイドを読み込み、憧れのギアを相棒にして、次の山に向かう準備を始めましょう。
`;

async function publishArticle() {
  // 古い記事を一度削除
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
    console.log('Successfully published PREMIUM article with ALL images!');
    process.exit(0);
  }
}
publishArticle();
