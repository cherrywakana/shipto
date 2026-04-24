const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】Needles（ニードルズ）のトラックパンツを海外通販で安く買う！おすすめのサイト6選';
const slug = 'needles-track-pants-overseas-guide';
const category = 'ファッション';
const heroImg = '/needles-hero.png';

// Reusing Existing DB Image URLs
const ssenseImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/ssense.webp';
const endImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/end-clothing.webp?t=1772403770389';
const mrporterImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/mr-porter.webp';
const farfetchImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/farfetch.webp';
const hbxImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/hbx.webp';
const lnccImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/ln-cc.webp';

const comparisonTableHtml = `
<div style="overflow-x: auto; margin: 2rem 0;">
  <table style="width: 100%; border-collapse: collapse; min-width: 600px; border: 1px solid #eee;">
    <thead>
      <tr style="background: #111; color: #fff;">
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">ショップ名</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">特徴・Needlesの品揃え</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">日本直送の可否</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">関税・決済</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.ssense.com/ja-jp/men/designers/needles" target="_blank" rel="noopener"><strong>SSENSE</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">トラックパンツの在庫数No.1・SALEが強烈</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（一定額で無料）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">関税込み</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.endclothing.com/jp/brands/needles" target="_blank" rel="noopener"><strong>END. (End Clothing)</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">END.別注カラーの限定トラックパンツが頻出</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可</td>
        <td style="padding: 1rem; border: 1px solid #eee;">関税込み（選択式）</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.mrporter.com/en-jp/mens/designers/needles" target="_blank" rel="noopener"><strong>MR PORTER</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">モヘアカーディガンやRebuildラインに強い</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可</td>
        <td style="padding: 1rem; border: 1px solid #eee;">関税込み</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://hbx.com/jp/men/brands/needles" target="_blank" rel="noopener"><strong>HBX</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">アジア最大級のHYPEメディア系列・在庫安定</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可</td>
        <td style="padding: 1rem; border: 1px solid #eee;">関税込み</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.ln-cc.com/en/designers/needles/" target="_blank" rel="noopener"><strong>LN-CC</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">コアなH.D.(ヒザデル)パンツのセレクトが秀逸</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可</td>
        <td style="padding: 1rem; border: 1px solid #eee;">関税込み</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.farfetch.com/jp/shopping/men/needles/items.aspx" target="_blank" rel="noopener"><strong>Farfetch</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">世界中のセレクトショップから一括検索</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可</td>
        <td style="padding: 1rem; border: 1px solid #eee;">関税込み</td>
      </tr>
    </tbody>
  </table>
</div>
`;

