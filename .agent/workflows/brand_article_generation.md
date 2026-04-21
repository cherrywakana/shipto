---
description: ブランド別SEO記事の自動生成・執筆・投稿ワークフロー（自動画像移行・品質保証対応）
---

# ブランド別SEO記事の自動生成フロー (Ver 6.1 - Auto Asset Migration)

このワークフローは、高品質な本文執筆に加え、AI生成画像の自動永続化、および厳格なSEO品質基準を統合したブランド記事専用の手順書です。

## Step 1: バックログ選定と素材生成
1. **バックログ確認**: `npm run build-article-backlog` でターゲット選定。
   - **リンクの生存確認**: 選定時に主要ショップのURLが正常に日本からアクセス可能か、事前にブラウザで確認する。
2. **素材生成**:
   ```bash
   npm run create-article-brief -- --brand-slug [BRAND_SLUG]
   npm run generate-article-draft -- --brand-slug [BRAND_SLUG]
   ```

---

## Step 2: 記事専用アイキャッチ画像の準備
1. **メイン画像生成（MANDATORY）**: `generate_image` を使用して、ブランドの世界観を表現する高品質・フォトリアルな画像を生成する。
   - **禁止ルール**: ショップのサイトスクリーンショットやロゴ画像をアイキャッチに流用してはならない。必ず記事のテーマに沿ったビジュアルを新造すること。
2. **フォーマット**: `.webp` 形式で保存。
3. **ローカル保持**: 現在のパス（例：`brain/.../image.webp`）を控えておく。

---

## Step 3: AIエージェントによる本文執筆
`tmp/article-factory/drafts/[slug].json` の `html` フィールドを編集します。

### 執筆ルール (UI/UX向上):
- **ショップ・構造**: 「名前（`<h3>`）→ 画像（`<img>`）→ 説明文 → CTAボタン」の順序を遵守。
- **CTAリンク**: 外部リンクには必ず `target='_blank' rel='noopener'` を付与する。
- **画像パス**: `<img> src` には **ローカルの画像パス** をそのまま記述する。
- **品質基準**:
  - 本文 **2200文字以上**。
  - `<h2>` 見出し **5つ以上**。
  - ブランドページ（`/brands/`）への自演リンクを必ず含む。
- **HTML構文**: JSONパースエラー防止のため、属性は **シングルクォーツ（`'`）** を使用。

---

## Step 4: 投稿（自動ストレージ移行）
// turbo
```bash
npm run publish-generated-article -- --brand-slug [BRAND_SLUG] --article-file [DRAFT_PATH]
```
### 自動処理の内容:
- **Image Migration**: 本文中の `<img>` および `thumbnailUrl` がローカルパスの場合、自動的に Supabase Storage にアップロード。

---

## Step 5: インデックス申請
```bash
npm run submit-indexing -- https://original-price.com/articles/[slug]
```
Google Search Console に即座にクロールを依頼し、検索結果への早期反映を図ります。
