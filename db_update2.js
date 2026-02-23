const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const html = `<h2>ASOS（エイソス）とは？</h2>
<p>ASOS（エイソス）は、イギリスのロンドンで2000年に設立された世界最大級のオンラインファッションストアです。「セレクト・トレンド」のカテゴリに属し、最新の流行を取り入れたトレンドアイテムを幅広く展開しています。ASOS 海外通販は日本からも簡単に利用でき、世界中の若者から絶大な支持を得ています。</p>

<h2>ASOSの特徴</h2>
<h3>圧倒的な取扱ブランド数とトレンドを牽引する品揃え</h3>
<p>ASOSは常時数万点以上のアイテムを揃え、800以上ものブランドを取り扱っています。NikeやThe North Faceなどの人気ブランドはもちろん、ASOS独自のプライベートブランド「ASOS DESIGN」も非常に人気です。最新のランウェイトレンドをいち早く取り入れたデザイン性の高いアイテムが手に入ります。日本未上陸のインディーブランドや限定コラボアイテムも豊富に扱っているため、国内では見つからない個性的な一着に出会えます。</p>

<h3>明朗な送料設定と日本への配送</h3>
<p>ASOS 日本発送は、一定金額以上の購入で標準配送の送料が無料になるため、コストを抑えて買い物が可能です。イギリスから日本への配送日数の目安は通常10〜14日程度となっており、お急ぎの場合は有料のエクスプレス便への変更も可能です。関税に関しては価格に含まれていないため、免税ラインを超える購入や特定素材の商品の場合は、受け取り時に別途関税や消費税を支払う必要があります。</p>

<h2>ASOSのおすすめポイント</h2>
<ul>
  <li><strong>幅広いサイズ展開から自分に合う一着を選べる</strong>：PETITE（低身長向け）やTALL（高身長向け）、CURVEなど、あらゆる体型にフィットする洋服が揃っています。</li>
  <li><strong>他では買えないASOS限定のアイテムが手に入る</strong>：人気ブランドとの独占コラボモデルや、日本未発売の限定品を購入できます。</li>
  <li><strong>お得なプロモーションを利用できる</strong>：期間限定のセールや割引コードが頻繁に発行されるため、定価よりさらにお得にトレンドアイテムを揃えられます。</li>
</ul>

<h2>まとめ</h2>
<p>ASOSは、イギリスが誇る巨大なトレンドファッションのプラットフォームであり、日本からでも手軽に最新のスタイルをお得に獲得できます。手頃な価格で個性的なファッションを楽しみたい方や、国内では手に入らないアイテムを探している方に非常におすすめです。</p>

<p><a href="https://www.asos.com/" target="_blank" rel="noopener noreferrer">ASOS（エイソス）を見てみる →</a></p>`;

async function run() {
    const { error: updateError } = await supabase.from('posts').update({
        title: 'ASOS（エイソス）とは？日本発送や関税・送料を徹底解説',
        content: html,
        thumbnail_url: 'https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/asos.webp',
        category: 'ショップ紹介'
    }).eq('slug', 'asos-guide');

    if (updateError) {
        console.error('Update Error:', updateError);
    } else {
        console.log('Successfully updated asos-guide');

        // Delete the temporary asos-japan-guide to avoid duplicates
        const { error: deleteError } = await supabase.from('posts').delete().eq('slug', 'asos-japan-guide');
        if (!deleteError) {
            console.log('Successfully deleted the duplicate asos-japan-guide');
        }
    }
}
run();
