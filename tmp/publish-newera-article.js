const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const title = '【2026年最新】ニューエラ（New Era）の海外通販・個人輸入ガイド！日本未発売モデルを買う方法とおすすめ店舗6選';
const slug = 'newera-cap-overseas-guide';
const category = 'ファッション';

const heroImg = '/newera-hero.png';

// Placeholders for all 6 shops
const lidsImg = 'https://placehold.co/800x533/ffcce6/000000.png?text=Lids';
const amzImg = 'https://placehold.co/800x533/ffcce6/000000.png?text=Amazingstore';
const asosImg = 'https://placehold.co/800x533/ffcce6/000000.png?text=ASOS';
const endImg = 'https://placehold.co/800x533/ffcce6/000000.png?text=END.';
const uoImg = 'https://placehold.co/800x533/ffcce6/000000.png?text=Urban+Outfitters';
const sxImg = 'https://placehold.co/800x533/ffcce6/000000.png?text=StockX';

const comparisonTableHtml = `
<div style="overflow-x: auto; margin: 2rem 0;">
  <table style="width: 100%; border-collapse: collapse; min-width: 600px; border: 1px solid #eee;">
    <thead>
      <tr style="background: #111; color: #fff;">
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">ショップ名</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">特徴・強み</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">日本直送の可否</th>
        <th style="padding: 1.2rem; text-align: left; border: 1px solid #222;">タイプ</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.lids.com/" target="_blank" rel="noopener"><strong>Lids</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">世界最大級の品揃え・限定別注</td>
        <td style="padding: 1rem; border: 1px solid #eee;">不可（転送サービス必須）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">🇺🇸 米国特化</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://amazingstore.jp/" target="_blank" rel="noopener"><strong>Amazingstore</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">日本最大の海外並行輸入ショップ</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（国内拠点のため最速）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">🇯🇵 国内並行輸入</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.asos.com/" target="_blank" rel="noopener"><strong>ASOS</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">ファッションライン・日常使いに</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（一定額で送料無料）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">🇬🇧 グローバルEC</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.endclothing.com/" target="_blank" rel="noopener"><strong>END. (End Clothing)</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">ハイブランド・限定コラボモデル</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（関税込み設定可能）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">🇬🇧 高級セレクト</td>
      </tr>
      <tr>
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://www.urbanoutfitters.com/" target="_blank" rel="noopener"><strong>Urban Outfitters</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">トレンド感あるセレクト別注カラー</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可</td>
        <td style="padding: 1rem; border: 1px solid #eee;">🇺🇸 ファッション</td>
      </tr>
      <tr style="background: #f9f9f9;">
        <td style="padding: 1rem; border: 1px solid #eee;"><a href="https://stockx.com/" target="_blank" rel="noopener"><strong>StockX</strong></a></td>
        <td style="padding: 1rem; border: 1px solid #eee;">完売した激レア限定品の二次流通</td>
        <td style="padding: 1rem; border: 1px solid #eee;">可（鑑定付き）</td>
        <td style="padding: 1rem; border: 1px solid #eee;">🇺🇸 リセール</td>
      </tr>
    </tbody>
  </table>
</div>
`;

