const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const CTA_BUTTON = `
<div style="text-align: center; margin: 30px 0;">
  <a href="https://www.hyperlitemountaingear.com/" target="_blank" rel="noopener noreferrer" style="background: #000; color: #fff; padding: 15px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.1rem; display: inline-block; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">HMG 公式サイトはこちら →</a>
</div>
`;

const content = `
<p>ウルトラライト（UL）ハイキングを志す者なら誰もが一度は憧れるブランド、<strong>Hyperlite Mountain Gear（ハイパーライトマウンテンギア、通称HMG）</strong>。Dyneema®（ダイニーマ）素材を惜しみなく使用した白いバックパックは、その圧倒的なクールさと驚異的な耐久性で世界中のハイカーを虜にしています。</p>

<p>しかし、日本国内で購入しようとすると、在庫がなかったり、驚くほど高価だったりすることもしばしば。そこで最も賢い選択肢となるのが<strong>「公式サイトからの個人輸入」</strong>です。</p>

<p>この記事では、2026年最新のラインナップ情報を踏まえ、HMG公式サイトでの買い方、英語住所の書き方、気になる関税や送料まで、SEO第1位を狙う「日本一詳しいガイド」として徹底解説します。</p>

<div style="background:#f0f7ff; border-left: 5px solid #007bff; padding: 20px; margin: 30px 0; border-radius: 8px;">
    <p style="margin:0; font-weight:bold; color:#0056b3;">🚀 2026年最新アップデート：モデル名が変わりました！</p>
    <p style="margin:10px 0 0 0; font-size:0.95rem;">従来の「2400（40L相当）」や「3400（55L相当）」といった呼び名は、現在はシンプルに<strong>「40L」「55L」</strong>という表記に統一されています。購入時に迷わないよう注意しましょう。</p>
</div>

<h2>HMGを公式サイトから個人輸入する3つのメリット</h2>

<h3>1. 国内価格より30%〜40%は安く買える</h3>
<p>為替にもよりますが、国内のセレクトショップ価格と比べると、個人輸入の方が圧倒的に安くなります。関税と送料を差し引いても、数万円単位で節約できるケースがほとんどです。</p>

<h3>2. モデル・サイズ・カラーの在庫が完璧</h3>
<p>国内ショップでは「ホワイトはあるけどブラックがない」「Mサイズだけ完売」といったことがよくあります。公式サイトなら、最新の「UNBOUND」シリーズも含め、全てのラインナップから自分にぴったりの1点を選べます。</p>

<h3>3. 公式サイト限定のセールやクーポンがある</h3>
<p>ブラックフライデーやシーズンオフ等、公式サイトのみで開催されるセールがあります。また、メールマガジン登録で初回割引クーポンがもらえることも多いです。</p>

${CTA_BUTTON}

<hr>

<h2>【徹底比較】HMGの主要モデル、どれを選ぶべき？</h2>
<p>HMGには似たような見た目のバックパックがいくつかあります。それぞれの特徴を整理しました。</p>

<div style="overflow-x: auto;">
<table>
  <thead>
    <tr>
      <th>モデル名</th>
      <th>外ポケット素材</th>
      <th>特徴・用途</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Southwest (サウスウェスト)</strong></td>
      <td>ソリッド（布）</td>
      <td><strong>一番人気。</strong> 藪漕ぎや岩場でも破れない最強の耐久性。中身が見えないのでパッキングが雑でも綺麗に見えます。</td>
    </tr>
    <tr>
      <td><strong>Junction (ジャンクション)</strong></td>
      <td>メッシュ＋ソリッド</td>
      <td>サイドは耐久性の高いソリッド、フロントは濡れたテントを乾かせるメッシュ。最もバランスが良いモデル。</td>
    </tr>
    <tr>
      <td><strong>Unbound (アンバウンド)</strong></td>
      <td>ストレッチメッシュ</td>
      <td><strong>最新のハイカー特化型。</strong> 唯一ボトムポケットがあり、荷物を下ろさずに行動食を取り出せます。</td>
    </tr>
    <tr>
      <td><strong>Windrider (ウィンドライダー)</strong></td>
      <td>全面メッシュ</td>
      <td>HMGの原点。通気性が良く、濡れたものを外に雑に放り込める北米ハイカーの定番。</td>
    </tr>
  </tbody>
</table>
</div>

<p><strong>迷ったら？：</strong>日本の登山道は枝や岩が多いので、耐久性重視の<strong>「Southwest」</strong>、もしくは最新の機能性を備えた<strong>「Unbound」</strong>が特におすすめです。容量は、数泊の登山までこなせる<strong>「55L」</strong>を選んでおけば間違いありません。100%防水（シーム処理推奨）のDyneema素材は、雨の多い日本の登山にも最適です。</p>

${CTA_BUTTON}

<hr>

<h2>【画像不要でわかる】HMG公式サイトでの注文手順</h2>

<h3>STEP 1: 商品を選んでカートに入れる</h3>
<p>公式サイト（<a href="https://www.hyperlitemountaingear.com/" target="_blank">hyperlitemountaingear.com</a>）へアクセスし、モデル・容量・サイズ・カラーを選びます。
特に<strong>サイズ（Torso Size）</strong>は重要です。自分の背面長を測り、境界線の場合は上のサイズを選ぶのがHMGのセオリーです。</p>

<h3>STEP 2: 配送先住所を入力（英語表記）</h3>
<p>ここが最大の難関ですが、以下のルールを守れば簡単です。
例：東京都港区六本木1-2-3 ハイツABC 101号室の場合</p>
<ul>
  <li><strong>First Name:</strong> 太郎 (Taro)</li>
  <li><strong>Last Name:</strong> 山田 (Yamada)</li>
  <li><strong>Address:</strong> 1-2-3 Roppongi, Heights ABC 101</li>
  <li><strong>City:</strong> Minato-ku</li>
  <li><strong>Country/Region:</strong> Japan</li>
  <li><strong>Province:</strong> Tokyo</li>
  <li><strong>Postal Code:</strong> 106-0032</li>
  <li><strong>Phone:</strong> 090...（最初の0を取って+81を付けるのが正式ですが、090...のままでも届きます）</li>
</ul>

<h3>STEP 3: 配送方法の選択</h3>
<p>通常はFedExやUPSが表示されます。送料は$60〜$90程度かかることが多いですが、追跡も完璧で数日で日本に届きます。</p>

<h3>STEP 4: 支払い（PayPalを強く推奨）</h3>
<p>クレジットカード入力も可能ですが、<strong>PayPal</strong>が使えるならPayPalが一番安全です。万が一の不着や初期不良の際、PayPalが仲介してくれる「買い手保護制度」があるためです。</p>

<hr>

<h2>気になる「送料・関税」は総額いくら？</h2>

<p>個人輸入で避けて通れないのが関税です。HMGは<strong>DDU（関税後払い）</strong>方式です。</p>

<div style="background:#fff9db; padding:20px; border-radius:8px; border:1px solid #fab005;">
  <p style="margin:0; font-weight:bold;">💰 支払い総額の目安（55Lバックパックの場合）</p>
  <ul style="margin:10px 0 0 0;">
    <li>商品代金：約$395（約62,000円）</li>
    <li>送料：約$70（約11,000円）</li>
    <li>関税・消費税（到着時に支払い）：約8,000円〜10,000円</li>
  </ul>
  <p style="margin:10px 0 0 0; font-weight:bold;">合計：約80,000円〜83,000円</p>
</div>

<p>日本国内の相場が10万円〜11万円程度であることを考えると、<strong>2万円以上安く購入できる</strong>計算になります。</p>
<p><small>※為替レート1ドル=155円、関税・消費税を商品価格の約60%に対して計算。正確な金額は通関士の判断によります。</small></p>

<hr>

<h2>よくある質問（FAQ）</h2>

<p><strong>Q. 日本語で問い合わせできますか？</strong><br>
A. 基本は英語のみです。しかし、Google翻訳があれば全く問題ありません。カスタムサービスは非常に親切で、返信も早いです。</p>

<p><strong>Q. 届くまで何日かかりますか？</strong><br>
A. 在庫があれば、発送から3〜7営業日程度で届きます。アメリカからとは思えないほど爆速です。</p>

<p><strong>Q. 返品はできますか？</strong><br>
A. 可能ですが、アメリカへの返送料が自己負担になるため、あまり現実的ではありません。サイズ選びだけは慎重に行いましょう。</p>

<hr>

<h2>まとめ：HMGを手にするなら個人輸入が後悔しない！</h2>

<p>Hyperlite Mountain Gearのバックパックは、一度使うとその背負い心地とタフさに驚かされます。一度手にすれば、その軽さと白さの虜になるはずです。</p>

<p>公式サイトからの個人輸入は、最初は勇気がいりますが、一度やってみれば驚くほど簡単です。浮いたお金で、次はHMGのStuff SackやWindriderを買ってみてはいかがでしょうか？</p>

<div style="text-align: center; margin: 40px 0;">
  <a href="https://www.hyperlitemountaingear.com/" target="_blank" rel="noopener noreferrer" style="background: #000; color: #fff; padding: 18px 50px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 1.2rem; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.2);">HMG公式サイトで最新ギアをチェック →</a>
</div>
`;

async function publish() {
    const { error } = await supabase.from('posts').update({
        title: 'Hyperlite Mountain Gear (HMG) 個人輸入完全ガイド｜公式サイトでの買い方・関税・送料を2026年最新版で徹底解説',
        content: content,
        category: 'ガイド'
    }).eq('slug', 'outdoorbrand/hyperlite-mountain-gear/manual');

    if (error) {
        console.error('Error Publishing:', error.message);
    } else {
        console.log('SUCCESS: HMG Manual updated with more CTA buttons.');
    }
}

publish();
