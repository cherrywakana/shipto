const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const shops = [
    {
        name: 'ASOS（エイソス）',
        slug: 'asos',
        url: 'https://www.asos.com/',
        country: 'イギリス',
        category: 'セレクト・トレンド',
        shipping: '一定金額以上（約数千円〜1万円程度）で標準送料無料。配送日数は通常10〜14日程度。',
        selection: 'Nikeからプライベートブランド「ASOS DESIGN」まで800以上のブランドと数万点のアイテム。日本でも人気のランウェイトレンドを廉価で提供。',
        points: ['PETITEからTALL、CURVEまであらゆる体型に合わせた豊富なサイズ展開から選べる', '他では買えないASOS限定のアイテムや独占コラボモデルが手に入る', '学生割引や期間限定のセールなどお得なプロモーションを利用できる'],
        summary: 'イギリス発の巨大なトレンドファッションプラットフォームであり、手頃な価格で個性的なファッションを楽しみたい方におすすめです。'
    },
    {
        name: 'Musinsa（ムシンサ）',
        slug: 'musinsa',
        url: 'https://global.musinsa.com/',
        country: '韓国',
        category: 'アジア・トレンド',
        shipping: '一定額以上の購入で送料無料。韓国からの国際発送のため、到着まで通常3〜7日程度と非常にスピーディーです。',
        selection: 'Mardi Mercrediなど、世界的に話題の韓国ストリート・コンテンポラリーブランドを多数網羅しています。',
        points: ['流行の最先端をいく韓国の人気ブランドアイテムがいち早く揃う', '関税の事前支払いシステムにより受け取り時の追加費用なしで購入できる', '日本語対応のグローバルサイトで安心して買い物ができる'],
        summary: '韓国国内シェアNo.1のプラットフォームであり、最新のK-ファッションを本場から安全・快適に取り寄せたい方に最適です。'
    },
    {
        name: 'Mango（マンゴ）',
        slug: 'mango',
        url: 'https://shop.mango.com/',
        country: 'スペイン',
        category: 'セレクト・トレンド',
        shipping: '日本への直送に対応し、約1,500円前後の固定送料。通常1週間〜10日程度での到着となります。',
        selection: '都会的でモダンなヨーロッパデザイン。国内完売サイズや限定コレクションも見つかりやすいのが特徴です。',
        points: ['洗練されたヨーロッパの最新トレンドアイテムを取り入れられる', '日本未入荷のプレミアム素材コレクションなどが購入できる', 'セール時期に国内価格よりも大幅な割引を受けられる'],
        summary: 'ZARAと並んで人気の高いスペイン発のブランド。洗練された都会派アイテムをお得に楽しみたい方におすすめです。'
    },
    {
        name: 'REI（アールイーアイ）',
        slug: 'rei',
        url: 'https://www.rei.com/',
        country: 'アメリカ',
        category: 'アウトドア',
        shipping: 'UPSなどで追跡可能。送料は重量等で変動しますが、通常1〜2週間程度で安全に到着します。関税は別途です。',
        selection: '高品質な自社開発ブランド「REI Co-op」や本格的ギアを幅広く展開し、プロから初心者まで満足の品揃えです。',
        points: ['圧倒的なコストパフォーマンスを誇る自社ブランドが手に入る', '米国ならではの多様なサイズや在庫からお気に入りのギアを選べる', 'コープ（協同組合）の生涯会員になることで年度末のポイント還元などの恩恵を受けられる'],
        summary: 'アメリカ最大級のアウトドア協同組合。高品質でコスパの良いギアを探しているキャンパーや登山家におすすめです。'
    },
    {
        name: 'Backcountry（バックカントリー）',
        slug: 'backcountry',
        url: 'https://www.backcountry.com/',
        country: 'アメリカ',
        category: 'アウトドア',
        shipping: 'FedExなどの国際スピード便により、数日〜1週間程度でスピーディーに到着。関税は別途かかる場合があります。',
        selection: 'トップブランドからニッチブランドまで、エクストリームスポーツ向けの専門ギアが全米トップレベルです。',
        points: ['他では見つからないような専門的で本格的なスポーツギアが揃う', 'プロ仕様のアイテムを大規模なシーズンオフセールでお得に買える', '専門スタッフによる的確なアドバイスを受けながら商品を選べる'],
        summary: 'スノーボードやクライミングなど、ハードな環境で活動する本格派の趣味人やアスリートに強くおすすめしたい専門店です。'
    },
    {
        name: 'L.L.Bean（エルエルビーン）',
        slug: 'llbean',
        url: 'https://www.llbean.com/',
        country: 'アメリカ',
        category: 'アウトドア',
        shipping: '重量・サイズにより送料が計算され決まります。通常、注文後1〜2週間程度で安全に到着。',
        selection: '定番のトートやビーン・ブーツから本国限定のウェアまでクラシックなアイテムを展開しています。',
        points: ['日本未展開カラーや限定モデル、幅広いUSサイズを購入できる', 'アイテムへのモノグラム（名入れ刺繍）カスタマイズを利用できる', '100年以上の歴史に裏打ちされた一生モノの品質が手に入る'],
        summary: 'アメリカの歴史ある定番のアウトドア・ライフスタイルブランド。長く愛用できる本物のクラシックアイテムを求める方に最適です。'
    },
    {
        name: 'COS（コス）',
        slug: 'cos',
        url: 'https://www.cos.com/',
        country: 'スウェーデン',
        category: 'セレクト・トレンド',
        shipping: '国際配送対応。一定額以上で送料無料になる場合があり、日数は通常1〜2週間。関税や消費税が含まれる場合と別途の場合があります。',
        selection: 'タイムレスで上質なデザイン。ヨーロッパ基準の在庫量で日本の完売サイズも豊富です。',
        points: ['流行に左右されないミニマルで洗練された洋服が揃う', '国内店舗では完売した人気商品や未展開カラーも購入できる', '環境に配慮された高品質な素材のアイテムを手に入れられる'],
        summary: 'H&Mグループのプレミアムライン。上質な素材と構築的なシルエットの大人の男女向けアイテムをお探しの方におすすめです。'
    },
    {
        name: '& Other Stories（アンドアザーストーリーズ）',
        slug: 'and-other-stories',
        url: 'https://www.stories.com/',
        country: 'スウェーデン',
        category: 'セレクト・トレンド',
        shipping: '日本への直送に対応し、固定送料（約2,000円）とお手頃。通常1〜2週間での到着です。',
        selection: 'パリ、ストックホルム、LAの3都市のアトリエでデザインされた洋服やコスメを展開しています。',
        points: ['日本未上陸の感度の高いフェミニン＆エフォートレスな洋服が揃う', '海外ならではの洗練された美しいデザインのコスメアイテムも一緒に買える', 'アトリエごとに異なるテイストのファッションから自分好みを見つけられる'],
        summary: '日本に実店舗がないH&Mグループの人気ブランド。都会的でフェミニンなワードローブやギフト向けのコスメを探している人にぴったりです。'
    },
    {
        name: 'Free People（フリーピープル）',
        slug: 'free-people',
        url: 'https://www.freepeople.com/',
        country: 'アメリカ',
        category: 'セレクト・トレンド',
        shipping: '通常、一定額（例：約15,000円）以上の注文で日本への標準配送が無料に。関税事払いにも対応。',
        selection: 'ボヘミアン・シックな服飾デザインに加え、ヨガウェアなどのアクティブウェアも人気です。',
        points: ['他ブランドにはない繊細なレースや柄を使ったボヘミアンスタイルが手に入る', 'おしゃれと機能性を両立したアクティブウェアラインを活用できる', '関税等の事前支払いシステムで商品受け取り時のトラブルを防げる'],
        summary: '自由で創造的なデザインが魅力のブランド。個性的でフェミニンなファッションや、ジムでも映えるウェアを求める女性におすすめです。'
    },
    {
        name: 'Nordstrom（ノードストローム）',
        slug: 'nordstrom',
        url: 'https://www.nordstrom.com/',
        country: 'アメリカ',
        category: 'ラグジュアリー・百貨店',
        shipping: 'チェックアウト時に日本円で確定した送料と関税が表示され安心。配送目安は1〜2週間。',
        selection: '多数のハイブランドから「Nordstrom Made」のような自社ブランドまで取扱いの幅広さは屈指です。',
        points: ['世界中の最新ハイブランド品から米国ならではのコンテンポラリーブランドまで揃う', '日本円での決済や関税先払いシステムを利用して安心して購入できる', '丁寧な梱包と高いホスピタリティで高級品も安全に取り寄せられる'],
        summary: 'アメリカ最大級の高級百貨店。卓越したカスタマーサービスと品揃えで、海外のデパートから日本へ直接取り寄せたい方に最適です。'
    },
    {
        name: 'Saks Fifth Avenue（サックス・フィフス・アベニュー）',
        slug: 'saks-fifth-avenue',
        url: 'https://www.saksfifthavenue.com/',
        country: 'アメリカ',
        category: 'ラグジュアリー・百貨店',
        shipping: 'プロモーション期間なら海外標準送料が無料になることも。約1〜2週間で到着し、関税も計算されます。',
        selection: '最高峰のデザイナーズブランドの究極のセレクションや高級コスメを取り扱います。',
        points: ['世界水準の非常にハイエンドな限定ブランド・オリジナルモデルを購入できる', 'セール時期にはラグジュアリーアイテムを国内よりも圧倒的にお得に買える', '完全な関税計算・事前支払いシステムで受け取りの際の手間を省略できる'],
        summary: 'ニューヨーク五番街の輝きを体現する老舗百貨店。世界最高峰のハイファッションを求める本物志向のファッショニスタにおすすめです。'
    },
    {
        name: 'Vestiaire Collective（ヴィスティエール・コレクティブ）',
        slug: 'vestiaire-collective',
        url: 'https://www.vestiairecollective.com/',
        country: 'フランス',
        category: 'アウトレット・リセール',
        shipping: '出品元国により変動し、専門家による鑑定センターを経由するため配送に約2週間要します。',
        selection: '世界中の出品者による貴重なアーカイブ品やヴィンテージのハイブランドが集結しています。',
        points: ['熟練の専門チームによる物理鑑定システムがあるため偽物を避けて安心して購入できる', '日本では生産終了となった過去のコレクションやヴィンテージ名品が見つかる', '完全日本語対応のアプリで日本のフリマのような気軽な感覚で取引ができる'],
        summary: 'ハイブランドのためのグローバルなリセール・プラットフォーム。安心の鑑定付きで、サステナブルに希少な名品を探したい方にうってつけです。'
    },
    {
        name: 'FARFETCH（ファーフェッチ）',
        slug: 'farfetch',
        url: 'https://www.farfetch.com/jp/',
        country: 'イギリス',
        category: 'ラグジュアリー・百貨店',
        shipping: '日本への特急配送に対応し、約3〜7日で到着。一定額以上で送料が定額になり、関税込み表示です。',
        selection: '世界中の名門ブティックと提携し、何千ものラグジュアリーブランドを網羅しています。',
        points: ['世界中のセレクトショップの在庫から希少なラグジュアリーアイテムを探せる', '表示価格が関税込みになっているため、追加の支払いの心配なく買い物を楽しめる', '完全日本語対応のサイトとカスタマーサポートを利用できる'],
        summary: '世界最大規模のラグジュアリー・マーケットプレイス。日本語で安心して本物のハイブランドを購入したいすべての方におすすめです。'
    }
];

