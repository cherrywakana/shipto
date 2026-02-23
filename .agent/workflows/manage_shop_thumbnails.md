---
description: [ショップサムネイルの作成・登録手順]
---
# ショップサムネイル管理ワークフロー

このワークフローは、ショップの公式サイトからスクリーンショットを撮影し、最適化（WebP変換）してストレージへアップロードし、データベースに反映させる手順です。

## Step 1: スクリーンショットの撮影
ブラウザエージェントを使用して、公式サイトのファーストビューを撮影します。

1. `scripts/temp_assets/` ディレクトリを作成（なければ）。
2. ブラウザエージェントに以下のタスクを依頼します：
   - 「[ショップURL]にアクセスし、クッキーバナー等を閉じた後、上半分のスクリーンショットを [slug].png として撮影して」
3. 撮影されたファイルを `scripts/temp_assets/` に配置します。

## Step 2: 画像の最適化 (WebP変換)
読み込み速度向上のため、PNGをWebP形式に変換します。

// turbo
```bash
cwebp scripts/temp_assets/[slug].png -o scripts/temp_assets/[slug].webp
```

## Step 3: ストレージへのアップロードとDB反映
作成した `scripts/upload_thumbnails.js` を利用します。

1. `scripts/upload_thumbnails.js` の `shops` 配列に対象の `slug` と `filePath` を追記します。
2. 以下のコマンドを実行します。
// turbo
```bash
node scripts/upload_thumbnails.js
```
※ 環境変数（`NEXT_PUBLIC_SUPABASE_URL`等）が必要です。

## Step 4: 後片付け
アップロードが完了したら、`scripts/temp_assets/` 内の一時ファイルを削除してクリーンな状態に保ちます。

## 注意事項
- ストレージのバケット名は `shop-thumbnails` です。
- ブラウザエージェントが直接プロジェクトディレクトリに保存できない場合は、提示されたパスから `cp` コマンドでコピーしてください。
