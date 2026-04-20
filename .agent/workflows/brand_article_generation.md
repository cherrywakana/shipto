---
description: ブランド別SEO記事の自動生成・執筆・投稿ワークフロー（高品質アイキャッチ・ショップ画像対応）
---

# ブランド別SEO記事の自動生成フロー (Ver 5.1 - AI EyeCatch & Shop UI)

このワークフローは、高品質な本文執筆に加え、AIによるフォトリアルなアイキャッチ画像の生成、および各ショップの信頼性を高めるUIスクリーンショットの埋め込みを統合した手順書です。

---

## Step 1: バックログの確認
// turbo
```bash
npm run build-article-backlog
```
- `tmp/article-factory/backlog.json` からターゲットブランドを選定。

---

## Step 2: 構成案（Brief）と素材（Draft）の生成
// turbo
```bash
npm run create-article-brief -- --brand-slug [BRAND_SLUG]
npm run generate-article-draft -- --brand-slug [BRAND_SLUG]
```

---

## Step 3: AIエージェントによる本文執筆
`tmp/article-factory/drafts/[slug].json` の `codexPrompt` を読み、HTMLを生成して `html` フィールドに書き込む。

### 執筆ルール (UI/UX強化):
- **形式**: 必ずHTML形式（`<h2>`, `<p>`, `<table>`, `<a>` 等）で構成する。
- **ショップ画像の埋め込み**: 各ショップの解説文の直下（CTAボタンの上）に、以下の形式でショップのスクリーンショット画像を挿入する。
  - **形式**: `<img src="https://ggmcgokdtmflioqezrqk.supabase.co/storage/v1/object/public/shop-thumbnails/[shop-slug].webp" alt="[Shop Name] 公式サイト" width="800" height="450" style="width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; border-radius: 8px; border: 1px solid #eee; margin-bottom: 12px;" />`
  - **Slugの確認**: DBまたは `brief.topShops` から正確な `slug` を取得すること。
- **内部リンク**: サイト内の関連記事（`/articles/[slug]`）へのリンクを少なくとも1つ含める（相対パス形式）。
- **禁止事項**: 「この記事では〜」といったメタ文章、DBにない情報の断定。

---

## Step 4: フォトリアルなアイキャッチの生成 (AI)
`generate_image` ツールを使用して、ブランドの世界観を表現したメイン画像を高品質に作成します。

1. **生成**: `[Brand Name] high-end photorealistic lifestyle photography, cinematic lighting, 16:9` などのプロンプトを使用。
2. **変換 (Python)**:
```bash
python3 -c "from PIL import Image; Image.open('public/images/articles/[slug].png').save('public/images/articles/[slug].webp', 'WEBP', quality=85)"
```
3. **アップロード**: `article-thumbnails` バケットへアップロード。

---

## Step 5: 投稿とバリデーション
// turbo
```bash
npm run publish-generated-article -- --brand-slug [BRAND_SLUG] --article-file tmp/article-factory/drafts/[slug].json
```
- 投稿スクリプトにより品質チェックが行われる。エラーが出た場合は本文を修正して再実行。

---

## Step 6: インデックス申請
// turbo
```bash
node scripts/google_indexing.js https://original-price.com/articles/[slug]
```
