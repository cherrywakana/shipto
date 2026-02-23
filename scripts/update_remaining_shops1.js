const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const updateData = [
    {
        slug: 'ssense',
        shipping_guide: 'SSENSE公式サイトの配送ポリシーによれば、日本への直送に完全対応しています。住所の入力や日本語でのサポートも用意されています。',
        shipping_url: 'https://www.ssense.com/ja-jp/customer-service/shipping',
        tax_guide: '公式の関税ヘルプに記載されている通り、決済時に関税と消費税があらかじめ含まれた価格（DDP）で表示されるため、受取時の追加支払いはありません。',
        tax_url: 'https://www.ssense.com/ja-jp/customer-service/duties-and-taxes',
        fee_guide: '公式の配送料金表に基づくと、日本へは一定額（およそ35,000円等）以上で送料無料、それ以下は一律の送料がかかり、通常3〜5営業日で到着します。',
        fee_url: 'https://www.ssense.com/ja-jp/customer-service/shipping',
        description: 'SSENSE（エッセンス）はカナダ・モントリオールを拠点とする、世界で最も影響力のあるラグジュアリー・ストリート・アバンギャルドファッションのプラットフォームです。ハイエンドなデザイナーブランドから新進気鋭のインディーブランドまで、圧倒的でエッジの効いた品ぞろえが強みです。'
    },
    {
        slug: 'fwrd',
        shipping_guide: 'FWRD公式サイトの「Customer Care - Shipping」によれば、日本を含む世界中への国際発送（DHL、FedEx、UPS等を利用）に対応しています。',
        shipping_url: 'https://www.fwrd.com/customer-care/shipping/',
        tax_guide: '公式の「Duties & Taxes」規定により、チェックアウトの際に関税を含めた事前支払い（DDP）を選択するか、お届け時の支払い（DDU）にするかを選択できます。',
        tax_url: 'https://www.fwrd.com/customer-care/international-shipping/',
        fee_guide: '公式の配送料金に基づき、日本へはUS$100以上の注文で特急国際便（お届けまで約3-6日）が無料になります。',
        fee_url: 'https://www.fwrd.com/customer-care/shipping/',
        description: 'FWRD（フォワード）は、アメリカ・ロサンゼルスに本拠を置くラグジュアリーセレクトショップです。著名なトップデザイナーブランドを非常に洗練された視点でキュレーションしており、ハイエンドなファッションを求めるユーザーに強く支持されています。'
    },
    {
        slug: 'revolve',
        shipping_guide: 'REVOLVE公式「Shipping & Delivery」のページに従い、日本への直送に公式に対応しています。世界数十カ国で愛されているサイトです。',
        shipping_url: 'https://www.revolve.com/customer/shippingdlvy/',
        tax_guide: '公式の国際注文情報によれば、会計時に関税を含める（DDP）か・到着時に支払う（DDU）かの発送オプションが選べます。',
        tax_url: 'https://www.revolve.com/customer/shippingdlvy/',
        fee_guide: '公式の配送料案内によると、日本へはUS$100以上の購入で送料無料。通常、速達便を利用して約3〜5日でスピーディーに届きます。',
        fee_url: 'https://www.revolve.com/customer/shippingdlvy/',
        description: 'REVOLVE（リボルブ）は、LA発のトレンド感あふれるアパレル・コスメを展開する人気サイトです。約500以上のブランドと自社ブランドを取り扱い、ミレニアル世代からZ世代の女性にとって欠かせない存在となっています。'
    },
    {
        slug: 'yoox',
        shipping_guide: 'YOOX公式の「配送時間と送料」によれば、日本の専用倉庫・またはイタリアの倉庫から日本国内の指定住所へ完全対応で直送されます。',
        shipping_url: 'https://www.yoox.com/jp/project/shipping',
        tax_guide: '「関税・消費税」の項目に記載の通り、YOOXでは表示価格にすでに関税・税金が含まれており（DDP）、配達時に別途請求されることはありません。',
        tax_url: 'https://www.yoox.com/jp/project/taxes',
        fee_guide: '公式の配送料金表に基づくと、日本までの標準送料は2,200円（プロモーション期間中は無料）で、イタリアからの発送の場合は約4〜6営業日かかります。',
        fee_url: 'https://www.yoox.com/jp/project/shipping',
        description: 'YOOX（ユークス）は、イタリア発の世界最大規模を誇るアウトレット・ファッション・ストアです。一流デザイナーズブランドの過去のコレクションが大幅な割引価格で販売されており、宝探し感覚でショッピングを楽しめます。'
    },
    {
        slug: 'net-a-porter',
        shipping_guide: 'NET-A-PORTER公式の「Delivery」案内に基づき、日本への直送（インターナショナルシッピング）を完全サポートしています。',
        shipping_url: 'https://www.net-a-porter.com/en-jp/customercare/shipping',
        tax_guide: '公式ポリシーに従い、サイト側で関税および消費税が計算された価格（DDP）で決済されるため、受け取り時に支払う心配・手間がありません。',
        tax_url: 'https://www.net-a-porter.com/en-jp/customercare/duties-and-taxes',
        fee_guide: '公式の配送料金表によると、日本への標準的な配送料は一律約$15〜$30前後（購入額によって送料無料キャンぺーンあり）で、到着は通常3〜6営業日です。',
        fee_url: 'https://www.net-a-porter.com/en-jp/customercare/shipping',
        description: 'NET-A-PORTER（ネッタポルテ）は、ロンドン発の世界を代表するラグジュアリー女性向けオンラインストアです。雑誌のように美しく編集されたサイトデザインと、800を超える最高級ブランドの洗練されたセレクションが特徴です。'
    },
    {
        slug: 'mr-porter',
        shipping_guide: 'MR PORTER公式の「Delivery Information」に明記されている通り、日本国内への直送サービスに対応しています。',
        shipping_url: 'https://www.mrporter.com/en-jp/customercare/delivery',
        tax_guide: '公式の「Duties and Taxes」ガイドによれば、全商品の価格に関税と消費税が含まれている（DDP）ため、チェックアウト後の追加支払い請求は発生しません。',
        tax_url: 'https://www.mrporter.com/en-jp/customercare/delivery',
        fee_guide: '公式の配送規定に基づき、日本への送料は一定額以上（例: £200等）の注文で無料になります。DHLなどを利用し、約3〜5営業日で到着します。',
        fee_url: 'https://www.mrporter.com/en-jp/customercare/delivery',
        description: 'MR PORTER（ミスターポーター）は、NET-A-PORTERのメンズ版として運営されているロンドン発の高級メンズファッションストアです。ラグジュアリーファッションから高級時計、ライフスタイル雑貨まで、独自の美学で厳選されています。'
    },
    {
        slug: '24s',
        shipping_guide: '24S（旧24 Sèvres）公式の「Shipping」ページに記載の通り、DHLを用いた日本へのエクスプレス直送に公式に対応しています。',
        shipping_url: 'https://www.24s.com/ja-jp/customer-care/shipping',
        tax_guide: '公式の税金ポリシーによれば、日本円表記とともに、関税や消費税がすべて含まれた金額（DDP形式）で支払うことができ、受け取りがスムーズです。',
        tax_url: 'https://www.24s.com/ja-jp/customer-care/taxes',
        fee_guide: '公式の配送条件によると、日本へは一定額（例: 約3万円等）の購入を条件に送料無料になります。それ以下の場合は一律料金がかかり、通常2〜5日で到着します。',
        fee_url: 'https://www.24s.com/ja-jp/customer-care/shipping',
        description: '24S（トゥエンティーフォーエス）は、世界最大のラグジュアリー企業LVMH（モエ・ヘネシー・ルイ・ヴィトン）グループが運営するパリ発のオンライン百貨店です。Louis VuittonやDiorなどLVMH傘下ブランドの一部をオンラインで購入できる稀有な存在です。'
    },
    {
        slug: 'selfridges',
        shipping_guide: 'Selfridges公式の「International Delivery」サービスにより、イギリスから日本への国際直送に対応しています。',
        shipping_url: 'https://www.selfridges.com/JP/en/features/info/delivery-returns/',
        tax_guide: '公式ヘルプで案内されている通り、チェックアウト時に日本の関税等を含めた総額（DDP）で支払うため、荷物到着時に追加の税金や手数料が発生しません。',
        tax_url: 'https://www.selfridges.com/JP/en/features/info/delivery-returns/',
        fee_guide: '公式の配送料金表によれば、日本への通常送料は約£25です。なお、年間定額サービス「Selfridges+ Global」に加入すると1年間どの注文も送料無料になります。',
        fee_url: 'https://www.selfridges.com/JP/en/features/info/delivery-returns/',
        description: 'Selfridges（セルフリッジズ）は、ロンドンで圧倒的な人気と実績を誇る高級百貨店の一つです。最新のハイファッションから高級コスメ、独占販売の限定品まで、実店舗の熱気をそのままオンラインで体験することができます。'
    },
    {
        slug: 'luisaviaroma',
        shipping_guide: 'LUISAVIAROMA公式の「Shipping（配送）」案内によると、日本を含む世界中への安全で迅速な直送に対応しています。',
        shipping_url: 'https://www.luisaviaroma.com/ja-jp/contact-us/shipping',
        tax_guide: '公式の税金案内ページによれば、LUISAVIAROMAは全て関税・輸入消費税込み（DDP）の価格で販売しており、商品到着時に支払う費用はゼロです。',
        tax_url: 'https://www.luisaviaroma.com/ja-jp/contact-us/shipping',
        fee_guide: '公式の配送ポリシーによれば、日本への標準配送料は約30〜35ユーロ（または日本円で数千円）となっており、DHLエクスプレス等で通常2〜5日で届きます。',
        fee_url: 'https://www.luisaviaroma.com/ja-jp/contact-us/shipping',
        description: 'LUISAVIAROMA（ルイーザヴィアローマ）は、イタリア・フィレンツェの中止部に創業した老舗の大型ラグジュアリーセレクトショップです。600以上のハイエンドなコレクションブランドを取り扱い、イタリアらしい華やかなセレクトが強みです。'
    },
    {
        slug: 'mytheresa',
        shipping_guide: 'Mytheresa公式の「Shipping Methods（配送方法）」に記されている通り、DHLによる日本への素早い直送サービスを提供しています。',
        shipping_url: 'https://www.mytheresa.com/jp/ja/customer-service/shipping',
        tax_guide: '公式の「Duties and Taxes」規約によれば、あらかじめ日本の関税や消費税が含まれた価格（DDP）で決済を行なうため、後の請求はありません。',
        tax_url: 'https://www.mytheresa.com/jp/ja/customer-service/customs-duties',
        fee_guide: '公式の配送料案内により、日本向けには指定額（例：70,000円以上）以上の購入で送料無料。それ以下の場合は一律の送料がかかり、通常3〜4営業日で届きます。',
        fee_url: 'https://www.mytheresa.com/jp/ja/customer-service/shipping',
        description: 'Mytheresa（マイテレサ）は、ドイツ・ミュンヘン発のハイラグジュアリー専門のオンラインリテーラーです。世界最高峰のデザイナーズブランドから、Mytheresa限定のカプセルコレクションまで、非常に上品で洗練された品揃えです。'
    },
    {
        slug: 'harrods',
        shipping_guide: 'Harrods公式の「International Delivery（国際配送）」ポリシーに記載の通り、DHLエクスプレスを通じて日本への直送を公式サポートしています。',
        shipping_url: 'https://www.harrods.com/en-jp/delivery',
        tax_guide: '公式ヘルプの税金欄によれば、チェックアウト時に日本の関税と消費税が自動的に計算され、追加されるシステム（DDP）を採用しています。',
        tax_url: 'https://www.harrods.com/en-jp/delivery',
        fee_guide: '公式サイトの配送料金表に基づくと、日本への配送料は一律で約£25（為替により変動）となっており、重量制限の範囲内で通常4〜7営業日で到着します。',
        fee_url: 'https://www.harrods.com/en-jp/delivery',
        description: 'Harrods（ハロッズ）は、イギリス・ロンドンのナイツブリッジにある世界で最も有名で歴史的な高級百貨店です。英国を象徴する最高級のハイブランドから、紅茶やテディベアなどのハロッズ・オリジナル商品まで、圧倒的な格調の高さが魅力です。'
    },
    {
        slug: 'shopbop',
        shipping_guide: 'Shopbop公式の「Shipping Information」によれば、日本への直送（無料および有料エクスプレス便）に完全対応しています。',
        shipping_url: 'https://www.shopbop.com/ci/aboutShopBop/customerservice.html#cs-shipping',
        tax_guide: '公式の「Import Duties & Taxes」ポリシーに従い、関税を事前に前払いする（DDP）か・受け取り時に自分で支払う（DDU）かをチェックアウト時に選択可能です。',
        tax_url: 'https://www.shopbop.com/ci/aboutShopBop/customerservice.html#cs-shipping',
        fee_guide: '公式の配送案内によると、$100以上の注文で日本への標準的な国際郵便が無料（送料無料）になり、約2〜4日（または10日程度、選択による）で到着します。',
        fee_url: 'https://www.shopbop.com/ci/aboutShopBop/customerservice.html#cs-shipping',
        description: 'Shopbop（ショップボップ）は、Amazonグループの傘下にあるアメリカのコンテンポラリー・ファッションストアです。最新のデザイナーズブランドから、手に取りやすい価格帯のトレンドアイテムまで幅広く揃い、素早くお得に配送されるのが強みです。'
    },
    {
        slug: 'end',
        shipping_guide: 'END.公式の「Shipping Information」ページにより、FedExなどを利用した日本への直接発送に対応していることが確認できます。',
        shipping_url: 'https://www.endclothing.com/jp/help/shipping',
        tax_guide: '公式のFAQ・利用規約に基づき、日本からの注文の表示価格には関税などの税金が含まれておらず、商品受け取り時に別途支払う必要があります（DDU）。最新の状況は公式サイトでご確認ください。',
        tax_url: null,
        fee_guide: '公式の送料計算表によれば、日本向けの国際配送料は注文の重量などで決まりますが、セールなどの指定条件で数百円〜2500円前後に設定されており、数日で到着します。',
        fee_url: 'https://www.endclothing.com/jp/help/shipping',
        description: 'END.（エンド）は、イギリス発のメンズ・ハイエンドストリートからスニーカーまでを取り扱う名作セレクトショップです。大人気の限定スニーカーの抽選販売（END. Launches）でも世界有数の知名度を誇ります。'
    },
    {
        slug: 'slamjam',
        shipping_guide: 'Slam Jam公式の「Shipping Policy」に記載されている通り、日本を含む世界的な国際配送ネットワークを整備しています。',
        shipping_url: 'https://slamjam.com/pages/shipping',
        tax_guide: '公式のポリシーによると、日本等のEU圏外への発送の場合、チェックアウト時には関税などが免除された価格となり、到着時に必要に応じて関税を支払う方式（DDU）です。',
        tax_url: 'https://slamjam.com/pages/shipping',
        fee_guide: '公式の料金表によると、日本への送料は通常約35ユーロ程度、または指定されたプロモーション等の金額（例: 250ユーロ以上）で無料となります。',
        fee_url: 'https://slamjam.com/pages/shipping',
        description: 'Slam Jam（スラムジャム）は、1989年にイタリアで設立されたアンダーグラウンドカルチャーやストリートウェアの強力なディストリビューター・セレクトショップです。独自の色合いを持ったアパレルセレクトがマニアを熱狂させています。'
    }
];

async function updateDB() {
    for (const item of updateData) {
        const { error } = await supabase.from('shops').update({
            shipping_guide: item.shipping_guide,
            shipping_url: item.shipping_url,
            tax_guide: item.tax_guide,
            tax_url: item.tax_url,
            fee_guide: item.fee_guide,
            fee_url: item.fee_url,
            description: item.description,
            updated_at: new Date()
        }).eq('slug', item.slug);

        if (error) {
            console.log('Error updating ' + item.slug + ':', error.message);
        } else {
            console.log('Successfully updated ' + item.slug);
        }
    }
}

updateDB();