const content = `
## なぜ日本のニューエラファンは「海外通販」を利用するのか？

ストリートファッションに欠かせない「New Era（ニューエラ）」のキャップ。
しかし、ディープなキャップフリークたちの間では、**「日本未発売の限定モデル」や「海外のショップ別注デザイン（通称：Exclusive）」**を海外から直接個人輸入することが常識となっています。サイドパッチが入ったカスタムカラーの「59FIFTY」などは、日本では手に入らないか、入っても一瞬でプレミア価格になってしまうからです。

### 🚨 最初の難関：米国の公式オンラインストアは日本に送れない
多くの人が最初に挫折するポイントとして、**New Eraの米国公式オンラインストア（NewEraCap.com）は、日本への直接配送を一切行っていません。** また、MLB公式グッズの総本山であるFanatics等もキャップ類の日本直送を制限しているケースが多いです。

そこで本記事では、**公式以外で「安全に・確実に日本未発売のニューエラを手に入れる」ための厳選6ルート**を徹底解説します。

---

## 1. ひと目でわかる：New Era海外モデル購入ルート 6選

海外モデルを入手するためには、「あえて国内の並行輸入店を使う」アプローチから「転送サービスを使って米国の総本山から買う」アプローチまで、複数の手段が存在します。

${comparisonTableHtml}

---

## 2. 絶対に外さない「New Era取扱ショップ」6選 徹底解説

### 1. Lids（リッズ）：北米最大のヘッドウェア専門店（※転送必須）
![Lids](${lidsImg})

ニューエラファンにとっての聖地、それがアメリカ最大の帽子専門店「Lids」です。
**世界最大級のニューエラ在庫**を誇り、Lidsでしか買えない別注カラーやサイドパッチ付きの限定MLBモデルが毎日のようにドロップされます。
ただし、**日本への直接配送に対応していません**。そのため、Lidsで購入する場合は「Planet Express」や「Shipito」などの**米国転送サービス（輸入代行）の利用が必須**となります。少し手間はかかりますが、それを乗り越えてでも手に入れたいレア物が溢れています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.lids.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Lids 公式サイトへ ↗</a>
</div>

---

### 2. Amazingstore（アメイジングストア）：国内最速・最強の並行輸入品
![Amazingstore](${amzImg})

「転送サービスを使うのは英語も不安だし面倒……」という方に**最もおすすめなのが、日本の並行輸入ショップ大手の『Amazingstore』です。**
バイヤーが定期的にLidsや米国の限定ニューエラを大量に買い付け、日本国内の倉庫で販売しています。海外通販ではありませんが、**結果的に「海外限定品を最も速く、関税の計算なしに安全に買える」**ため、多くのニューエラファンが日夜在庫をチェックしています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://amazingstore.jp/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Amazingstore 公式サイトへ ↗</a>
</div>

---

### 3. ASOS（エイソス）：日常使いのファッションライン
![ASOS](${asosImg})

イギリスを代表する巨大ファッションECサイト。MLBのゴリゴリのスポーツモデルというよりは、服装に合わせやすい「カジュアルライン」や「コーデュロイ素材」などのニューエラが豊富です。一定額（通常約1万円前後）を超えると**日本への送料が無料**になるため、服と一緒にまとめ買いするのに非常に適しています。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.asos.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">ASOS 公式サイトへ ↗</a>
</div>

---

### 4. END.（エンド）：ハイブランドとの激レアコラボ
![END.](${endImg})

ストリートヘッズから絶大な支持を集めるイギリスの高級セレクトショップ。
ここでは通常のモデルよりも、「Fear of God Essentials（FOG）」や「Off-White」など、**世界的ハイブランドとニューエラがコラボした限定アイテム**が狙い目です。非常に競争率が高いですが、新作ドロップ時には抽選（Draw）システムを利用してフェアに購入できる機会が与えられます。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.endclothing.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">END. 公式サイトへ ↗</a>
</div>

---

### 5. Urban Outfitters：絶妙なカラーのファッション別注力
![Urban Outfitters](${uoImg})

アメリカの若者に大人気のライフスタイル通販サイト。スポーツ特化の店にはない、**淡いパステルカラーや、アースカラー（ブラウン、グリーン等）の「Urban Outfitters別注ニューエラ」**が頻繁にリリースされます。ファッションアイテムとしてのニューエラを探しているなら、ここをチェックしない手はありません。日本直送も可能です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://www.urbanoutfitters.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">Urban Outfitters 公式サイトへ ↗</a>
</div>

---

### 6. StockX（ストックエックス）：完売品を確実に手に入れる「最終兵器」
![StockX](${sxImg})

「Supremeコラボを逃した」「数年前の限定サイドパッチモデルがどうしても欲しい」。そんな時の最終手段が、スニーカーとストリートウェアの世界最大級リセール（二次流通）プラットフォームであるStockXです。
全ての商品がプロによって**真贋鑑定済み**のため、偽物を掴まされるリスクが限りなくゼロ。プレ値（定価以上）にはなりますが、お金を出せば世界中の未着用レアモデルを確実に日本へ取り寄せることが可能です。

<div style="margin: 2rem 0; text-align: center;">
  <a href="https://stockx.com/" target="_blank" rel="noopener" style="display: inline-block; background: #000; color: #fff; padding: 1.2rem 2.8rem; border-radius: 12px; text-decoration: none; font-weight: 800; font-size: 1.15rem; box-shadow: 0 8px 24px rgba(0,0,0,0.15);">StockX 公式サイトへ ↗</a>
</div>

---

## 3. 実践マニュアル：海外限定ニューエラ購入の「掟」

### 3.1 自分の「マイ・サイズ」を完璧に把握せよ
ニューエラの王道モデル「59FIFTY」は、後ろにアジャスター（サイズ調整ベルト）がついていないため、**1/8インチ（約1cm）刻み**で自分に合ったサイズを見つける必要があります。
日本で7 3/8（58.7cm）がジャストであれば、海外で買っても基本は同じです。「アジャスター無しの帽子」を海外から買う以上、返品・交換は絶望的だと考え、必ず日本の直営店やスポーツショップで一度試着し、自分のサイズを暗記してから挑んでください。

### 3.2 転送サービスの賢い使い方
Lidsなどで本場のキャップを購入する場合、**『Planet Express』**や**『Shipito』**といった転送サービスに登録し、アメリカ国内に「自分専用の受け取り住所（オレゴン州などの免税州がおすすめ）」を発行してもらいます。
帽子単体はとても軽く、転送料金も比較的安く済むため、2〜3個まとめて箱に入れて日本へ転送（同梱発送）してもらうのが、手数料を抑える最もポピュラーなテクニックです。

---

## 結論：国内の争奪戦から抜け出し、自分だけの「Exclusive」を

日本のストリートで、誰かと同じニューエラを被ってしまう気まずさ。それを解決できるのが「海外通販（または国内並行輸入）」という武器です。

英語のハードルや転送サービスが面倒だと感じるなら、まずは国内から買える <strong>Amazingstore</strong> を。本格的に人と被らない究極の別注カラーを探し求めるなら、重い腰を上げて <strong>Lids（＋転送サービス）</strong>の門を叩いてみてください。あなたのキャップコレクションが、劇的に進化するはずです。
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
    console.log('Successfully published NEW ERA OVERSEAS GUIDE: 6 Superior Routes (Placeholders)!');
    process.exit(0);
  }
}
publishArticle();
