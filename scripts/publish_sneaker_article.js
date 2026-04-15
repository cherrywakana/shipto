const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const shops = JSON.parse(fs.readFileSync('/tmp/sneaker_shops.json', 'utf8'));

// 使用するショップと紹介文（DBのdescriptionをベースに拡張）
const lineup = [
    {
        slug: 'stockx',
        heading: 'StockX（ストックエックス）— スニーカー株式市場の最高峰',
        review: `StockXは「スニーカーの株式市場」という独自のコンセプトでスニーカー業界を変革したプラットフォームです。出品される全商品は、StockXの専門鑑定士が厳格な真贋チェックを実施してから発送されるため、偽物が届くリスクはゼロです。\n\n価格は需給バランスで常にリアルタイムに変動するため、「今このモデルがいくらなのか」が一目でわかる透明性も魅力。日本語アプリも整備されており、国内のフリマ感覚で世界中のプレ値スニーカーを購入できます。\n\n<ul><li><b>関税:</b> DDP（関税込み）。チェックアウト後は追加費用なし。</li><li><b>配送:</b> 鑑定後に発送のため到着まで約1〜2週間。</li><li><b>特徴:</b> 日本語対応アプリあり。「今すぐ買う／売る」の即時取引が可能。</li></ul>`,
    },
    {
        slug: 'goat',
        heading: 'GOAT（ゴート）— StockXと双璧をなす鑑定フリマ',
        review: `GOATは「Greatest Of All Time（史上最高）」の略称を掲げるアメリカ発のスニーカー・ストリートウェアプラットフォームです。StockXと並び、鑑定付きマーケットプレイスの双璧として世界中のスニーカーヘッズに利用されています。\n\n最大の特徴は、新品だけでなく<b>中古品（Used）も流通</b>している点。コンディションが写真と詳細情報で明確に示されているため、状態を確認してからバジェットに合わせた選択ができます。SwiftServiceを利用すると配送が大幅に早くなります。\n\n<ul><li><b>関税:</b> DDU（受け取り時に別途発生）。</li><li><b>配送:</b> 鑑定後発送で約1〜2週間。SwiftServiceなら最短数日。</li><li><b>特徴:</b> Used（中古）品も購入可能。コンディション表示が丁寧。</li></ul>`,
    },
    {
        slug: 'end',
        heading: 'END.（エンド）— 英国発、スニーカー抽選の聖地',
        review: `イギリス・ニューカッスル発のEND.は、スニーカーとハイエンドファッションを融合させた世界最高峰のセレクトショップです。Nike、Adidas、New Balanceなどの超人気コラボモデルの抽選（END. Launches）は世界中のファンが参加するビッグイベントになっています。\n\nセレクションの品質も圧倒的。Off-White、Stone Island、Ami Parisなどのストリートラグジュアリーブランドも充実しており、スニーカーとコーデをまとめて揃えられます。梱包が非常に丁寧で、ユニークなブランドBOXに入って届くのも特徴の一つです。\n\n<ul><li><b>関税:</b> DDU（受け取り時に別途発生）。</li><li><b>配送:</b> FedEx等で通常5〜10日。</li><li><b>特徴:</b> 限定抽選モデルが豊富。ラグジュアリーアパレルとの組み合わせ買いにも最適。</li></ul>`,
    },
    {
        slug: 'sneakersnstuff',
        heading: 'Sneakersnstuff（SNS）— 北欧発、コラボの名匠',
        review: `スウェーデン・ストックホルム発のSNS（Sneakersnstuff）は、1999年の創業以来、スニーカー業界に絶大な影響を与え続けているショップです。Nike、Adidas、New Balanceなどのブランドと独自コラボを頻発させており、「SNS別注モデル」は世界中のコレクターが注目します。\n\n東京・代官山にも実店舗を展開するなど、日本のカルチャーとの親和性も高く、日本向けサービスも安定しています。\n\n<ul><li><b>関税:</b> DDU（受け取り時に別途発生）。</li><li><b>配送:</b> スウェーデン本国から発送で通常7〜14日。</li><li><b>特徴:</b> 独自コラボモデルが非常に多い。スニーカー専門誌的な読み物コンテンツも充実。</li></ul>`,
    },
    {
        slug: 'kith',
        heading: 'Kith（キス）— NYストリートを代表するハイブリッドショップ',
        review: `Kith（キス）はニューヨーク発、ストリートカルチャーの最前線を走るセレクトショップ兼ブランドです。コカ・コーラやMarvel、BMW、さらにはフォーエバー21まで異業種とのコラボが絶えず、常に話題を集め続けています。\n\nスニーカーだけでなく、Kith自身がアパレルブランドとしても高い評価を受けており、トータルコーディネートをKITHだけで完結できる点も人気の理由です。\n\n<ul><li><b>関税:</b> Borderfree経由でDDP対応可能。</li><li><b>配送:</b> ニューヨークから発送。通常7〜14日。</li><li><b>特徴:</b> コラボアイテムは即完売必至。会員登録で先行情報を入手可能。</li></ul>`,
    },
    {
        slug: 'slamjam',
        heading: 'SLAM JAM（スラムジャム）— イタリア発、アンダーグラウンドの重鎮',
        review: `1989年創業のSLAM JAM（スラムジャム）は、イタリア発のストリート・アバンギャルドカルチャーを体現するショップです。単なるショップを超えた「文化的なプラットフォーム」として、独自のセレクションと情報発信でシーンを牽引しています。\n\n他のショップでは取り扱わないようなニッチなブランドや、独自のヴィジョンで選ばれたコラボが特徴。本当の通は必ずチェックするショップです。\n\n<ul><li><b>関税:</b> DDU（受け取り時に別途発生）。250ユーロ以上で送料無料。</li><li><b>配送:</b> イタリアから発送。</li><li><b>特徴:</b> 他にはないアンダーグラウンドなセレクション。スニーカーとアパレルを独自の視点で編集。</li></ul>`,
    },
    {
        slug: 'bodega',
        heading: 'Bodega（ボデガ）— ボストンの隠れ家店舗、コラボの雄',
        review: `「Bodega（ボデガ）」とは、アメリカのコンビニ・雑貨店のことを意味し、その名の通り一見するとコンビニにしか見えないショップの奥に、厳選されたスニーカーとアパレルが並ぶ隠れ家コンセプトで世界的な注目を集めました。\n\nNew BalanceやNikeとのコラボが特に多く、「Bodega別注モデル」は毎回大きな話題になります。Engineered GarmentsやNeighborhoodなど、通好みのブランドのセレクションも一見の価値あり。\n\n<ul><li><b>関税:</b> DDU（関税は受け取り時。16,666円以下の商品は免税の可能性あり）。</li><li><b>配送:</b> UPS/USPSでボストン・LA発。</li><li><b>特徴:</b> New Balance・Nike別注コラボが非常に多い。</li></ul>`,
    },
    {
        slug: 'svd',
        heading: 'SVD / sivasdescalzo（シバスデスカルソ）— スペイン発、ラッフルの名門',
        review: `バルセロナ発のSVD（sivasdescalzo）は、ヨーロッパのスニーカーシーンで絶大な影響力を誇るセレクトショップです。限定スニーカーの抽選（Raffle）はヨーロッパのヘッズの間で特に参加率が高く、日本からの応募もできます。\n\nアパレルのセレクションも秀逸で、Carhartt WIPやBelenchagaのようなブランドも取り扱っています。\n\n<ul><li><b>関税:</b> DDU（日本到着時に別途発生）。</li><li><b>配送:</b> スペインから発送。</li><li><b>特徴:</b> ヨーロッパ限定のラッフル参加が可能。ヨーロッパ独自の限定モデルが狙える。</li></ul>`,
    },
    {
        slug: 'bstn',
        heading: 'BSTN（ビースティン）— ドイツ・ミュンヘン発のプレミアムセレクト',
        review: `ドイツ・ミュンヘンのBSTN（Beast）は、スニーカーとスポーツウェアを中心としたプレミアムセレクトショップです。AdidasやNikeのコラボモデルへのアクセスが強く、ドイツ・ミュンヘンという地域性を活かしたEURO限定モデルが狙えます。\n\n<ul><li><b>関税:</b> DDU（日本到着時に別途発生）。</li><li><b>配送:</b> ドイツから発送。</li><li><b>特徴:</b> ヨーロッパ限定のスニーカーやアパレルが狙える。</li></ul>`,
    },
    {
        slug: 'klekt',
        heading: 'Klekt（クレクト）— ヨーロッパ最大の鑑定付きマーケットプレイス',
        review: `ヨーロッパ最大の鑑定付きスニーカーマーケットプレイス「Klekt（クレクト）」。StockX・GOATのヨーロッパ版とも言える存在で、ヨーロッパのセラーからの出品が多いためUSD安の時代にはお得になりやすい傾向があります。\n\n全商品が専門家による真贋鑑定を通過してから発送されるため、安全性も◎。ユーロ建て決済で為替を活用した賢い購入が可能です。\n\n<ul><li><b>関税:</b> DDU。</li><li><b>配送:</b> ヨーロッパから追跡付きで発送。</li><li><b>特徴:</b> ヨーロッパ発送でStockXより安くなるケースも。ユーロ建て決済可能。</li></ul>`,
    },
    {
        slug: 'kicks-crew',
        heading: 'KICKS CREW（キックスクルー）— アジア発、隙間のないスニーカー網羅',
        review: `香港発のKICKS CREWは、世界中の正規販売店と提携し、他では手に入らないニッチなモデルやサイズまでを網羅するスニーカープラットフォームです。B2Bネットワークを活用しているため、「StockXやGOATにはないサイズ」が見つかることも。\n\n<ul><li><b>関税:</b> DDP（関税込み）対応可能な場合あり。</li><li><b>配送:</b> DHLやFedExで追跡付き発送。</li><li><b>特徴:</b> 珍しいサイズ展開に強い。アジアのショッパーに向けた使いやすいUI。</li></ul>`,
    },
];

