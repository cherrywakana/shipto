---
description: [ショップサムネイルの作成・登録手順]
---
# ショップサムネイル管理ワークフロー

このワークフローは、ショップの公式サイトからスクリーンショットを撮影し、最適化（WebP変換）してストレージへアップロードし、データベースに反映させる手順です。

## Step 1: スクリーンショットの撮影
ブラウザエージェントを使用して、公式サイトのファーストビューを撮影します。

1. `scripts/assets/` ディレクトリを使用します。
2. ブラウザエージェント等で公式サイトのスクリーンショットを [slug].png として撮影します。
3. 撮影されたファイルを `scripts/assets/` に配置します。

## Step 2: 画像の最適化 (WebP変換)
読み込み速度向上のため、PNGをWebP形式に変換します。

// turbo
```bash
cwebp scripts/assets/[slug].png -o scripts/assets/[slug].webp
```

## Step 3: ストレージへのアップロードとDB反映
作成した `scripts/upload_thumbnails.js` を利用します。

1. `scripts/upload_thumbnails.js` の `shops` 配列に対象の `slug` と `filePath` を追記します。
2. 以下のコマンドを実行します。
// turbo
```bash
npm run upload-thumbnails
```
※ 環境変数（`NEXT_PUBLIC_SUPABASE_URL`等）が必要です。

## Step 4: 後片付け
アップロードが完了したら、`scripts/assets/` 内の一時ファイルを削除して整理してください。

## 注意事項
- ストレージのバケット名は `shop-thumbnails` です。
- ブラウザエージェントが直接プロジェクトディレクトリに保存できない場合は、提示されたパスから `cp` コマンドでコピーしてください。
