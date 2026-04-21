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
const hmgImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/hyperlite-mountain-gear.webp?t=1773492268543';
const trekkinnImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/trekkinn.webp?t=1773492286787';
const ldImg = '/ld-mountain-centre.png'; // 新規追加したスクショ
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
1.  **欧州の信頼できるショップを利用する**: 英国の **LD Mountain Centre** 等は、歴史的に直送制限が緩く、日本へ直送可能なケースが多々あります。
2.  **ファッション系モールを利用する**: **SSENSE** 等のファッションモールは、通常の「アウトドア卸」とは異なる契約形態のため、パタゴニアなども直送できることがあります。
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
*   **信頼性**: 100年以上の歴史を誇る会員制組織が運営。
*   **直送**: 多くの自社区分ギアは直送可能。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.rei.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">REI 公式サイト ↗</a>
</div>

*   ショップ詳細：[REI（アールイーアイ）のガイド](/shops/rei)

---

### Hyperlite Mountain Gear (HMG)
![HMG スクリーンショット](${hmgImg})

**UL（ウルトラライト）ハイカーの頂点に君臨する白いギア**
米国メイン州の自社工場から、究極に削ぎ落とされた軽量ギアを直送。

*   **強み**: 日本での品薄状態を気にせず最新の「Dyneema」製ギアを入手可能。
*   **直送**: 日本への発送に非常に積極的で送料も明確。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.hyperlitemountaingear.com/" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">HMG 公式サイト ↗</a>
</div>

*   ショップ詳細：[Hyperlite Mountain Gear (ハイパーライト・マウンテン・ギア)のガイド](/shops/hyperlite-mountain-gear)

---

## 3. 直送制限を突破する「欧州・英国」の実力店

「転送は面倒、でもアークテリクスが直送で欲しい」そんな方のための本命エリアです。

### LD Mountain Centre（LDマウンテンセンター）
![LD Mountain Centre スクリーンショット](${ldImg})

**1966年創業。英国屈指の老舗が提供する「本物」のラインナップ**
実はBerghaus（バーグハウス）の創設者によって設立された、歴史あるショップです。

*   **強み**: Arc\'teryx, Patagonia, The North Face 等、日本人が狙うブランドを網羅。
*   **直送**: 日本への直送実績が非常に豊富で、プロ意識の高い梱包・配送で知られています。
*   **信頼**: 小規模ながらも専門知識が豊富で、相談もしやすい（英語）。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ldmountaincentre.com/" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">LD Mountain Centre 公式サイト ↗</a>
</div>

*   ショップ詳細：[LD Mountain Centre（LDマウンテンセンター）のガイド](/shops/ld-mountain-centre)

---

### Trekkinn（トレッキン）
![Trekkinn スクリーンショット](${trekkinnImg})

**世界最大級のスポーツモール。圧倒的な安さと日本郵便での利便性**
とにかく「消耗品や小物を安く、トラブルなく」手に入れたい初心者の味方。

*   **直送**: スペイン拠点。制限は一部あるが、膨大な在庫により代替品も見つけやすい。
*   **送料**: 日本郵便が選べるため、受け取りが楽。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.tradeinn.com/trekkinn/en" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Trekkinn 公式サイト ↗</a>
</div>

*   ショップ詳細：[Trekkinn (トレッキン)のガイド](/shops/trekkinn)

---

## 4. ファッション×アウトドア：ゴープコア（Gorpcore）の聖地

今やアウトドアギアは、街着としても最高級の評価を得ています。ファッションモール経由なら、規制を回避して最新モデルが直送できる裏技的な使い方が可能です。

### SSENSE（エッセンス）
![SSENSE スクリーンショット](${ssenseImg})

**カナダ発のラグジュアリーモール。アークテリクスの品揃えは世界屈指**
アウトドア卸とは契約が異なるため、アークテリクスなどが「問題なく日本へ直送できる」ケースが多いです。

*   **強み**: Arc\'teryx Veillance などの希少ハイエンドライン。
*   **価格**: 関税込み表示（DDP）のため、追加費用なしの安心感。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SSENSE 公式サイト ↗</a>
</div>

*   ショップ詳細：[SSENSE（エッセンス）のガイド](/shops/ssense)

---

### END.（エンド）
![END. スクリーンショット](${endImg})

**イギリス発。ストリートとアウトドアが融合した独自のセレクト**
ハイセンスなギアを身に着けたモデル写真が豊富で、サイズ選びの参考に最適。

*   **強み**: Nike ACG や Patagonia のファッション性の高いカラー。
*   **直送**: 非常に高速な国際配送（FedEx/DHL等）に対応。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END. 公式サイト ↗</a>
</div>

*   ショップ詳細：[END.（エンド）のガイド](/shops/end)

---

### FARFETCH（ファーフェッチ）
![FARFETCH スクリーンショット](${farfetchImg})

**世界中の実店舗を繋ぐ、世界最大のラグジュアリープラットフォーム**
世界中のアウトドアショップの在庫が見えるため、他で枯渇しているサイズが見つかることがあります。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.farfetch.com" target="_blank" rel="noopener" style="display: inline-block; background: #111110; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">FARFETCH 公式サイト ↗</a>
</div>

*   ショップ詳細：[FARFETCH（ファーフェッチ）のガイド](/shops/farfetch)

---

## 結論：ブランドと「直送の可否」で使い分けるのが正解

アウトドアギアの海外通販は、「安いだけ」ではありません。

1.  **「直送できない」**最新・セール品を本気で狙うなら **Backcountry / REI + 転送サービス**。
2.  **「面倒なく、英国老舗から直送」**で手に入れたいなら **LD Mountain Centre**。
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
    console.log('Successfully published OUTDOOR GUIDE Ver 2.1 with LD Mountain Centre!');
    process.exit(0);
  }
}
publishArticle();
