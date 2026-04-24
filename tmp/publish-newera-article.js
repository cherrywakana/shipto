const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】ニューエラ（New Era）の海外通販・個人輸入ガイド！日本未発売モデルを買う方法とおすすめ店舗6選';
const slug = 'newera-cap-overseas-guide';
const category = 'ファッション';

const heroImg = '/newera-hero.png';

// Dynamically utilizing existing DB image URLs for previously registered shops
const asosImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/asos.webp?t=1773492251025';
const endImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/end-clothing.webp?t=1772403770389';
const uoImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/urbanoutfitters.webp';
const sxImg = 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/stockx.webp';

// Placeholders for newly registered shops requiring screenshots
const lidsImg = 'https://placehold.co/800x533/ffcce6/000000.png?text=Lids';
const amzImg = 'https://placehold.co/800x533/ffcce6/000000.png?text=Amazingstore';

const comparisonTableHtml = `
<div style="overflow-x: auto; margin: 2rem 0;">
  <table style="width: 100%; border-collapse: collapse; min-width: 600px; border: 1px solid #eee;">
    <thead>
      <tr style="background: #111; color: #fff;">
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">ショップ名</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">強み（限定・別注）</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">日本直送</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">決済・関税</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.asos.com/men/a-to-z-of-brands/new-era/cat/?cid=7475" target="_blank" rel="noopener"><strong>ASOS</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">アパレル充実・一定額で送料無料</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（直接配送）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">円・関税込みの選択可</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.endclothing.com/jp/brands/new-era" target="_blank" rel="noopener"><strong>END. (End Clothing)</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">FOG等ハイブランド・限定コラボ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（直接配送）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">関税込み（DDP）</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.lids.com/" target="_blank" rel="noopener"><strong>Lids</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">米国最大・MLB世界一の品揃え</td>
        <td style="padding: 1rem; border: 1px solid #eee;">不可（転送必須）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">ドル決済</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://stockx.com/brands/new-era" target="_blank" rel="noopener"><strong>StockX</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">完売した激レア限定品の二次流通</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（真贋鑑定付）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">関税込み</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.urbanoutfitters.com/brands/new-era" target="_blank" rel="noopener"><strong>Urban Outfitters</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">絶妙なセレクト別注カラー</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（直接配送）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">円決済対応</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://amazingstore.jp/" target="_blank" rel="noopener"><strong>Amazingstore</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">日本国内の巨大並行輸入ショップ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（国内拠点）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">国内通貨・関税なし</td>
      </tr>
    </tbody>
  </table>
</div>
`;

