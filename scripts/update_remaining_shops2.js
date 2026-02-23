const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const updateData = [
    {
        slug: 'ln-cc',
        shipping_guide: 'LN-CC公式「Help」によれば、Fedex Express等の配送網を利用して日本への世界直行便に対応しています。',
        shipping_url: 'https://www.ln-cc.com/en_jp/help/',
        tax_guide: '公式「Customs & Duty」規約に基づき、日本円での選択時に関税込み（DDP）での購入がサポートされ、事後支払いは不要です。',
        tax_url: 'https://www.ln-cc.com/en_jp/help/',
        fee_guide: '「Shipping Options」に記載の通り、約10日以内で手元に届くエクスプレス配送費は一定額以上（例：1万数千円等）で無料・フラットな定額料金です。',
        fee_url: 'https://www.ln-cc.com/en_jp/help/',
        description: 'LN-CC（エルエヌシーシー）は、ロンドン東部のイーストエンド・ダルストンに前衛的な実店舗をもつ非常に感度が高いセレクトショップです。厳選されたモードブランドと限定スニーカーのセレクトが群を抜いています。'
    },
    {
        slug: 'goat',
        shipping_guide: 'GOAT公式の「Shipping and Handling」に記載されているように、売り手・買い手の両方の立場でも日本に対応したグローバルサービスを展開しています。',
        shipping_url: 'https://support.goat.com/hc/en-us/articles/360010831611-Shipping-and-Handling',
        tax_guide: '公式の「International Ordering」ヘルプによれば、商品代金に輸入時の税金は事前に含まれておらず、日本到着時に運送会社から別途関税等が請求されます（DDU）。',
        tax_url: 'https://support.goat.com/hc/en-us/articles/360010831611-Shipping-and-Handling',
        fee_guide: '公式配送料一覧によると、日本への片道配送料金は約$40（約5〜6000円）です。アイテムの確認や鑑定の工程があるため、配送までに約1〜2週間強かかることになります。',
        fee_url: 'https://support.goat.com/hc/en-us/articles/360010831611-Shipping-and-Handling',
        description: 'GOAT（ゴート）は、アメリカ発の世界有数のスニーカーリセールアプリ・プラットフォームです。出品されたスニーカーやアパレルを熟練鑑定士が厳しくチェックして偽物を排除するため、安心して取引を行えるプラットフォームです。'
    },
    {
        slug: 'stockx',
        shipping_guide: 'StockXの公式FAQに「Does StockX ship to my country?」等の記載を通して、日本からの購入・販売に完全対応し、さらには日本語アプリも運用していることが確認できます。',
        shipping_url: 'https://stockx.com/help/articles/Pricing-Models-on-StockX',
        tax_guide: '2021年の公式改定などに基づき、「All-In Pricing（一括価格設定）」モデルが適用されているため、購入価格に関税・消費税が含まれています（DDP）。',
        tax_url: 'https://stockx.com/help/articles/All-In-Pricing',
        fee_guide: '送料は販売者の国によって変動しますが、一目でわかるように決済前に配送料や手数料が表示（約$15〜$40）されます。鑑定後の配送となるため、約1.5〜2週間で届きます。',
        fee_url: 'https://stockx.com/help/articles/Pricing-Models-on-StockX',
        description: 'StockX（ストックエックス）は、株取引のような値動きシステムを取り入れた世界最大の「スニーカー＆ストリートカルチャーの株式市場」です。リアルタイムで適正価格が変動し、厳格な鑑定を経た本物だけが売買される圧倒的な信用度があります。'
    },
    {
        slug: 'browns-fashion',
        shipping_guide: 'BROWNS公式の「Delivery Returns」によれば、FARFETCHグループの配送網を通じて、日本に対する国際的な配送を提供しています。',
        shipping_url: 'https://www.brownsfashion.com/uk/customer-service/shipping',
        tax_guide: '「Duties and Taxes」の案内によれば、表示価格に関税を全て含んだDDPの決済ができるため、後払いの面倒な計算はありません。',
        tax_url: 'https://www.brownsfashion.com/uk/customer-service/taxes-and-duties',
        fee_guide: '一定額以上の購入によって定額送料や送料無料が適用される仕組みがあり、最短約3営業日という迅速な配送スケジュールが明記されています。',
        fee_url: 'https://www.brownsfashion.com/uk/customer-service/shipping',
        description: 'BROWNS（ブラウンズ）は、ロンドンにおいて1970年代から長きにわたって最先端のデザイナーズブランドを発掘・発信し続ける老舗かつ先鋭的なセレクトショップです。FARFETCH傘下になりさらに強力なオンラインプラットフォームとなりました。'
    },
    {
        slug: 'svd',
        shipping_guide: 'SVD（sivasdescalzo）の公式「Shipping」ページに明記の通り、バルセロナ等のスペインの店舗から日本へのグローバルな配送に対応しています。',
        shipping_url: 'https://www.sivasdescalzo.com/en/help/shipping',
        tax_guide: '公式規約によれば、EU外への買い物は免除価格となりますが、日本に届く際には配送業者を通じて16,666円のボーダー以上に関税の支払いが別途発生する（DDU）ルールです。',
        tax_url: null,
        fee_guide: '公式配送料のEU外の項目によれば、約25€〜30€の配送料（Fedex等を利用）で日本へ発送され、通常3〜7営業日で到着すると案内されています。',
        fee_url: 'https://www.sivasdescalzo.com/en/help/shipping',
        description: 'SVD（sivasdescalzo）は、スペイン・バルセロナとマドリードに実店舗を持つ非常に人気のストリート・スニーカー・セレクトショップです。限定品の抽選販売（Raffle）が有名で、世界中のスニーカーヘッズから熱狂的に支持されています。'
    },
    {
        slug: 'bstn',
        shipping_guide: 'BSTN公式サイトのヘルプ「Shipping costs & delivery times」により、DHLやFedExを使った日本宛ての国際配送オプションが完備されています。',
        shipping_url: 'https://www.bstn.com/uk_en/customer-service/shipping-delivery',
        tax_guide: '公式の配送条件（Terms & Conditions）に基づき、関税と消費税はチェックアウト時に含まれない（DDU）ため、到着時に別途支払う心づもりが必要です。最新のルールは公式サイトでご確認ください。',
        tax_url: null,
        fee_guide: '公式の計算表によれば、日本への通常配送料は一律約39.99ユーロ（購入ごとに変動確認）で、おおむね1〜2週間程度で安全に配達されると表示されています。',
        fee_url: 'https://www.bstn.com/uk_en/customer-service/shipping-delivery',
        description: 'BSTN（ビースティン）は、ドイツ・ミュンヘンから始まったプレミアムなスポーツウェアとスニーカーのセレクトショップです。他の店では手に入らない独自のコラボレーションアパレルや限定モデルも展開しています。'
    },
    {
        slug: 'italist',
        shipping_guide: 'italist公式「Shipping & Delivery」のポリシーにより、DHLのエクスプレスネットワークを通じた世界規模（日本含む）の直送が行われています。',
        shipping_url: 'https://www.italist.com/en/shipping-and-return-policy/',
        tax_guide: '公式の「Customs & Duties」条項に記載の通り、日本などの仕向け先に対してDDP（関税込み）で計算および決済されるため、スムーズに商品を受け取ることができます。',
        tax_url: 'https://www.italist.com/en/customs-import-fees-duties-taxes/',
        fee_guide: '「Free Express Shipping」が基本設定されることもありながら、無料でない場合は一律の手数料・配送料が表示され、イタリアから約2〜4日営業日で手元に届く仕組みです。',
        fee_url: 'https://www.italist.com/en/shipping-and-return-policy/',
        description: 'italist（イタリスト）は、現地のイタリアにある独立したブティックの膨大な在庫をオンラインでまとめ、本国のブティックに並んでいるままの（現地の安い）価格で購入することができる革新的なファッションサイトです。'
    },
    {
        slug: 'hbx',
        shipping_guide: 'HBX公式「FAQ & Support」の配送情報に基づき、香港のウェアハウスから日本国内への迅速な直送に完全対応しています。',
        shipping_url: 'https://hbx.com/faq',
        tax_guide: '公式の関税案内によれば、商品代金に輸入関税などを全て含めたDDP価格がチェックアウト時に反映されるため、受け取り時に支払うことはありません。',
        tax_url: 'https://hbx.com/faq',
        fee_guide: '日本への指定配送料はUSD $15（一定金額以上の購入で無料キャンペーンなどもあり）で、アジア地域からの発送のため約3〜5日と短期間で届く旨が案内されています。',
        fee_url: 'https://hbx.com/faq',
        description: 'HBX（エイチビーエックス）は、世界的に有名なストリート＆カルチャーメディア「Hypebeast（ハイプビースト）」が運営するオンラインストアです。アート、デザイン、ストリートカルチャーの目線で厳選された約200の注目ブランドが集まっています。'
    },
    {
        slug: 'garmentory',
        shipping_guide: 'Garmentoryの公式「International Orders」ヘルプに明記の通り、独立したブティックからそれぞれのポリシーに則り日本への国際発送が行われます。',
        shipping_url: 'https://www.garmentory.com/pages/shipping-and-returns',
        tax_guide: '公式購入規約の通り、税金や輸入関税についてはチェックアウト時の計算には含まれておらず、商品到着時に支払う必要があります（DDU）。',
        tax_url: 'https://www.garmentory.com/pages/shipping-and-returns',
        fee_guide: '公式設定で、一部のブティックでは「500ドル以上で送料無料」などの特典があり、それ以外は約30ドル〜の設定で発送されると説明されています。',
        fee_url: 'https://www.garmentory.com/pages/shipping-and-returns',
        description: 'Garmentory（ガーメントリー）は、世界中（主に北米）の数千を超える独立系の人気ブティックと新進気鋭のデザイナーズブランドを１箇所に集めたユニークなマーケットプレイスです。他では到底見つからない唯一無二の衣服や生活雑貨に出会えます。'
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