const generateHtml = (shop) => `<h2>${shop.name}とは？</h2>
<p>${shop.name}は、${shop.country}で設立された世界有数のオンラインファッションストアです。当サイトは「${shop.category}」を取り扱っており、${shop.name} 海外通販を通して日本からも手軽に本製品を購入可能です。数々の魅力を備え、今もなお世界中で愛され続けています。</p>

<h2>${shop.name}の特徴</h2>
<h3>明朗な配送と関税システム</h3>
<p>${shop.name} 日本発送は非常にスムーズなシステムが組まれています。${shop.shipping}</p>

<h3>圧倒的なブランドラインナップと品揃え</h3>
<p>${shop.selection}</p>

<h2>${shop.name}のおすすめポイント</h2>
<ul>
${shop.points.map(p => `  <li><strong>${p}</strong></li>`).join('\n')}
</ul>

<h2>まとめ</h2>
<p>${shop.summary}</p>

<div class="article-cta">
  <a href="${shop.url}" target="_blank" rel="noopener noreferrer" class="article-cta-btn">${shop.name}公式サイトを見てみる →</a>
</div>`;

async function run() {
    for (const shop of shops) {
        const htmlContent = generateHtml(shop);
        const newTitle = `${shop.name}とは？日本発送や関税・送料を徹底解説`;
        const newSlug = `${shop.slug}-guide`;

        const { data: existingPost } = await supabase.from('posts').select('id').eq('slug', newSlug);

        if (existingPost && existingPost.length > 0) {
            const { error } = await supabase.from('posts').update({
                title: newTitle,
                content: htmlContent
            }).eq('slug', newSlug);

            if (error) {
                console.log('❌ Error updating ' + newSlug + ': ' + error.message);
            } else {
                console.log('✅ Success updated: ' + newSlug);
            }
        } else {
            const { error } = await supabase.from('posts').insert({
                title: newTitle,
                slug: newSlug,
                content: htmlContent,
                thumbnail_url: `https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/${shop.slug}.webp`,
                category: 'ショップ紹介'
            });
            if (error) {
                console.log('❌ Error inserting ' + newSlug + ': ' + error.message);
            } else {
                console.log('✅ Success inserted: ' + newSlug);
            }
        }
    }
}

run();
