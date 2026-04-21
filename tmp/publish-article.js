const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】海外通販サイトのアウトドアおすすめ8選！アークテリクスやパタゴニアを賢く買うための「直送制限」攻略ガイド';
const slug = 'overseas-outdoor-shops-guide';
const category = 'アウトドア';

// 画像パス
const heroImg = '/outdoor_guide_main_hero_v2_1776764001023.png';
const backcountryImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/backcountry.webp?t=1773492252144';
const reiImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/rei.webp?t=1773492280054';
const wildboundsImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/wildbounds.webp?t=1773492292056';
const hmgImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/hyperlite-mountain-gear.webp?t=1773492268543';
const trekkinnImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/trekkinn.webp?t=1773492286787';
const varusteImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/varuste.webp?t=1773492289553';
const ssenseImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/ssense.webp';
const endImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/end-clothing.webp?t=1772403770389';
const farfetchImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/farfetch.webp';

const content = `
## 海外通販で本物のアウトドアギアを「現地価格」で手に入れる、本当のコツ

アウトドア愛好家にとって、**アークテリクス（ARC\'TERYX）**や**パタゴニア（Patagonia）**は憧れの存在です。しかし、国内価格の高騰や完売続きで、「海外から直接買いたい」と考えるのは極めて合理的。

本記事では、単なる安さの紹介に留まらず、日本のアウトドアファンが海外通販で直面する最大の壁**「ブランドによる日本発送制限」**をどう乗り越えるか、という視点で厳選した8つのショップを徹底解説します。

---

## 1. 知っておくべき「直送制限（Shipping Restrictions）」の法則

まず最初に、最も重要な事実をお伝えします。

**Backcountry（バックカントリー）**や**REI（アールイーアイ）**といった米国の巨大ショップは、アークテリクスやパタゴニアなどの特定ブランドを、メーカーとの契約により**「原則として日本へ直接送ることができません」**。

商品ページを見て「Ships to USA only」と書かれている場合、カートに入れても決済段階で弾かれるか、日本を選べなくなります。これを知らずに探すと時間の無駄になってしまいます。

### 直送制限を突破する3つの戦略
1.  **欧州のショップを利用する**: 同ブランドでも、欧州発のショップ（Varuste等）は制限が緩い場合があります。
2.  **ファッション系モールを利用する**: SSENSE等のファッションモールは、通常の「アウトドア卸」とは異なる契約形態のため、日本へ直送可能なケースが多々あります。
3.  **転送サービス（OPAS等）を活用する**: 米国の住所を経由して日本へ送る手法です。米国国内のセール価格を100%享受できる最大のメリットがあります。

---

## 2. 米国が誇る「本格アウトドアの聖地」3選

直送制限はありますが、その在庫規模とセール価格の爆発力は、米国系ショップが群を抜いています。

### Backcountry（バックカントリー）
![Backcountry スクリーンショット](${backcountryImg})

**世界最大級の在庫を誇る、アウトドア愛好家の「最後の砦」**
もしアークテリクスの完売カラーを米国住所（転送）で手に入れたいなら、ここがベストです。

*   **強み**: 他に類を見ない1,000以上のブランドとカラー展開。
*   **注意**: Patagonia, Arc'teryx 等の人気ブランドは日本直送不可。
*   **攻略法**: 転送サービスを使って「米国国内セール品」を狙うのが玄人の嗜み。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.backcountry.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Backcountry 公式サイト ↗</a>
</div>

*   ショップ詳細：[Backcountry（バックカントリー）のガイド](/shops/backcountry)

---

### REI（アールイーアイ）
![REI スクリーンショット](${reiImg})

**米国最大の消費者協同組合。圧倒的な信頼と独自ブランドのコスパ**
米国で最も信頼されるアウトドアショップといえばREIです。

*   **強み**: 自社ブランド「REI Co-op」のギアが非常に安価で高性能。
*   **信頼性**: 返品ポリシーが極めて寛大（※海外発送時は制限あり）。
*   **直送**: 多くのギアは直送可能だが、やはり人気プレミアムブランドには制限がある。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.rei.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">REI 公式サイト ↗</a>
</div>

*   ショップ詳細：[REI（アールイーアイ）のガイド](/shops/rei)

---

### Hyperlite Mountain Gear (HMG)
![HMG スクリーンショット](${hmgImg})

**UL（ウルトラライト）ハイカーの頂点に君臨する白いギア**
「山と道」などのULギア愛好家なら、避けては通れない白いダイニーマ製のバックパックでお馴染み。

*   **強み**: 本国直送のため、日本での品薄状態を気にせず最新モデルを入手可能。
*   **直送**: 日本への発送に非常に積極的。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.hyperlitemountaingear.com/" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">HMG 公式サイト ↗</a>
</div>

*   ショップ詳細：[Hyperlite Mountain Gear (ハイパーライト・マウンテン・ギア)のガイド](/shops/hyperlite-mountain-gear)

---

## 3. 直送制限を突破する「欧州・実質重視」ショップ

「転送は面倒。だけどパタゴニアが欲しい」という方は欧州に目を向けましょう。

### Varuste.net（バルステ・ネット）
![Varuste スクリーンショット](${varusteImg})

**フィンランドからの刺客。北欧ブランドが驚異の現地価格**
北欧を代表するブランド（Fjallraven, Hilleberg 等）を探すなら世界最安水準です。

*   **直送**: 日本への直送制限が米国ほど厳しくなく、多くが免税価格（VAT抜き）で届く。
*   **信頼**: フィンランドの実店舗がベースのため、プロフェッショナルな対応。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://varuste.net/en/" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Varuste.net 公式サイト ↗</a>
</div>

*   ショップ詳細：[Varuste.net (バルステ・ネット)のガイド](/shops/varuste)

---

### Trekkinn（トレッキン）
![Trekkinn スクリーンショット](${trekkinnImg})

**世界最大級のスポーツモール。圧倒的な安さと日本郵便での利便性**
あらゆる消耗品からギアまで、常に「世界最安値」を競うショップ。

*   **直送**: 制限は多少あるが、商品数が多いため、他で見つからないパーツなども直送可能。
*   **送料**: 日本郵便が選べるため、不在がちな人でも受け取りやすい。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.tradeinn.com/trekkinn/en" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Trekkinn 公式サイト ↗</a>
</div>

*   ショップ詳細：[Trekkinn (トレッキン)のガイド](/shops/trekkinn)

---

## 4. ファッション×アウトドア：ゴープコア（Gorpcore）の聖地

今やアウトドアギアは、街着としても最高級の評価を得ています。ファッションモール経由なら、アークテリクスの希少ライン「Veillance」なども日本へ直送可能です。

### SSENSE（エッセンス）
![SSENSE スクリーンショット](${ssenseImg})

**カナダ発のラグジュアリーモール。アークテリクスの品揃えは世界屈指**
アウトドアショップでは日本へ送れないアークテリクスを、最もスマートに直送できるのがSSENSEです。

*   **強み**: Arc'teryx, Salomon, The North Face などのハイエンドライン。
*   **直送**: 日本直送は完全に公式対応。価格に関税が含まれている（DDP）ため、到着時の追加支払いがなくストレスフリー。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SSENSE 公式サイト ↗</a>
</div>

*   ショップ詳細：[SSENSE（エッセンス）のガイド](/shops/ssense)

---

### END.（エンド）
![END. スクリーンショット](${endImg})

**イギリス発。ストリートとアウトドアが融合した独自のセレクト**
Patagonia や Arc'teryx のアフィリエイト限定品や、コラボモデルを探すならここ。

*   **強み**: 写真が美しく、ギアを身に着けた時のサイズ感が分かりやすい。
*   **直送**: 世界中へエクスプレス配送。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END. 公式サイト ↗</a>
</div>

*   ショップ詳細：[END.（エンド）のガイド](/shops/end)

---

### FARFETCH（ファーフェッチ）
![FARFETCH スクリーンショット](${farfetchImg})

**世界中のセレクトショップを繋ぐプラットフォーム**
世界中のアウトドアショップの在庫が見えるため、他で枯渇しているサイズが見つかることがあります。

*   **直送**: 発送場所によるが、日本へは極めてスムーズに届く。
*   **ブランド**: Arc\'teryx, Salomon, Hoka などの人気ブランドを網羅。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.farfetch.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">FARFETCH 公式サイト ↗</a>
</div>

*   ショップ詳細：[FARFETCH（ファーフェッチ）のガイド](/shops/farfetch)

---

## 結論：ブランドと「直送の可否」で使い分けるのが正解

アウトドアギアの海外通販は、「安いだけ」ではありません。

1.  **「直送できない」**ブランドの最新・セール品を本気で狙うなら **Backcountry / REI + 転送サービス**。
2.  **「面倒なく、直送で安く」**手に入れたいなら **Varuste.net / Trekkinn**。
3.  **「ファッション性と確実な直送」**を求めるなら **SSENSE / END.**。

これらの特性を理解した上で使い分ければ、国内の品薄や高値から解放され、一生モノのギアを最高の条件で手に入れることができます。冒険の準備を始めましょう。
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
    console.log('Successfully published THE ULTIMATE OUTDOOR GUIDE Ver 2.0!');
    process.exit(0);
  }
}
publishArticle();
