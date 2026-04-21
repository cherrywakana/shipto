---
description: ブランド別SEO記事の自動生成・執筆・投稿ワークフロー（自動画像移行・品質保証対応）
---

# ブランド別SEO記事の自動生成フロー (Ver 6.2 - Revenue & Asset Migration)

このワークフローは、特定のファッション・スポーツブランドにフォーカスし、ユーザー満足度と収益性を最大化させるための手順書です。

## Step 1: バックログ選定とショップ戦略（収益性優先）
1. **バックログ確認**: `npm run build-article-backlog` でターゲット選定。
2. **ショップ選定戦略（IMPORTANT）**:
   - そのブランドを取り扱うショップの中から、**アフィリエイト報酬（収益性）が発生するショップを記事冒頭の目立つ位置で紹介**する。
   - 収益性がないショップは、選択肢を広げるための補完として中盤以降に配置する。
   - **リンクの生存確認**: 主要ショップのURLが正常に日本からアクセス可能か、事前にブラウザで確認する。
3. **素材生成**: `npm run create-article-brief` および `npm run generate-article-draft` を実行。

---

## Step 2: 記事専用アイキャッチ画像の準備
1. **メイン画像生成（MANDATORY）**: `generate_image` を使用して、ブランドの世界観を表現する高品質画像を生成。WebP形式。
   - ルール: ショップのロゴやUI画像の流用禁止。

---

## Step 3: AI執筆と収益化・SEO品質ルール
`tmp/article-factory/drafts/[slug].json` の `html` を編集。

### 執筆ルール (UI/UX & 収益最大化):
- **ショップ紹介の黄金順序**:
  1. ショップ名（`<h3>`）
  2. 生成画像（`<img>`）
  3. 具体的な解説文（関税、配送の専門的な体験談）
  4. 公式サイトへのCTAボタン（アフィリエイトリンク優先）
  5. ショップ個別詳細への内部リンク（「ショップ詳細：[ショップ名]のガイド」）
- **外部リンク仕様**: 全商用リンクには必ず **`target='_blank' rel='noopener'`** を付与する。
- **内部リンク**:
  - 紹介した各ショップの個別ページ（`/shops/`）への誘導。
  - ブランド一覧ページ（`/brands/`）への誘導。
- **品質基準**: 本文 **2200文字以上**、`<h2>` 見出し **5つ以上**。

---

## Step 4: 投稿（自動ストレージ移行）
```bash
npm run publish-generated-article -- --brand-slug [BRAND_SLUG] --article-file [DRAFT_PATH]
```

## Step 5: インデックス申請
```bash
npm run submit-indexing -- https://original-price.com/articles/[slug]
```
