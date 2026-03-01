---
description: [ショップの新規登録・情報更新・サムネイル管理の統合手順]
---
# ショップ管理プログラム（登録・更新・サムネイル・アフィリエイト）

この手順書は、ショップの新規登録から、配送情報の調査、サムネイル画像の設定、アフィリエイト同期、自律サイクルへの組み込みまでをすべて網羅した統合ワークフローです。

## Step 1: 事前調査と重複チェック
新しいショップを追加、または既存情報を更新する際の最初のステップです。

1. **重複チェック（最優先）**
   - Supabaseの `shops` テーブルを `slug`, `url`, `name` で検索し、既に登録されていないか 100% 確認します。
   - 登録済みの場合は、既存レコードの「更新（UPDATE）」として進めます。
2. **アフィリエイト（Skimlinks）提携の確認**
   - `docs/assets/skimlinks_merchants.csv` を参照し、ドメインが一致するか確認します。
   - 含まれていれば `is_affiliate: true`、なければ `false` と判定します。
3. **基本情報の整理**
   - ショップ名（日本語/英語）、公式サイトURL、発送元国、カテゴリ（ストリート、ラグジュアリー等）、概要（description）をまとめます。

## Step 2: 日本向け配送・関税・送料の公式調査
公式サイトのヘルプページ等を自律的に調査し、正確な日本語解説を作成します。

1. **日本発送ガイド（shipping_guide）**
   - 日本への直送可否、配送業者（DHL, FedEx等）、配送期間。
2. **関税ガイド（tax_guide）**
   - **DDP（関税込み）**: 支払い総額に含まれ、受け取り時の追加支払いなし。
   - **DDU（関税後払い）**: 受け取り時に日本の関税・消費税・通関手数料がかかる。
3. **送料ガイド（fee_guide）**
   - 日本向けの送料体系（固定料金、重量制、無料配送条件など）。
4. **公式URL（shipping_url, tax_url, fee_url）**
   - 調査の根拠となったヘルプページURLを記録します。

## Step 3: ショップサムネイルの設定（詳細）
サイトの雰囲気を伝えるため、ロゴではなく「公式サイトの現在のトップビュー」をサムネイルとして登録します。

### 1. スクリーンショットの撮影
- ブラウザエージェントを使用し、解像度 **1200x800** で公式サイトのトップ画面（ファーストビュー）を撮影します。
- 余計なボタンやスクロールバーが入らないように注意し、`scripts/assets/[slug].png` として保存します。

### 2. 次世代形式（WebP）への変換と最適化
表示速度を最大化するため、PNGからWebPへ変換し、リサイズと圧縮を行います。
// turbo
```bash
ffmpeg -i scripts/assets/[slug].png -vf "scale=1200:-1" -c:v libwebp -quality 80 scripts/assets/[slug].webp
```

### 3. ストレージへのアップロード
専用スクリプトを使用して、画像を Supabase Storage の `shop-thumbnails` バケットへアップロードします。
// turbo
```bash
node scripts/upload_thumbnails.js
```
※ `scripts/assets/` 内にあるWebPファイルが自動的にアップロード対象となります。

## Step 4: データベースへの反映とキャッシュバスター
情報の保存と、画像の即時反映のためのキャッシュ対策を行います。

### 1. キャッシュバスターの適用（重要）
- `shops` テーブルの `image_url` を更新する際、URLの末尾に必ず現在のタイムスタンプを付与します。
- 例: `https://.../shop-thumbnails/end.webp?t=1772410000000`
- これにより、ブラウザやCDNのキャッシュにより古い画像が表示され続けるのを防ぎ、更新が即座に反映されます。

### 2. データの登録・更新
- Step 1-2 で用意した全テキスト情報と、Step 3 の画像URLを合わせて Supabase の `shops` テーブルに保存します。

## Step 5: 自律サイクル（Collector）への組み込み（URLパターンの記録）
各ショップの「ブランド一覧ページ」や「検索結果ページ」のURL構造を記録することで、ブランドの取り扱い状況を自動的に巡回・収集できるようになります。

### 1. URLパターンの特定
ブラウザで実際にそのショップのブランドページ（例: NIKE, Adidasなど）を表示し、URLがどのようなルールで生成されているかを確認します。
- 固定部分: `https://www.example.com/brands/`
- ブランド名部分: `nike`, `adidas-originals` など（ブランドスラッグ）

### 2. `SHOP_RULES` への追記
`scripts/autonomous_collector.js` の最初の方にある `SHOP_RULES` オブジェクトに、特定したパターンを関数として追加します。

```javascript
// 例：新しいショップ "MyShop" を追加する場合
'my-shop': (slug) => `https://www.myshop.com/designers/${slug}`,
```

### 3. 現在登録済みの主なパターン（参考）
現在、以下のショップについてURLパターンが「記憶」されています。
- **SSENSE**: `/ja-jp/men/designers/${slug}`
- **Farfetch**: `/jp/shopping/men/${slug}/items.aspx`
- **END.**: `/jp/brands/${slug}`
- **Stadium Goods**: `/en-jp/shopping/${slug}`
- **Bodega**: `/collections/${slug}`
- **Musinsa**: `/global.musinsa.com/jp/brands/${slug}` (※追加予定)

これにより、一度設定すれば「どのページを見に行けばいいか」をプログラムが自動的に判断し、毎日のデータ収集（`npm run collect-brands`）に自動で組み込まれます。

## メンテナンス: アフィリエイト一括同期
提携リスト（CSV）が更新された際は、以下のコマンドで全ショップのステータスを同期できます。

// turbo
```bash
npm run sync-affiliates
```

---

> [!IMPORTANT]
> **クリーンアップ**：作業完了後は、`scripts/assets/` 内の一時的なPNG、WebPファイルを直ちに削除し、リポジトリを整理してください。