async function buildAndPublish() {
    let content = `<p>「海外限定カラーが欲しい」「プレ値の人気モデルを本物保証で手に入れたい」「日本未発売のコラボスニーカーを誰よりも早く入手したい」——そんなスニーカーヘッズのために、世界中で使われているショップを厳選して12選紹介します。</p>

<p>スニーカーの海外通販は、かつてに比べて格段に敷居が下がっています。日本語対応・関税込み決済・鑑定保証が当たり前になった今、海外ショップを活用しない理由はありません。</p>

<div style="background:#f8f8f8; border-left: 4px solid #111; padding: 1rem 1.5rem; margin: 2rem 0; border-radius: 4px;">
  <p style="margin:0; font-weight: bold;">📌 この記事のポイント</p>
  <ul style="margin: 0.5rem 0 0 0;">
    <li>鑑定付きフリマ系（StockX・GOAT・Klekt）：プレ値品でも本物保証</li>
    <li>セレクトショップ系（END.・SNS・Kith・SLAM JAM）：限定コラボが狙える</li>
    <li>関税「込み（DDP）」か「後払い（DDU）」かを必ず確認</li>
  </ul>
</div>

<h2>【比較表】スニーカー海外通販ショップ一覧</h2>
<div style="overflow-x: auto;">
<table>
  <thead>
    <tr>
      <th>ショップ名</th>
      <th>タイプ</th>
      <th>本拠地</th>
      <th>関税</th>
      <th>こんな人におすすめ</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>StockX</td><td>鑑定フリマ</td><td>🇺🇸 アメリカ</td><td>DDP（込み）</td><td>プレ値品を安心して買いたい</td></tr>
    <tr><td>GOAT</td><td>鑑定フリマ</td><td>🇺🇸 アメリカ</td><td>DDU（後払い）</td><td>中古品も視野に探したい</td></tr>
    <tr><td>END.</td><td>セレクト</td><td>🇬🇧 イギリス</td><td>DDU（後払い）</td><td>コラボ抽選・ラグジュアリーも欲しい</td></tr>
    <tr><td>SNS</td><td>セレクト</td><td>🇸🇪 スウェーデン</td><td>DDU（後払い）</td><td>SNS別注コラボを狙いたい</td></tr>
    <tr><td>Kith</td><td>セレクト</td><td>🇺🇸 アメリカ</td><td>DDP（込み）</td><td>NYストリートのブランドが欲しい</td></tr>
    <tr><td>SLAM JAM</td><td>セレクト</td><td>🇮🇹 イタリア</td><td>DDU（後払い）</td><td>通好みのラインナップを求める</td></tr>
    <tr><td>Bodega</td><td>セレクト</td><td>🇺🇸 アメリカ</td><td>DDU（後払い）</td><td>NB・Nike別注コラボが欲しい</td></tr>
    <tr><td>SVD</td><td>セレクト</td><td>🇪🇸 スペイン</td><td>DDU（後払い）</td><td>EUR限定ラッフルに参加したい</td></tr>
    <tr><td>BSTN</td><td>セレクト</td><td>🇩🇪 ドイツ</td><td>DDU（後払い）</td><td>ドイツ限定モデルを探している</td></tr>
    <tr><td>Klekt</td><td>鑑定フリマ</td><td>🇪🇺 ヨーロッパ</td><td>DDU（後払い）</td><td>ユーロ安でStockXより安く買いたい</td></tr>
    <tr><td>KICKS CREW</td><td>プラットフォーム</td><td>🇭🇰 香港</td><td>DDP（込み）</td><td>レアサイズを幅広く探したい</td></tr>
  </tbody>
</table>
</div>
`;

    for (let i = 0; i < lineup.length; i++) {
        const item = lineup[i];
        const shop = shops[item.slug];
        if (!shop) {
            console.warn('Shop not found:', item.slug);
            continue;
        }
        content += `
<h3>${i + 1}. ${item.heading}</h3>
<div style="margin: 16px 0; overflow: hidden; border-radius: 12px; border: 1px solid #e5e5e5;">
  <a href="${shop.url}" target="_blank" rel="noopener noreferrer">
    <img src="${shop.image_url}" alt="${shop.name}のスクリーンショット" style="width: 100%; height: auto; display: block;">
  </a>
</div>
<p>${item.review.replace(/\n/g, '</p><p>')}</p>
<div style="text-align: center; margin: 24px 0;">
  <a href="${shop.url}" target="_blank" rel="noopener noreferrer" style="background: #111; color: #fff; padding: 14px 40px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 0.95rem;">${shop.name} 公式サイトはこちら →</a>
</div>`;
    }

    content += `
<hr>
<h2>海外スニーカー通販で失敗しないための必須知識</h2>

<h3>関税（DDP vs DDU）を必ず確認する</h3>
<p>海外通販の最大の落とし穴が関税です。</p>
<ul>
  <li><b>DDP（関税込み）</b>: StockXやKith、KICKS CREWなど。チェックアウト時に支払う金額が全てで、届いてから追加費用は一切発生しません。<b>初心者に最もおすすめ</b>の支払い方式。</li>
  <li><b>DDU（関税後払い）</b>: END.やGOAT、SNSなど多くのショップ。商品が届く際に運送会社（DHLや佐川など）から別途「関税・消費税・通関手数料」の請求書が届きます。3万円を超えるスニーカーの場合、数千円〜1万円以上かかる場合があります。</li>
</ul>
<p>なお、1足あたりの課税価格が<b>16,666円以下（個人使用目的）</b>の場合は関税が免除されることが多いです。</p>

<h3>サイズはUS・UK・EUどれで表記されているかを確認する</h3>
<p>スニーカーのサイズ表記は、ショップによってUS表記・UK表記・EU表記・cm表記がバラバラです。間違えると返品が非常に手間なので、<b>必ず各ショップの「Size Guide」で自分のサイズを確認</b>してから購入しましょう。一般的にUS・EU・UKは以下の関係です。</p>
<table>
  <thead><tr><th>cm</th><th>US（メンズ）</th><th>UK</th><th>EU</th></tr></thead>
  <tbody>
    <tr><td>26</td><td>8</td><td>7</td><td>40.5</td></tr>
    <tr><td>27</td><td>9</td><td>8</td><td>42</td></tr>
    <tr><td>28</td><td>10</td><td>9</td><td>44</td></tr>
    <tr><td>29</td><td>11</td><td>10</td><td>45.5</td></tr>
  </tbody>
</table>

<h3>鑑定フリマ vs セレクトショップ、どちらを選ぶ？</h3>
<p><b>プレ値・完売モデルを入手したい場合</b>は、StockX・GOAT・Klektのような鑑定付きマーケットプレイスが最適です。</p>
<p><b>新作・最新コラボを正規価格で入手したい場合</b>は、END.・SNS・Kith・Bodegaのようなセレクトショップをまずチェックしましょう。特に抽選（Raffle・Launches）に登録しておくと、プレ値が付く前に正規価格で手に入れられます。</p>

<h2>まとめ</h2>
<p>海外スニーカー通販は正しい知識があれば、安全に・お得に・欲しいモデルを手に入れられる最強の手段です。</p>
<p>まずは<b>関税込みで安心なStockX</b>か、<b>日本語対応が進んでいるKITH</b>から始めてみましょう。慣れてきたら、コラボが充実する<b>END.</b>や<b>SNS</b>のラッフルにも挑戦してみてください。</p>
<p>あなたの次の一足が、ここから見つかりますように！</p>`;

    // Publish
    const { error } = await supabase.from('posts').insert({
        slug: 'fashionshop/sneakers/list',
        title: '海外スニーカーヘッズが利用する海外通販サイト おすすめ12選',
        content,
        category: 'ガイド',
        created_at: new Date().toISOString()
    });

    if (error) {
        console.error('❌ Error:', error.message);
    } else {
        console.log('✅ Published: /fashionshop/sneakers/list');
    }
}

buildAndPublish();
