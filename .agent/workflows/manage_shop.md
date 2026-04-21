---
description: [ショップの新規登録・情報更新の自動化手順]
---
# ショップ管理プログラム（登録・更新・調査）

この手順書は、ショップの新規登録から、AIによる配送情報の自動調査、アフィリエイト同期までを網羅した自動化ワークフローです。

## Step 1: 自動調査とショップ登録
新しく紹介したいショップを見つけたら、まず自動登録スクリプトを実行します。

// turbo
```bash
node scripts/register_new_shop.js --url [SHOP_HOME_URL] --name [SHOP_NAME] --category [CATEGORY]
```
- **処理内容**:
  1. ドメインから `slug` を自動生成。
  2. `verify_shop_policies.js` のロジックを使用して、日本発送ガイド、関税ガイド、送料ガイドを公式サイトから自動スクレイピング。
  3. `docs/assets/skimlinks_merchants.csv` と照合し、アフィリエイト提携状況を判定。
  4. すべての情報を `shops` テーブルに INSERT/UPSERT。

## Step 2: ショップ画像（サムネイル）の準備
ショップのロゴやスクショを `/Users/reona/projects/directfound/scripts/assets/shops/[slug].webp` に配置します。

// turbo
```bash
npm run sync-thumbnails
```
- これにより、Supabase StorageへのアップロードとDBの `image_url` 更新が自動で行われます。

## Step 3: 自動巡回（Collector）へのURLパターン登録
新ショップが扱っているブランドを自動検知するため、URLルールを追加します。

1. `scripts/autonomous_collector.js` の `SHOP_RULES` オブジェクトに1行追加。
   ```javascript
   'shop-slug': (slug) => `https://www.example.com/brands/${slug}`,
   ```
2. 以下のコマンドで巡回を実行し、取り扱いブランドを確定させます。
   ```bash
   node scripts/autonomous_collector.js
   ```

## Step 4: 記事生成への反映
ショップの登録が完了すると、`create_article_brief.js` や `generate_article_draft.js` のランキング候補に自動的に抽出されるようになります。

---

## メンテナンスコマンド
- **アフィリエイト一括同期**: `npm run sync-affiliates`
- **全ショップポリシー再調査**: `node scripts/verify_shop_policies.js --limit 100`

> [!IMPORTANT]
> **自動調査の限界**: AIによるスクレイピングが失敗した、あるいは確信度が低い（Confidence: low）場合は、DBの `shipping_guide` 等を直接編集して修正してください。
