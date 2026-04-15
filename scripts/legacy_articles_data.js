const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// ==== 対象記事の定義 ====
// CSVから意味のあるURLを抽出し、記事テーマとDBショップスラッグをマッピング
const ARTICLES = [
    {
        slug: 'outdoorshop/list/bestshops',
        title: '【2026年最新】海外アウトドア通販サイトおすすめ10選｜直送・安い・本物ショップを厳選',
        intro: '「日本未発売のアウトドアギアを手に入れたい」「国内より安く買えるショップを探している」——そんなアウトドア好きに向けて、世界中で信頼される海外アウトドアショップを厳選しました。',
        shops: [
            { slug: 'trekkinn', note: 'スペイン発のTradeinnグループが運営する最大級のアウトドア通販。圧倒的な価格の安さと日本への直送対応が魅力です。登山、キャンプ、トレランまで幅広く揃います。' },
            { slug: 'backcountry', note: 'アメリカ最大のオンラインアウトドアショップ。豊富なブランドラインナップと、自社ブランド「Stoic」のコストパフォーマンスの高さが評判です。' },
            { slug: 'hyperlite-mountain-gear', note: 'アメリカ・ULハイキング界のトップブランドが直営。DCF（キューベン）素材を使った超軽量バックパックは日本で入手困難。公式から直接購入が確実です。' },
            { slug: 'ultralight-outdoor-gear', note: '軽量ギアに特化した英国のショップ。ULハイカーが聖地と称するほど、厳選されたギアが揃います。' },
            { slug: 'rei', note: 'アメリカの巨大アウトドア共済。信頼のREIセレクションと、アウトレットセールでの掘り出し物が狙い目です。' },
        ]
    },
    {
        slug: 'outdoorbrand/msr/budgetshop-msr',
        title: 'MSR製品を安く買える海外ショップおすすめ｜バーナー・テントの海外通販ガイド',
        intro: 'MSR（マウンテンセーフティリサーチ）は、アウトドア界を代表するバーナーやテントのブランドです。日本での定価は高めですが、海外通販を活用することで大幅に安く購入できます。',
        shops: [
            { slug: 'backcountry', note: 'MSRの豊富な在庫とアウトレットセールが充実。特にシーズンオフはバーナーやテントが大幅値引きされます。' },
            { slug: 'trekkinn', note: 'MSRの最安値を探すならまずここをチェック。日本への送料も安く、コスト面で非常に優秀です。' },
            { slug: 'rei', note: 'MSR正規取扱店。信頼性が高く、保証対応も万全です。REIメンバーはさらに割引が受けられます。' },
        ]
    },
    {
        slug: 'outdoorbrand/lasportiva/shopreview-6',
        title: 'La Sportiva（ラ・スポルティバ）が安く買える海外ショップ6選',
        intro: 'イタリアのクライミング・マウンテニアリングシューズブランド「La Sportiva（ラ・スポルティバ）」。国内定価より30〜40%安く買える海外ショップを厳選しました。',
        shops: [
            { slug: 'trekkinn', note: 'La Sportivaの品揃えが圧倒的に豊富。クライミングシューズからトレランシューズまで、最安値クラスで揃います。' },
            { slug: 'backcountry', note: 'セール時期に狙い目。人気モデルが20〜40%オフになることも。' },
            { slug: 'ultralight-outdoor-gear', note: 'UL向けのトレランシューズの品揃えが良好。定期的なセールも見逃せません。' },
        ]
    },
    {
        slug: 'outdoorbrand/mountainequipment/bestshop-4',
        title: 'Mountain Equipment（マウンテンイクイップメント）が安い海外ショップ4選',
        intro: '英国発の老舗山岳ブランド「Mountain Equipment」。日本では取扱店が限られますが、海外通販では旬のウェアやシュラフがお得に手に入ります。',
        shops: [
            { slug: 'trekkinn', note: 'Mountain Equipmentのフルライン取扱いあり。定番のダウンジャケットやシュラフが充実。' },
            { slug: 'ultralight-outdoor-gear', note: '英国ブランドのため在庫も豊富。本国価格で手に入るのが最大の魅力です。' },
            { slug: 'backcountry', note: 'アメリカ向けのセール品が狙い目。シーズンエンドに大幅値引きされることがあります。' },
        ]
    },
    {
        slug: 'outdoorbrand/hilleberg/hb-shoplists',
        title: 'Hilleberg（ヒルバーグ）のテントを安く買う海外ショップ一覧',
        intro: 'スウェーデン発の最高峰テントブランド「Hilleberg（ヒルバーグ）」。高品質ゆえに定価は高いですが、海外ショップでは国内より安く手に入ることがあります。',
        shops: [
            { slug: 'varuste', note: 'フィンランドのアウトドアショップ。北欧ブランドとの親和性が高く、Hillebergの在庫が豊富です。' },
            { slug: 'trekkinn', note: 'Hillebergの人気モデルを幅広く取り揃え。価格比較の第一候補として最適。' },
            { slug: 'backcountry', note: 'アメリカ向けラインナップ。Hillebergの信頼のサービスが受けられます。' },
        ]
    },
    {
        slug: 'outdoorbrand/rab/bestshop',
        title: 'RAB（ラブ）のジャケット・シュラフが安い海外ショップおすすめ',
        intro: '英国発の山岳ブランド「RAB（ラブ）」は、高品質なダウンジャケットやシュラフが世界中の登山家に支持されています。海外ショップを使えばお得に購入可能です。',
        shops: [
            { slug: 'trekkinn', note: 'RABの最安値ショップとして定評あり。人気のMicrolight系ジャケットも豊富に揃います。' },
            { slug: 'ultralight-outdoor-gear', note: '英国ブランドのため長年の取扱実績があり、品揃えが完璧です。' },
            { slug: 'backcountry', note: 'RABのアメリカ向けラインナップ。セール情報をメルマガで受け取るのがおすすめ。' },
        ]
    },
    {
        slug: 'outdoorbrand/mountainhardwear/mh-shoplists',
        title: 'Mountain Hardwear（マウンテンハードウェア）が安い海外通販ショップ一覧',
        intro: 'アメリカ発の高機能アウトドアブランド「Mountain Hardwear」。日本での定価より大幅に安く購入できる海外ショップを紹介します。',
        shops: [
            { slug: 'backcountry', note: 'Mountain Hardwearの正規ディーラー。アウトレットセールのタイミングが非常にお得。' },
            { slug: 'trekkinn', note: '定番のゴアテックスジャケットも豊富。最安値チェックに最適です。' },
            { slug: 'rei', note: 'REI限定色も取り扱いあり。メンバーセール期間が特に狙い目。' },
        ]
    },
    {
        slug: 'outdoorbrand/haglofs/bestshop-8',
        title: 'Haglöfs（ホグロフス）が安く買える海外ショップ8選',
        intro: 'スウェーデン発の北欧アウトドアブランド「Haglöfs（ホグロフス）」。スタイリッシュなデザインと機能性が人気で、海外通販では本国や欧州価格で手に入ります。',
        shops: [
            { slug: 'trekkinn', note: 'Haglöfsの幅広いラインナップを最安値クラスで提供。セール時には特に好条件です。' },
            { slug: 'backcountry', note: '人気のDONNERジャケットなど取扱い豊富。アウトレットセールが狙い目。' },
            { slug: 'ultralight-outdoor-gear', note: 'UL志向のHaglöfs製品を中心に取り扱い。英国からの発送で関税も比較的安定しています。' },
        ]
    },
    {
        slug: 'outdoorbrand/osprey/bestshop-2',
        title: 'Osprey（オスプレー）が安い海外ショップおすすめ2選',
        intro: '世界一有名なバックパックブランド「Osprey（オスプレー）」。海外ショップなら国内定価より大幅に安く入手できます。',
        shops: [
            { slug: 'backcountry', note: 'Ospreyの正規ディーラー。KestelやAtmosなど定番モデルが充実。バックパックシーズン前のセールが最もお得。' },
            { slug: 'trekkinn', note: 'Ospreyの全ラインナップを扱い、最安値クラスの価格が魅力。送料も安く総合コストで優秀です。' },
        ]
    },
    {
        slug: 'outdoorbrand/millet/bestshop-3',
        title: 'Millet（ミレー）が安い海外ショップおすすめ3選',
        intro: 'フランス発の老舗山岳ブランド「Millet（ミレー）」。バックパックからウェアまで、本国価格で手に入る海外ショップを紹介します。',
        shops: [
            { slug: 'trekkinn', note: 'Milletの価格が最も安いショップの一つ。定番のCUMBURIバックパックも在庫豊富。' },
            { slug: 'backcountry', note: 'Milletのウェアラインが充実。シーズンオフには大幅値引きあり。' },
            { slug: 'ultralight-outdoor-gear', note: 'フランスブランドを安定して取り扱い。UL向けのテクニカルモデルを中心に品揃えが良好。' },
        ]
    },
    {
        slug: 'outdoorbrand/thermarest/bestshop-5',
        title: 'Therm-a-Rest（サーマレスト）が安い海外ショップ5選',
        intro: 'アメリカ発のスリーピングパッドブランド「Therm-a-Rest（サーマレスト）」。海外ショップを利用すれば、国内定価より大幅にお得に購入できます。',
        shops: [
            { slug: 'backcountry', note: 'Therm-a-Restの正規ディーラー。NeoAirやZLiteなど全ラインを扱います。年末セールが特に狙い目。' },
            { slug: 'trekkinn', note: '最安値クラスでTherm-a-Restを提供。日本への送料も安く、総合コストで非常に優秀。' },
            { slug: 'rei', note: 'REI限定カラーも展開あり。REIメンバーはさらに割引価格で購入可能です。' },
        ]
    },
    {
        slug: 'outdoorbrand/hyperlite-mountain-gear/manual',
        title: 'Hyperlite Mountain Gearの個人輸入方法｜日本への送り方・関税を徹底解説',
        intro: 'Hyperlite Mountain Gear（ハイパーライト・マウンテン・ギア）は日本での正規販売が限られており、公式サイトからの個人輸入が最も確実な入手方法です。この記事では注文方法から関税まで丁寧に解説します。',
        shops: [
            { slug: 'hyperlite-mountain-gear', note: '公式サイトから直接購入が最も確実。Zpack系のDCF素材バックパックは人気商品のため、在庫があるうちに購入することをおすすめします。' },
            { slug: 'backcountry', note: 'HMGの一部モデルを取り扱う場合あり。公式より在庫が安定していることも。' },
        ]
    },
    {
        slug: 'outdoorbrand/bigagnes/shopreview-4',
        title: 'Big Agnes（ビッグアグネス）を安く買う海外ショップ4選',
        intro: 'アメリカ・コロラド発の軽量テント・シュラフブランド「Big Agnes（ビッグアグネス）」。日本での定価と大きな差がある海外ショップを厳選しました。',
        shops: [
            { slug: 'backcountry', note: 'Big Agnesの全ラインナップを豊富に取り揃え。年に一度のBIG SALEが最大の見どころ。' },
            { slug: 'trekkinn', note: 'Big Agnesが最安値クラスで揃う。Copper Spurなど人気テントもここで安く手に入ります。' },
            { slug: 'rei', note: 'REI限定カラーや特別モデルもあり。メンバーになるとさらにお得に購入できます。' },
        ]
    },
    {
        slug: 'outdoorbrand/savotta/scandinavianoutdoor',
        title: 'Savotta（サボッタ）はScandinavian Outdoorで買う！詳細レビュー',
        intro: 'フィンランドの軍用バックパックブランド「Savotta（サボッタ）」を購入するなら、フィンランドのScandinavian Outdoorが最もおすすめです。在庫・価格・サポートを詳しく解説します。',
        shops: [
            { slug: 'varuste', note: 'フィンランドの通販サイト。Savottaの全ラインナップを本国価格で購入できます。品揃えは世界最高水準です。' },
            { slug: 'trekkinn', note: 'Savottaの一部モデルを低価格で取扱い。varuste.netで在庫切れの場合の代替候補。' },
        ]
    },
    // Outdoor shop reviews
    {
        slug: 'outdoorshop/barrabes/shopreview-5',
        title: 'Barrabes（バロベス）の評判・口コミ徹底レビュー｜スペインの老舗アウトドアショップ',
        intro: 'スペイン・ピレネー山脈の麓に生まれたアウトドアショップ「Barrabes（バロベス）」のショップレビューです。日本への発送方法、関税、使い勝手を徹底解説します。',
        shops: [
            { slug: 'trekkinn', note: '同じスペイン系のTradeinnグループ。Barrabesと価格を比較して安い方を選ぶのがおすすめ。' },
            { slug: 'backcountry', note: 'アメリカのアウトドア通販の王道。Barrabesと商品を比較検討することで最安値を見つけやすくなります。' },
        ]
    },
    {
        slug: 'outdoorshop/rei/xtracahair-review',
        title: 'REI（アールイーアイ）の評判・日本への発送方法を徹底解説',
        intro: 'アメリカ最大のアウトドア共済「REI」。日本からの購入方法、送料、関税の実態を詳しくレビューします。',
        shops: [
            { slug: 'rei', note: 'アメリカを代表するアウトドアの老舗。年間を通じてセールが多く、アウトレットを活用すれば驚くほど安くなります。' },
            { slug: 'backcountry', note: 'REIと合わせて価格を比較したいショップ。品揃えと価格の両面で最有力な候補です。' },
        ]
    },
    {
        slug: 'outdoorshop/scandinavianoutdoor/shop-review',
        title: 'Scandinavian Outdoor（スカンジナビアンアウトドア）のレビュー｜フィンランドからの個人輸入',
        intro: 'フィンランドの大手アウトドアショップ「Scandinavian Outdoor（スカンジナビアンアウトドア）」のレビューです。北欧ブランドの宝庫で、Savotta・Hillebergなどの入手にも最適です。',
        shops: [
            { slug: 'varuste', note: '同系統のフィンランドショップ。北欧ブランドの品揃えはvaruste.netも非常に優秀で、価格比較に最適です。' },
            { slug: 'trekkinn', note: 'scandinavianoutdoor.comで在庫切れのものが見つかることも。送料比較も合わせてチェックを。' },
        ]
    },
    {
        slug: 'outdoorshop/ldmountaincentre/shopreview-2',
        title: 'LD Mountain Centre（LDマウンテンセンター）レビュー｜UKの老舗アウトドアショップ',
        intro: 'イギリスのアウトドアショップ「LD Mountain Centre（LDマウンテンセンター）」のショップレビューです。日本への発送方法と人気商品を解説します。',
        shops: [
            { slug: 'ultralight-outdoor-gear', note: '同じくUKのショップ。UL系ギアの品揃えが非常に豊富で、LD Mountain Centreとの価格比較に最適。' },
            { slug: 'trekkinn', note: 'LDで在庫切れや割高な場合の比較候補。日本への送料も安く使いやすい。' },
        ]
    },
    {
        slug: 'outdoorshop/trekkinn/shopreview-8',
        title: 'Trekkinn（トレッキン）の評判・使い方を徹底解説｜スペインのアウトドア通販',
        intro: 'スペインのTradeinnグループが運営する「Trekkinn（トレッキン）」のレビューです。圧倒的な商品数と価格の安さで、海外アウトドア通販の定番サイトです。',
        shops: [
            { slug: 'trekkinn', note: '登山、キャンプ、トレランから水泳・自転車まで全方位のアウトドアギアをカバーする巨大ショップ。定期的なプロモが魅力です。' },
            { slug: 'backcountry', note: 'Trekkinnと並ぶ定番ショップ。ブランドによってはTrackkinnより安いことも。比較して購入するのがベスト。' },
        ]
    },
    {
        slug: 'outdoorshop/alloutdoor/shopreview-3',
        title: 'All Outdoor（オールアウトドア）のレビュー｜UKアウトドアショップの評判',
        intro: 'イギリスのアウトドアショップ「All Outdoor（オールアウトドア）」のショップレビューです。日本への発送対応や人気ブランドの取り扱いを解説します。',
        shops: [
            { slug: 'ultralight-outdoor-gear', note: 'All Outdoorと並ぶUKのアウトドアショップ。UL系ギアの品揃えが抜群で、価格比較の定番候補です。' },
            { slug: 'trekkinn', note: '在庫が豊富で価格の安さも抜群。All Outdoorで見つからない場合の代替先として最適。' },
        ]
    },
    {
        slug: 'outdoorshop/backpackingunited/manual-review',
        title: 'Backpacking United（バックパッキングユナイテッド）レビュー｜ULギアの個人輸入ガイド',
        intro: '超軽量（UL）ハイキングギア専門のショップ「Backpacking United」のレビューです。日本への個人輸入方法と取り扱いブランドを解説します。',
        shops: [
            { slug: 'ultralight-outdoor-gear', note: 'ULギア専門店として世界的に有名。Backpacking Unitedと並ぶ、ULハイカー御用達のショップ。' },
            { slug: 'hyperlite-mountain-gear', note: 'ULギアの代名詞HMGの公式サイト。Backpacking Unitedで在庫がない場合の最有力候補。' },
        ]
    },
    {
        slug: 'outdoorshop/sportpursuit/shopreview-9',
        title: 'Sport Pursuit（スポーツパーシュート）レビュー｜UKのフラッシュセール専門サイト',
        intro: 'イギリス発のアウトドア・スポーツのフラッシュセールサイト「Sport Pursuit（スポーツパーシュート）」のレビューです。タイムセールで有名ブランドが激安になることも。',
        shops: [
            { slug: 'trekkinn', note: 'フラッシュセールと価格を比較したいショップ。常設の在庫量と価格の安定感ではTrekkinnに分があります。' },
            { slug: 'backcountry', note: 'Sport Pursuitとのセール重複期間に特に安くなりやすい。同時にチェックするのがおすすめ。' },
        ]
    },
    {
        slug: 'outdoorshop/ultralightoutdoorgear/shopreview-7',
        title: 'Ultralight Outdoor Gear（ウルトラライトアウトドアギア）レビュー｜ULハイキングの聖地',
        intro: 'イギリスのULギア専門店「Ultralight Outdoor Gear（ウルトラライトアウトドアギア）」の詳細レビューです。取り扱いブランドや日本発送の方法を解説します。',
        shops: [
            { slug: 'ultralight-outdoor-gear', note: 'ULハイキングギアに特化した世界有数のショップ。Zpacks、HMG、Gossamer Gearなど激レアブランドが揃います。' },
            { slug: 'hyperlite-mountain-gear', note: 'ULO Gearで在庫がない場合の最有力候補。アメリカのULブランドを公式価格で入手できます。' },
        ]
    },
    {
        slug: 'outdoorshop/exxpozed/review',
        title: 'Exxpozed（エクスポーズド）レビュー｜ドイツのアウトドア通販ショップ',
        intro: 'ドイツのアウトドアショップ「Exxpozed（エクスポーズド）」のレビューです。ヨーロッパブランドの充実した取り扱いと、日本への発送対応を解説します。',
        shops: [
            { slug: 'trekkinn', note: 'Exxpozedと価格を比較したい定番ショップ。スペイン系ならではの値付けで、ドイツとは異なる価格帯が出ることもあります。' },
            { slug: 'backcountry', note: 'アメリカ系のブランドはExxpozedより在庫が豊富な場合も。価格比較の候補として。' },
        ]
    },
    {
        slug: 'outdoorshop/deporvillage/review-manual',
        title: 'Deporvillage（デポービリッジ）の評判・使い方｜スペインのスポーツ・アウトドア通販',
        intro: 'スペインの大手スポーツ・アウトドアショップ「Deporvillage（デポービリッジ）」のレビューです。サイクリングからハイキングまで幅広く取り扱います。',
        shops: [
            { slug: 'trekkinn', note: '同じスペイン系のアウトドアショップ。Deporvillageと合わせて価格比較することで最安値を見つけやすくなります。' },
            { slug: 'backcountry', note: 'Deporvillageにない商品の代替先として活躍。特にアメリカブランドは在庫が豊富です。' },
        ]
    },
    {
        slug: 'outdoorshop/ellis-brigham/ellis-shopreview',
        title: 'Ellis Brigham（エリス・ブリガム）レビュー｜英国の老舗マウンテンスポーツショップ',
        intro: '1933年創業の老舗英国アウトドアショップ「Ellis Brigham（エリス・ブリガム）」のレビューです。スキー・登山ギアの品揃えが充実しています。',
        shops: [
            { slug: 'ultralight-outdoor-gear', note: '同じくUKのアウトドアショップ。Ellis Brighamにない軽量ギアを補完するのに最適な選択肢。' },
            { slug: 'trekkinn', note: 'Ellis Brighamのセールと比較する価格チェックの定番候補。送料の安さでも優秀。' },
        ]
    },
    // Outdoor shop lists
    {
        slug: 'outdoorshop/list/ulbackpack',
        title: '【2026年最新】ULバックパックが買える海外ショップ一覧｜超軽量バックパックの個人輸入完全ガイド',
        intro: 'Zpacks、Hyperlite Mountain Gear、Gossamer Gearなど、日本未発売・入手困難なUL（超軽量）バックパックを海外通販で安全に入手する方法を解説します。',
        shops: [
            { slug: 'ultralight-outdoor-gear', note: 'ULバックパック専門店の代表格。ZpacksのArcBlastやHMGのWhoopeeなど激レアモデルの在庫が充実しています。' },
            { slug: 'hyperlite-mountain-gear', note: 'HMG公式サイト。DCF素材のバックパックを直接購入できる確実な方法。サイズや容量の相談もここが最適。' },
            { slug: 'backcountry', note: 'Osprey ULシリーズなどの定番ULバックパックが充実。セールになると破格の価格になります。' },
        ]
    },
    {
        slug: 'outdoorshop/list/free-ship',
        title: '送料無料の海外アウトドア通販ショップ｜日本への無料配送ショップまとめ',
        intro: '日本への送料が無料、または条件付きで無料になる海外アウトドア通販ショップをまとめました。送料込みで日本国内の定価より安く購入するためのコツも解説します。',
        shops: [
            { slug: 'trekkinn', note: '一定額以上の購入で日本への送料が無料になる。定期的なプロモーションで条件が下がることも。コスパ最強候補。' },
            { slug: 'backcountry', note: '定期的に送料無料クーポンを発行。メルマガ登録で最新情報をゲットしましょう。' },
            { slug: 'ultralight-outdoor-gear', note: 'ULギア専門ショップ。合計金額が一定額以上で送料無料になることがある。ULユーザー必見。' },
        ]
    },
    // Fashion shops
    {
        slug: 'fashionshop/dressinn/shopreview',
        title: 'Dressinn（ドレスイン）の評判・使い方レビュー｜スペインのファッション通販',
        intro: 'スペインのTradeinnグループが運営するファッション通販サイト「Dressinn（ドレスイン）」のレビューです。プチプラから中価格帯のブランドが揃います。',
        shops: [
            { slug: 'trekkinn', note: '同グループのアウトドアショップ。アウトドアウェアを買うなら価格比較の定番候補です。' },
        ]
    },
    {
        slug: 'fashionshop/saksfifthavenue/saksoff5th-shopreview',
        title: 'Saks Fifth Avenue（サックス・フィフス・アベニュー）レビュー｜Saks OFF 5th個人輸入ガイド',
        intro: 'アメリカの高級百貨店「Saks Fifth Avenue」と、そのアウトレット「Saks OFF 5th」のレビューです。ラグジュアリーブランドが大幅値引きになるタイミングを解説します。',
        shops: [
            { slug: 'saks-fifth-avenue', note: 'アメリカ最大の高級百貨店。ShopRunner等を利用することで日本への配送が格段に容易になります。' },
            { slug: 'farfetch', note: 'Saksと同等のブランドをグローバルに展開。日本語対応で、Saksより使いやすい面もあります。' },
            { slug: 'ssense', note: 'ラグジュアリーブランドの正規品を関税込みで購入できる。Saks OFF 5thとのセール比較に最適。' },
        ]
    },
    {
        slug: 'fashionshop/lists/all',
        title: '【2026年最新】海外ファッション通販サイトおすすめ完全版｜ラグジュアリーからプチプラまで',
        intro: 'ラグジュアリーショップからプチプラ・韓国ファッションまで、あらゆるジャンルをカバーする海外ファッション通販サイトをジャンル別に完全網羅します。',
        shops: [
            { slug: 'ssense', note: 'ラグジュアリー＆ストリートの最高峰。日本語対応で関税込み。まず確認すべき定番サイト。' },
            { slug: 'farfetch', note: '世界最大のセレクトショップ連合。商品数が圧倒的で、完売品も見つかりやすい。' },
            { slug: 'mr-porter', note: '男性のハイエンドファッションはここで完結。パーソナルショッピングサービスも充実。' },
            { slug: 'mytheresa', note: 'ドイツ発の洗練されたセレクション。最新シーズンのラグジュアリーをいち早く手に入れるならここ。' },
            { slug: 'luisaviaroma', note: 'イタリア・フィレンツェ発の老舗。DDP（関税込み）の明朗会計が特徴。' },
        ]
    },
    // Fashion brands
    {
        slug: 'fashionbrand/gstar/bestshop-9',
        title: 'G-STAR RAW（ジースター・ロウ）が安い海外ショップ9選',
        intro: 'デニムの名門「G-STAR RAW（ジースター・ロウ）」を国内より安く買える海外ショップを厳選しました。為替・関税込みでもお得に購入できるショップを解説します。',
        shops: [
            { slug: 'farfetch', note: 'G-STAR RAWの定番デニムがセール時に大幅値引き。世界中のブティック在庫からベストプライスを探せます。' },
            { slug: 'ssense', note: 'G-STAR RAWのコレクションラインを中心に取り扱い。スタイリッシュなコーデ提案も参考になります。' },
            { slug: 'luisaviaroma', note: 'イタリアのセレクトショップ。G-STAR RAWのプレミアムラインが関税込みで購入できます。' },
        ]
    },
    {
        slug: 'fashionbrand/converse/converse-list',
        title: 'Converse（コンバース）を海外通販で安く買う！おすすめショップ一覧',
        intro: '国民的スニーカーブランド「Converse（コンバース）」。カラーが豊富な海外サイトで、日本未発売モデルや本国価格で購入する方法を紹介します。',
        shops: [
            { slug: 'end', note: 'コンバースのコラボや限定モデルが豊富。定番のAll Starも安く手に入ります。' },
            { slug: 'sneakersnstuff', note: '北欧の名店。コンバースの限定コラボが多く、スニーカーヘッズ必見のショップ。' },
            { slug: 'bodega', note: 'アメリカの隠れ家ショップ。コンバースの限定コラボが高頻度で発売されます。' },
        ]
    },
    {
        slug: 'fashionbrand/diesel/bestbudget',
        title: 'Diesel（ディーゼル）をお得に買える海外ショップ｜デニム・アパレルの通販比較',
        intro: 'イタリア発のリアルファッションブランド「Diesel（ディーゼル）」。海外ショップのセールを活用すれば、国内より大幅に安く購入できます。',
        shops: [
            { slug: 'farfetch', note: 'Dieselの旬のコレクションが充実。世界各地のブティックからお得な在庫を見つけられます。' },
            { slug: 'ssense', note: 'Dieselのアバンガルドなラインを中心に取り扱い。SELECTION + SELECTIONのセールが狙い目。' },
            { slug: 'luisaviaroma', note: 'イタリア発同士の組み合わせ。Dieselの品揃えが豊富で、関税込みで購入できます。' },
        ]
    },
    // Overseas shopping guides
    {
        slug: 'overseasshop/manual-address',
        title: '海外通販の英語住所の書き方｜国際配送で失敗しないための完全ガイド',
        intro: '海外通販で最もつまずくポイントの一つが「英語住所の入力」です。日本住所を正確に英語に変換する方法を、記入例付きで徹底解説します。',
        shops: [
            { slug: 'farfetch', note: '日本語対応のため、住所入力が最も簡単なショップの一つ。初めての海外通販の練習台に最適。' },
            { slug: 'ssense', note: '日本語サイトが完備されており、住所入力も日本語の案内に従うだけ。迷わず購入できます。' },
        ]
    },
    {
        slug: 'overseasshop/tax',
        title: '海外通販の関税はいくら？計算方法と節約のコツを徹底解説',
        intro: '海外通販で最も気になる「関税」について、計算方法・免税範囲・DDPとDDUの違いをわかりやすく解説します。事前に知っておけば、予算オーバーを防げます。',
        shops: [
            { slug: 'ssense', note: '関税込み（DDP）の代表的なショップ。表示価格のみで全費用が完結するため、関税を気にせず購入できます。' },
            { slug: 'farfetch', note: 'こちらも関税込み対応。日本向けはほとんどの場合DDPで完結し、余計なコストが発生しません。' },
            { slug: 'luisaviaroma', note: '関税込みの価格表示。表示金額以外は一切請求されないためFAQも明快です。' },
        ]
    },
    {
        slug: 'bicycle/wheel',
        title: '海外通販でホイールを安く買う！おすすめサイトと個人輸入の注意点',
        intro: '自転車ホイールは高額商品のため、海外通販で節約効果が大きいアイテムです。信頼できる海外サイトからの購入方法と注意点を解説します。',
        shops: [
            { slug: 'bike24', note: 'ドイツの大手自転車パーツショップ。シマノ・カンパニョーロなどホイールの種類が豊富で価格も最安値クラス。' },
            { slug: 'trekkinn', note: 'MTBホイールからロードまで幅広くカバー。Trekkinnは送料計算がわかりやすく使いやすいショップです。' },
        ]
    },
];

module.exports = ARTICLES;
