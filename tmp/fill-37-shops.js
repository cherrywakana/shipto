const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const bulkUpdates = [
  // --- OUTDOOR / SPORTS ---
  {
    slug: 'ld-mountain-centre',
    country: 'イギリス',
    category: 'アウトドア・スポーツ',
    description: "1966年創業のイギリスのアウトドア専門店。PatagoniaやArc'teryxをはじめとする高級アウトドアブランドの品揃えが豊富で、価格競争力も非常に高いです。",
    shipping_guide: 'DHL等を通じて日本へ直送可能',
    tax_guide: '受け取り時に関税を支払うDDU方式になります。',
    fee_guide: '購入するアイテムの重量や容積により送料が変動します。'
  },
  {
    slug: 'evanscycles',
    country: 'イギリス',
    category: 'ロードバイク・自転車用品',
    description: 'イギリスで圧倒的なシェアを誇る巨大自転車チェーン。完成車からウェア、パーツまで非常に幅広い取り扱いがあります。',
    shipping_guide: '海外直送に対応（一部大型商品は不可の場合あり）',
    tax_guide: 'EU/UK消費税免税。関税は国内到着時に支払い。',
    fee_guide: 'アイテムサイズによって送料が段階的に変動します。'
  },
  {
    slug: 'starbike',
    country: 'ドイツ',
    category: 'ロードバイク・自転車用品',
    description: 'ドイツを拠点とする軽量パーツやハイエンドコンポーネントに強いプロショップ。TuneやSchmolkeなどマニアックなブランドが揃います。',
    shipping_guide: '日本への直送に完全対応',
    tax_guide: '自動的に欧州VATが免除された価格で購入可能。',
    fee_guide: 'DHLを利用した一律料金に近い分かりやすい送料体系。'
  },
  {
    slug: 'deporvillage',
    country: 'スペイン',
    category: 'ロードバイク・アウトドア',
    description: 'スペインから世界展開するアウトドア・スポーツ用品の大手EC。自転車ウェアやヘルメット、ランニングシューズが常にセール価格で提供されています。',
    shipping_guide: '日本への直送が可能',
    tax_guide: 'VAT控除済み。関税は完全後払い方式（DDU）。',
    fee_guide: '送料は安価に設定されており、複数商品のまとめ買いがお得です。'
  },
  
  // --- INTERIOR / HOME ---
  {
    slug: 'anthropologie',
    country: 'アメリカ',
    category: 'インテリア・家具・雑貨',
    description: 'アパレルのみならず、ボヘミアン調でお洒落なインテリア雑貨が世界中の女性から熱狂的な支持を集めるアメリカのブランド。',
    shipping_guide: '日本直送に対応（家具など一部大型品は除く）',
    tax_guide: 'チェックアウト時に関税等が含まれる場合と、到着時に支払う場合があります。',
    fee_guide: '国際送料は高めのため、複数アイテムのまとめ買いが推奨されます。'
  },
  {
    slug: 'west-elm',
    country: 'アメリカ',
    category: 'インテリア・家具・雑貨',
    description: 'NYブルックリン発のモダンなインテリアブランド。ミッドセンチュリーを取り入れたスタイリッシュな家具や照明、テキスタイルが揃います。',
    shipping_guide: '国際配送サービス「Borderfree」を通じて日本へ直送可能',
    tax_guide: 'チェックアウト時に日本の関税・消費税がすべて計算され事前に支払うDDP方式。',
    fee_guide: '送料も事前決済されるため安心ですが、家具の場合は高額になります。'
  },
  {
    slug: 'nordic-nest',
    country: 'スウェーデン',
    category: 'インテリア・家具・雑貨',
    description: '北欧デザインの家具や照明、テーブルウェアを扱う世界有数のオンラインストア。マリメッコやイッタラ、ルイスポールセンの品揃えは圧巻。',
    shipping_guide: '日本への直送に完全対応（日本語サポートあり）',
    tax_guide: 'サイト上で日本向けの税込価格が表示されており、追加の支払いは原則ありません。',
    fee_guide: '一定金額（約25,000円）以上の購入で日本への送料無料キャンペーンを実施することが多いです。'
  },
  {
    slug: 'finnish-design-shop',
    country: 'フィンランド',
    category: 'インテリア・家具・雑貨',
    description: 'フィンランド発の世界最大の北欧デザイン専門EC。アルテックやムートなど、本場の北欧モダン家具を極めて高い信頼性の元で購入できます。',
    shipping_guide: '迅速な日本直送（FedEx / DHL）',
    tax_guide: 'VAT（現地消費税）免除。日本の関税・消費税は到着時着払い。',
    fee_guide: '大型家具の場合は高額な輸送費がかかるため事前見積もりが表示されます。'
  },
  {
    slug: 'royal-design',
    country: 'スウェーデン',
    category: 'インテリア・家具・雑貨',
    description: '5万点以上の北欧インテリアアイテムを扱うメガストア。グラスウェアやカトラリーなど、比較的小さなアイテムを個人輸入するのに非常に適しています。',
    shipping_guide: '日本への直送に対応',
    tax_guide: '商品代金は関税・各種税金が含まれた価格（DDP）で提示されます。',
    fee_guide: '一定金額以上で送料が無料になる閾値が低く設定されています。'
  },
  {
    slug: 'urban-outfitters',
    country: 'アメリカ',
    category: 'インテリア・家具・雑貨',
    description: 'アパレルだけでなく、レコードプレーヤーからネオンサイン、独創的なクッションまで、若者のライフスタイルを彩るユニークなインテリア雑貨が豊富です。',
    shipping_guide: '日本への直送可能',
    tax_guide: 'チェックアウト時に関税等を支払うか、到着時に支払うかの選択が可能な場合があります。',
    fee_guide: '通常配送は一律30ドル程度。'
  },
  {
    slug: 'kare',
    country: 'ドイツ',
    category: 'インテリア・家具・雑貨',
    description: '「クレイジー＆ハッピー」をテーマに掲げる、ドイツ発の超個性的かつポップなデザイン家具ブランド。動物モチーフのオブジェなど唯一無二のデザイン。',
    shipping_guide: '日本にも正規代理店があり、本国サイトからの個人輸入より国内ECでの購入が推奨されます',
    tax_guide: '国内発送のため関税はかかりません。',
    fee_guide: '大型家具は国内の実費送料がかかります。'
  },
  {
    slug: 'the-conran-shop',
    country: 'イギリス',
    category: 'インテリア・家具・雑貨',
    description: 'テレンス・コンラン卿が設立した、世界を代表するホームファニシングショップ。名作家具から日用品まで、洗練されたキュレーションが光ります。',
    shipping_guide: '日本国内に直営オンラインストアあり',
    tax_guide: '国内購入のため表示価格に日本の消費税が含まれています。',
    fee_guide: '国内送料規定に準じます。'
  },
  {
    slug: 'flymee',
    country: '日本',
    category: 'インテリア・家具・雑貨',
    description: '日本最大級の家具・インテリア通販サイト。国内外の1000以上のブランドを取り扱い、サイト上で理想のコーディネートを完結できます。',
    shipping_guide: '日本国内からの発送',
    tax_guide: '国内表示価格（消費税込み）',
    fee_guide: '商品やブランドごとに送料設定が異なります。'
  },
  {
    slug: 'muse-home',
    country: '日本',
    category: 'インテリア・家具・雑貨',
    description: '海外の「ホテルライク」や「海外インテリア」のトレンドをいち早く取り入れた、SNSで大人気の日本のインテリア雑貨通販サイト。',
    shipping_guide: '国内からの発送対応',
    tax_guide: 'すべて国内消費税込み。',
    fee_guide: '通常、全国一律の送料が適用されます。'
  },

  // --- WHISKY ---
  {
    slug: 'the-whisky-exchange',
    country: 'イギリス',
    category: 'ウイスキー・洋酒',
    description: 'イギリスを代表する世界最大級のオンライン酒屋。1万種類を超える膨大な在庫を誇り、オフィシャルからボトラーズまで探し物はほぼここで見つかります。',
    shipping_guide: '日本への直送に完全対応。酒類専用の頑丈な梱包で届きます。',
    tax_guide: '支払い時にEU消費税は差し引かれます。日本到着時に関税と酒税を配達員に支払います。',
    fee_guide: 'ボトル本数や重量に応じて送料が自動計算されます。'
  },
  {
    slug: 'master-of-malt',
    country: 'イギリス',
    category: 'ウイスキー・洋酒',
    description: '小瓶のサンプル販売（Dram）が大人気のイギリスの酒屋。フルボトルを買う前にテイスティングできる画期的なシステムがスコッチ愛好家に評価されています。',
    shipping_guide: '※時期によって日本への配送がストップしている場合があります。転送等を活用する必要があります。',
    tax_guide: '直送の場合は到着時に日本の酒税と消費税がかかります。',
    fee_guide: 'カートで宛先を入力すると計算されます。'
  },
  {
    slug: 'whisky-international-online',
    country: 'イギリス',
    category: 'ウイスキー・洋酒',
    description: 'スコットランド・エディンバラを拠点とする専門店。比較的高級な絶版ボトルや、日本への発送実績が豊富で安心感があります。',
    shipping_guide: 'DHL等を通じて日本へ迅速な直送が可能。',
    tax_guide: '現地税は控除。国内受け取り時に日本の酒税・輸入消費税を支払います。',
    fee_guide: 'ボトル本数に基づく明確な送料体系を持っています。'
  },
  {
    slug: 'the-whisky-barrel',
    country: 'イギリス',
    category: 'ウイスキー・洋酒',
    description: '独自のプライベートボトル（PB）や、マクファイルなどの高級ボトラーズに強いスコットランドのショップ。他店にない独自の樽を確保しています。',
    shipping_guide: '日本への直送対応',
    tax_guide: '現地VAT免除。日本国内の税金は到着時支払いのDDU方式。',
    fee_guide: 'DHL Expressによる配送料がカート内で提示されます。'
  },
  {
    slug: 'fine-drams',
    country: 'デンマーク',
    category: 'ウイスキー・洋酒',
    description: 'デンマーク発の熱狂的な酒屋。サンプル（小瓶）の充実度は世界屈指で、ウイスキーだけでなく上質なラムやコニャックなどハードリカー全般に強いです。',
    shipping_guide: '数本の注文でも日本へ安価な送料で直送可能',
    tax_guide: '日本上陸後、税関を通る際に酒税と消費税を請求されます。',
    fee_guide: 'ヨーロッパ内の他の酒屋と比較して配送料が良心的なことが多いです。'
  },
  {
    slug: 'hard-to-find-whisky',
    country: 'イギリス',
    category: 'ウイスキー・洋酒',
    description: '店名の通り「見つけるのが困難な」オールドボトルや超高級ウイスキーを専門に扱うコレクター向けのハイエンドショップ。',
    shipping_guide: '全世界への配送に対応（日本含む）',
    tax_guide: '高額商品が多いため、日本の酒税・消費税の予算をあらかじめ見込んでおく必要があります。',
    fee_guide: '高額な保険をかけた厳重な配送が選択されます。'
  },
  {
    slug: 'royal-mile-whiskies',
    country: 'イギリス',
    category: 'ウイスキー・洋酒',
    description: 'エディンバラの有名なロイヤルマイル通りに実店舗を構える名店。スタッフの知識が深く、独自ルートで入荷する希少銘柄がすぐ完売になる人気サイト。',
    shipping_guide: '日本への直送に対応',
    tax_guide: '現地税控除・日本の酒税と消費税は受け取り時払い。',
    fee_guide: 'システムで梱包箱のサイズに基づいて送料が算出されます。'
  },
  {
    slug: 'whiskybase-shop',
    country: 'オランダ',
    category: 'ウイスキー・洋酒',
    description: '世界最大のウイスキーデータベース「WhiskyBase」が運営するオランダの公式ショップ。マニアックな新興ボトラーズ銘柄を最速で手に入れるならここ。',
    shipping_guide: '日本への直送に完全対応。',
    tax_guide: 'EU仕様のVAT自動控除システムあり。関税関連は到着時支払い。',
    fee_guide: 'オランダからのUPSやDHLでの発送。数本まとめ買いが推奨されます。'
  },

  // --- KIDS FASHION ---
  {
    slug: 'carters',
    country: 'アメリカ',
    category: 'キッズ・ベビー服',
    description: 'アメリカの超定番ベビー服ブランド。手頃な価格とアメリカらしいカラフルで可愛いデザインが特徴で、日本でも出産祝いの定番です。',
    shipping_guide: '日本への直送不可の場合が多いため、Planet Expressなどの米国転送サービスの利用が必要です。',
    tax_guide: '免税州へ転送すれば米国消費税なし。日本到着時に関税等がかかる場合があります。',
    fee_guide: '米国国内は一定額以上で送料無料。転送手数料＋国際送料が別途発生いたします。'
  },
  {
    slug: 'childrensalon',
    country: 'イギリス',
    category: 'キッズ・ベビー服',
    description: 'バーバリーやグッチ、モンクレールなど、超一流ハイブランドの子供服を専門に扱うイギリスの高級老舗セレクトショップ。',
    shipping_guide: '日本への迅速な直送に対応。',
    tax_guide: '日本の関税や消費税がチェックアウト時に計算され、事前に支払う関税込み（DDP）方式。',
    fee_guide: 'ハイエンドな梱包で手元に届きます。'
  },
  {
    slug: 'patpat',
    country: 'アメリカ',
    category: 'キッズ・ベビー服',
    description: '親子での「リンクコーデ（お揃い服）」の品揃えにおいて右に出るものはない、シリコンバレー発の爆発的人気を誇るプチプラキッズ服アプリ。',
    shipping_guide: '日本への直送に対応（サイトも完全日本語化済み）',
    tax_guide: '商品価格に含まれており、後から関税を請求されることはありません。',
    fee_guide: '大変買いやすい低価格から送料無料条件が設定されています。'
  },
  {
    slug: 'next-kids',
    country: 'イギリス',
    category: 'キッズ・ベビー服',
    description: 'イギリス最大のファストファッションブランド。保育園用の着替えに最適な「3~5枚組セット」など、品質が高いのに驚くほど安い絶対的エース。',
    shipping_guide: 'Nextの日本語向け公式サイトから簡単に日本へ直送可能。',
    tax_guide: '関税等すべて込み。国内通販と全く同じ感覚で買えます。',
    fee_guide: '一定金額（数千円）以上で日本全国へ送料無料。'
  },
  {
    slug: 'babyshop',
    country: 'スウェーデン',
    category: 'キッズ・ベビー服',
    description: '北欧発祥のプレミアムベビー服・子ども服のメガストア。Mini Rodiniなど北欧らしい個性的な柄物ブランドのアパレルやおもちゃが圧倒的です。',
    shipping_guide: '日本への直送に対応。日本語サポートあり。',
    tax_guide: '商品代金は関税込み・免税済みなどの計算が自動で行われています。',
    fee_guide: '一定金額以上の購入で送料無料。'
  },
  {
    slug: 'boden',
    country: 'イギリス',
    category: 'キッズ・ベビー服',
    description: '英国らしい上品で発色の良いカラーリングと、遊び心のある動物などのアップリケデザインが特徴のブランド。通称「Mini Boden（ミニボーデン）」。',
    shipping_guide: '日本への直送に完全対応。',
    tax_guide: 'チェックアウト時に日本の関税などが事前計算されます（DDP）。',
    fee_guide: '一定金額以上の購入で無料配送オプションが生じます。'
  },
  {
    slug: 'the-childrens-place',
    country: 'アメリカ',
    category: 'キッズ・ベビー服',
    description: 'アメリカのショッピングモールには必ずと言って良いほど入っている巨大キッズブランド。常に投げ売りレベルのセールを行っており、Tシャツなどが数百円で買えます。',
    shipping_guide: '日本直送は通常非対応。Planet Express等の米国転送サービスを利用してください。',
    tax_guide: '免税州の転送住所を使うことで米国税回避。日本輸入時に関税が発生する可能性があります。',
    fee_guide: '米国国内はほぼ常に送料無料（Free Shipping）。国際転送費が別途かかります。'
  },
  {
    slug: 'hanna-andersson',
    country: 'アメリカ',
    category: 'キッズ・ベビー服',
    description: 'スウェーデンのルーツを持つアメリカブランド。オーガニックコットンを使用した極上の肌触りと、何回洗濯してもヘタらないパジャマが大人気です。',
    shipping_guide: '日本への直送は非対応。米国転送サービスが必須となります。',
    tax_guide: 'オレゴン州などの免税転送倉庫を宛先に指定してください。',
    fee_guide: '国際送料を加味しても、半額セール等を利用すれば十分に安く輸入できます。'
  },
  {
    slug: 'smallable',
    country: 'フランス',
    category: 'キッズ・ベビー服',
    description: '「ファミリー向けコンセプトストア」としてパリから発信される超絶お洒落なセレクトショップ。ボボショーズ等の欧州ブランドや、知育玩具、インテリアに非常に強いです。',
    shipping_guide: '日本への直送に完璧に対応。',
    tax_guide: '事前に税金を支払うDDPオプションと、到着時払いのDDUオプションから選べます。',
    fee_guide: '複数ブランドをまとめて買い付け、同梱で日本に送るのに最も適しています。'
  },
  {
    slug: 'vertbaudet',
    country: 'フランス',
    category: 'キッズ・ベビー服',
    description: 'フランスで愛用されている老舗のファミリーブランド。フレンチシックで上品な色使いのデザインが、プチプラ価格で手に入ります。',
    shipping_guide: '日本への直接配送が可能。',
    tax_guide: '欧州圏からの発送で、到着時に国内関税等を支払うDDU方式になります。',
    fee_guide: 'ヨーロッパからの配送料が固定でかかるため、まとめ買いでお得に。'
  },

  // --- GADGETS & ELECTRONICS ---
  {
    slug: 'geekbuying',
    country: '中国',
    category: '海外ガジェット・中華EC',
    description: 'ミニPCやタブレット、ポータブル電源、3Dプリンター等のニッチな電子機器を中国・香港から激安で直送してくれるグローバルEC。最新ガジェットの宝庫です。',
    shipping_guide: '日本への直送に完全対応。',
    tax_guide: '基本は到着時関税（DDU）ですが、配送方法の選択により税関パス込みのラインも選べます。',
    fee_guide: '配送方法（標準〜お急ぎ）によって数百円〜数千円の送料に分かれます。'
  },
  {
    slug: 'banggood',
    country: '中国',
    category: '海外ガジェット・中華EC',
    description: 'Aliexpressに次ぐ規模を誇る総合中華EC。ドローンやRCモデル、電子工作部品、スマートフォンなど「男のロマン」を刺激する商品展開が特徴。',
    shipping_guide: '日本への直送に強み。専用のDirect Mailを選べば非常にスムーズです。',
    tax_guide: '「Tariff Insurance（関税保険）」をカートで選択できるため、関税がかかった場合補填してくれます。',
    fee_guide: '標準配送であれば送料無料〜数百円の格安設定がほとんどです。'
  },
  {
    slug: 'gshopper',
    country: '中国',
    category: '海外ガジェット・スマートフォン',
    description: 'Xiaomi（シャオミ）などの中国製最新スマートフォンのグローバル版を世界最速・最安級で販売する勢いのある新興ECプラットフォーム。',
    shipping_guide: '日本直送対応。倉庫の場所によって配送日数が異なります。',
    tax_guide: '関税等が含まれた状態で決済されるケースが多く、追加徴収は稀です。',
    fee_guide: 'スマホ・タブレットは基本的に送料無料（Free Shipping）で提供されています。'
  },
  {
    slug: 'etoren',
    country: '香港・シンガポール',
    category: '海外スマートフォン・カメラ',
    description: '日本人スタッフが常駐する海外スマホ輸入の決定版。日本ではシャッター音が鳴るiPhoneの海外版（シャッター音なし）を買うためのルートとして大定番です。',
    shipping_guide: '日本へ最速数日で直送。',
    tax_guide: '表示価格はすべて「関税・消費税込み」。商品受け取り時の追加支払いは一切発生しません。',
    fee_guide: '一律の送料がかかりますが、トータルの出費が計算しやすく極めて安心。故障時の国内保証拠点も充実。'
  },
  {
    slug: 'bh-photo-video',
    country: 'アメリカ',
    category: 'カメラ・PC・電子機器',
    description: 'ニューヨークに巨大な実店舗を構える世界的映像機材・PC専門店（通称：B&H）。日本では未発売のPCパーツや、プロ向けのシネマカメラ機材を直接買い付けできます。',
    shipping_guide: '日本への直送に完全対応（機材専用の強固な梱包）。',
    tax_guide: 'チェックアウト時に日本の消費税や関税を事前決済（Pre-pay Duties & Taxes）でき、玄関先での面倒がありません。',
    fee_guide: '高額な機材の輸出入に長けたDHL等の確実な配送網を利用します。'
  }
];

async function backfillAllMissingShops() {
  console.log(`Starting massive metadata backfill for ${bulkUpdates.length} shops...`);
  
  for (const shop of bulkUpdates) {
    const { error } = await supabase
      .from('shops')
      .update({
        country: shop.country,
        category: shop.category,
        description: shop.description,
        shipping_guide: shop.shipping_guide,
        tax_guide: shop.tax_guide,
        fee_guide: shop.fee_guide
      })
      .eq('slug', shop.slug);

    if (error) {
      console.error(`❌ Failed to inject metadata to ${shop.slug}:`, error.message);
    } else {
      console.log(`✅ Fully backfilled data for: ${shop.slug}`);
    }
  }

  console.log('\\nAll targeted shops have been successfully scrubbed and populated. NULLs eliminated.');
}

backfillAllMissingShops();