const content = `
## なぜ日本のニューエラファンは「海外通販」を利用するのか？

ストリートファッションに欠かせない「New Era（ニューエラ）」のキャップ。
しかし、ディープなキャップフリークたちの間では、<strong>「日本未発売の限定モデル」や「海外ショップ別注デザイン（通称：Exclusive）」</strong>を海外から直接個人輸入することが密かな常識となっています。サイドパッチが入ったカスタムカラーの「59FIFTY」などは、日本では手に入らないか、入っても一瞬でプレミア価格になってしまうからです。

### 🚨 最初の難関：米国の公式ストアは日本に送れない
多くの人が最初に挫折するポイントとして、<strong>New Eraの米国公式オンラインストア（NewEraCap.com）は、日本への直接配送を一切行っていません。</strong> 

そこで本記事では、公式を迂回しつつ<strong>「安全にニューエラを輸入できる」</strong>非常に優秀なグローバルセレクトショップや専門店を厳選してご紹介します。レア度を優先する方のための中・上級者向けルートも併せて解説しています。

---

## 1. ひと目でわかる：New Era海外モデル購入ルート 6選

海外モデルを入手するためには、アパレル系グローバルECの特設ページを利用するか、転送サービスを駆使して米国の帽子専門店から引き抜くルートがポピュラーです。

${comparisonTableHtml}

---

## 2. 絶対に外さない「New Era取扱ショップ」6選 徹底解説

当サイトが厳選した、豊富な在庫を持つファッション特化ECや、入手困難なレアモデルを揃える専門店までを紹介します。

### 1. ASOS（エイソス）
![ASOS](${asosImg})

イギリスを代表する巨大ファッションECサイト。MLBのゴリゴリのスポーツモデルというよりは、服装に合わせやすい「カジュアルライン」や「コーデュロイ素材」などのニューエラが豊富です。一定額を超えると<strong>日本への国際送料が無料になる</strong>ケースも多く、他のアパレルと一緒にまとめ買いするのに非常に適しています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.asos.com/men/a-to-z-of-brands/new-era/cat/?cid=7475" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">ASOSのNew Era特設ページへ ↗</a>
</div>

---

### 2. END. (End Clothing)
![END.](${endImg})

ストリートヘッズから絶大な支持を集めるイギリスの高級セレクトショップ。
ここでは通常のモデルよりも、「Fear of God Essentials（FOG）」や「Off-White」など、<strong>世界的ハイブランドとニューエラがコラボした限定アイテム</strong>が主力の狙い目です。非常に競争率が高いですが、決済にあらかじめ日本の関税を組み込む（DDP）設定も可能で、ハイエンド層には欠かせないショップです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com/jp/brands/new-era" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END.のNew Era特設ページへ ↗</a>
</div>

---

### 3. Lids（リッズ）：米国最大の専門店（※上級者向け・転送必須）
![Lids](${lidsImg})

ニューエラファンにとっての聖地、それがアメリカ最大のベースボールキャップ専門店「Lids」です。
<strong>MLB公式別注モデルの世界最大の宝庫</strong>であり、ここでしか買えないサイドパッチ付きのExclusiveモデルが毎日のようにドロップされます。ただし、<strong>日本への直接配送には対応していない</strong>ため、「Planet Express」等の<strong>米国転送サービス（輸入代行）の利用が必須</strong>となります。ハードルは高いですが、他の誰も被っていない真のレア物が手に入ります。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.lids.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Lids 公式サイトへ ↗</a>
</div>

---

### 4. StockX（ストックエックス）：完売品の最終兵器
![StockX](${sxImg})

「Supremeコラボを逃した」「数年前の限定サイドパッチモデルがどうしても欲しい」。そんな時の最終手段がリセールプラットフォームのStockXです。
全ての商品がプロによって<strong>真贋鑑定済み</strong>のため、偽物を掴まされるリスクが限りなくゼロ。プレ値にはなりますが、世界中のデッドストックを確実に日本へ取り寄せることが可能です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://stockx.com/brands/new-era" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">StockXのNew Eraページへ ↗</a>
</div>

---

### 5. Urban Outfitters（アーバンアウトフィッターズ）
![Urban Outfitters](${uoImg})

アメリカの若者に大人気のライフスタイル通販サイト。一時期ほどの在庫数はありませんが、スポーツ特化の店にはない、<strong>淡いパステルカラーや、アースカラー（ブラウン、グリーン等）の「UO別注ニューエラ」</strong>が不定期にリリースされます。ファッションアイテムとして変化球のニューエラを取り入れたいタイミングにチェックしたいショップです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.urbanoutfitters.com/brands/new-era" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Urban OutfittersのNew Era取扱一覧へ ↗</a>
</div>

---

### 6. Amazingstore（アメイジングストア）：国内最速の並行輸入
![Amazingstore](${amzImg})

「どうしても転送サービスや英語が面倒……」という場合の最終防衛ラインが日本の並行輸入ショップ大手の『Amazingstore』です。
もちろん海外から直接買うよりも国内利益が乗っているため割高ですが、<strong>「海外限定品を明日、関税ゼロで安全に受け取れる」</strong>唯一の手段として、初心者にとっては大変重宝するショップです。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://amazingstore.jp/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Amazingstore 公式サイトへ ↗</a>
</div>

---

## 3. 実践マニュアル：海外限定ニューエラ購入の「掟」

### 3.1 自分の「マイ・サイズ」を完璧に把握せよ
ニューエラの王道モデル「59FIFTY」は、後ろにアジャスター（サイズ調整ベルト）がついていないため、<strong>1/8インチ（約1cm）刻み</strong>で自分に合ったサイズを見つける必要があります。
日本で7 3/8（58.7cm）がジャストであれば、海外で買っても基本は同じです。アジャスター無しの帽子を海外から買う以上、返品・交換は絶望的だと考え、必ず日本の直営店やスポーツショップで一度試着し、自分のサイズを暗記してから挑んでください。

### 3.2 転送サービスの賢い使い方（Lids攻略法）
Lidsなどで本場の限定キャップを購入する場合、<strong>『Planet Express』</strong>や<strong>『Shipito』</strong>といった転送サービスに登録し、アメリカ国内に「自分専用の受け取り住所（オレゴン州などの免税州がおすすめ）」を発行してもらいます。
帽子単体はとても軽く、転送料金も比較的安く済むため、2〜3個まとめて箱に入れて日本へ転送（同梱発送）してもらうのが、手数料のロスを防ぐ最もポピュラーなテクニックです。

---

## 結論：国内の争奪戦から抜け出し、自分だけの「Exclusive」を

日本のストリートで、誰かと同じニューエラを被ってしまう気まずさ。それを解決できるのが「海外のアライアンス店舗からの直輸入」という武器です。

まずは直結リンクから <strong>ASOS</strong> や <strong>END.</strong> を覗いて、日本未発売の別注カラーを探してみてください。そこからさらにディープなMLBの世界に足を踏み入れたくなったら、<strong>Lids ＋ 転送サービス</strong>の門を叩くのをおすすめします。あなたのキャップライフが劇的に進化するはずです。
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
    console.error('Error publishing newera article:', error);
    process.exit(1);
  } else {
    console.log('Successfully published NEW ERA OVERSEAS GUIDE: Demoted UO & Integrated Exact CTA Links!');
    process.exit(0);
  }
}
publishArticle();