const content = `
## 日本ブランドなのに「海外から買った方が安い・買える」不思議な現象

世界中のファッションアイコンから絶大な支持を集め、近年飛ぶ鳥を落とす勢いの <strong>Needles（ニードルズ）</strong>。
特に代名詞である「トラックパンツ」や「モヘアカーディガン」は、新作が発表されるや否や日本の直営店（NEPENTHES等）や国内セレクトショップでは即完売し、フリマアプリでプレミア価格が付けられるのが日常茶飯事です。

しかし、ここに <strong>究極の裏ワザ</strong> が存在します。
Needlesは海外の有名セレクトショップに大量の卸（ホールセール）を行っており、<strong>日本では即完売するアイテムが、海外サイトでは普通に定価で、時には大規模なセールの対象として投げ売りされている</strong> という事実があるのです。

本記事では、ファッションプロがこっそり使っている <strong>「Needlesを安く・安全に買える海外通販サイト厳選6社」</strong> を徹底解剖します。

---

## 1. ひと目でわかる：Needles取扱 海外通販比較表

海外のハイエンドなセレクトショップは、商品の価格内に日本の関税があらかじめ含まれている（DDP方式）ことが多く、後から配達員にお金を払う手間がありません。

${comparisonTableHtml}

---

## 2. 絶対に外さない「Needles」海外通販 6選 徹底解説

当サイトで紹介するショップは全て、偽物のリスクが一切ない正規取扱店（Authorized Retailer）のみ。アフィリエイト実績やセール割引率の高さに基づいてランキング化しています。

### 1. SSENSE（エッセンス）
![SSENSE](${ssenseImg})

カナダ発の世界最大級ラクジュアリー通販サイト。<strong>Needlesのトラックパンツを海外通販で探すなら、真っ先にSSENSEを見る</strong> のが服好きの鉄則です。
買い付けの量が圧倒的であり、ナロー（Narrow）、ストレート（Straight）、ヒザデル（H.D.）といった全シルエットが網羅されています。さらに年に2回開催される特大セールでは、人気の柄物トラックパンツやトラックジャケットが普通に <strong>30%〜50%OFF</strong> になるという、日本では考えられない現象が起きます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ssense.com/ja-jp/men/designers/needles" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">SSENSEのNeedles特設ページへ ↗</a>
</div>

---

### 2. END. (End Clothing)
![END.](${endImg})

イギリスを代表するストリート・ハイエンドのセレクトショップ。
ここ最大の強みは <strong>「END. 別注カラーのトラックパンツ」</strong> が不定期にリリースされることです。通常のコレクションには存在しないカラーリングは圧倒的なコレクターズアイテムとなり、国内ではまず手に入りません。新作のドロップ時には「Draw」と呼ばれる抽選システムで行われます。サイトのデザインも非常に洗練されており、眺めているだけでも楽しいストアです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com/jp/brands/needles" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END.のNeedles特設ページへ ↗</a>
</div>

---

### 3. MR PORTER（ミスターポーター）
![MR PORTER](${mrporterImg})

紳士服の頂点に君臨するイギリスの超高級オンラインストア。
トラックパンツだけでなく、<strong>Rebuild by Needles（7ピースのリメイクフランネルシャツ等）や、上質なモヘアカーディガン</strong> など、大人の男性が上品に着こなせるNeedlesのアイテムを非常にセンス良くセレクトしています。梱包の美しさや配送スピード（最短3日）などは世界最高レベルで、ギフト利用にも完璧です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.mrporter.com/en-jp/mens/designers/needles" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">MR PORTERのNeedles取扱一覧へ ↗</a>
</div>

---

### 4. HBX（エイチビーエックス）
![HBX](${hbxImg})

世界最大のストリートカルチャーメディア「Hypebeast」が運営する香港拠点のストア。
アジアのハブであるため日本人体型に合った <strong>「XSサイズ」や「Sサイズ」の在庫が豊富</strong> に残っている確率が高い穴場ショップです。ストリートのトレンドを熟知したバイヤーによるセレクトのため、セットアップで着こなしたくなるような魅力的なカラーのトラックパンツが並んでいます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://hbx.com/jp/men/brands/needles" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">HBX 公式サイトへ ↗</a>
</div>

---

### 5. LN-CC（エルエヌシーシー）
![LN-CC](${lnccImg})

ロンドン東部に実店舗を構える、前衛的でアーティスティックなセレクトショップ。
Needlesの中でも特に玄人好みな <strong>「H.D. Pant（ヒザデルパンツ）」</strong> や、派手な柄のジャガード織りパンツなど、エッジの効いたアイテムを買い付けています。個性的なファッションを好む方であれば、他では見つからない掘り出し物に出会える可能性が高いです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.ln-cc.com/en/designers/needles/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">LN-CC 公式サイトへ ↗</a>
</div>

---

### 6. Farfetch（ファーフェッチ）
![Farfetch](${farfetchImg})

特定の一店舗ではなく、世界数百のセレクトショップの在庫を横断検索できるプラットフォーム。
特定のカラーや過去のシーズンのアイテムを探している場合の「網羅性」は圧倒的です。購入先となる各国のセレクトショップがそれぞれ価格を設定しているため値段にバラつきはありますが、<strong>「どうしてもあの色が欲しい」という時の最終手段</strong> として非常に頼りになります。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.farfetch.com/jp/shopping/men/needles/items.aspx" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Farfetch 公式サイトへ ↗</a>
</div>

---

## 3. 実践マニュアル：海外での「トラックパンツ」サイズの選び方

海外通販で最も不安なのがサイズ選びですが、Needlesに関してはそこまで心配する必要はありません。
なぜなら、Needlesは日本のブランド（ネペンテス）であり、<strong>欧米のショップで売られているものも「ジャパンスペック」で作られている</strong> からです。

*   <strong>XSサイズ：</strong> 一般的な日本のS〜M相当。細身にスタイリッシュに履きたい方に最適。
*   <strong>Sサイズ：</strong> 一般的な日本のM〜L相当。最も標準的で、少しゆとりを持たせたい方向け。
*   <strong>Mサイズ以上：</strong> かなり大きめになります。ダボっとしたストリートスタイルを好む方以外は、基本的にXSかSを選ぶのが無難です。

ウエストはドローコード（紐）で調整できるため、シルエットの好み（ナローかストレートか）と「丈の長さ」を基準に選ぶと失敗しません。

---

## 結論：もう日本のプレ値で買う必要はない

これまでメルカリ等でプレミア価格で買っていた方も、海外の正規セレクトショップを使えば、定価あるいはセール価格で安全に本物のNeedlesを手に入れることができます。

まずは世界最大級の在庫と割引を誇る <strong>SSENSE</strong> をチェックし、好みのカラーが見つからなければ <strong>END.</strong> などの特设サイトを巡回する……これが現代の賢い服好きのスタンダードな買い方です。ぜひ海外通販を駆使して、憧れのトラックパンツを手に入れてください！
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
    console.error('Error publishing needles article:', error);
    process.exit(1);
  } else {
    // Also perform the shop_brands mapping for autonomous collector consistency
    console.log('Mapping Needles to shop_brands...');
    const { data: bData } = await supabase.from('brands').select('id').eq('slug', 'needles').single();
    const { data: sData } = await supabase.from('shops').select('id, slug').in('slug', ['ssense', 'end', 'mr-porter', 'hbx', 'ln-cc', 'farfetch']);
    
    const BRAND_LINKS = {
      'ssense': 'https://www.ssense.com/ja-jp/men/designers/needles',
      'end': 'https://www.endclothing.com/jp/brands/needles',
      'mr-porter': 'https://www.mrporter.com/en-jp/mens/designers/needles',
      'hbx': 'https://hbx.com/jp/men/brands/needles',
      'ln-cc': 'https://www.ln-cc.com/en/designers/needles/',
      'farfetch': 'https://www.farfetch.com/jp/shopping/men/needles/items.aspx'
    };

    if (bData && sData) {
      const payloads = sData.map(shop => ({
        shop_id: shop.id,
        brand_id: bData.id,
        brand_url: BRAND_LINKS[shop.slug],
        status: 'found',
        last_checked_at: new Date().toISOString()
      }));
      await supabase.from('shop_brands').upsert(payloads, { onConflict: 'shop_id, brand_id' });
    }

    console.log('Successfully published NEEDLES OVERSEAS GUIDE and mapped shop_brands!');
    process.exit(0);
  }
}
publishArticle();
