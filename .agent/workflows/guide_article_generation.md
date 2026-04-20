---
description: カテゴリ別ガイド記事やハウツー記事の自動生成・投稿手順
---

# ガイド・特集記事の自動生成フロー (Ver 2.0)

このワークフローは、特定のブランドに限定されない「おすすめショップ10選」や「スニーカー海外通販ガイド」などの記事を生成・投稿するための手順書です。

## Step 1: 記事テーマの選定とDB抽出
1. **ショップ選定**: DBからテーマ（例：メンズ、スニーカー）に合致するショップを抽出します。
2. **構成案（Brief）の作成**: `scripts/create_article_brief.js` のロジックを参考に、AIが手動またはカスタムスクリプトで構成案を作成します。

---

## Step 2: 執筆素材（Draft）の生成
カテゴリガイド用の特別なスラッグ（例：`luxury-mens-shopping-guide`）が決まったら、Draftファイルを作成します。

```bash
# カスタムBriefファイルがある場合
npm run generate-article-draft -- --brief tmp/article-factory/custom-guide-brief.json
```

---

## Step 3: AIエージェントによる本文執筆
`tmp/article-factory/drafts/[slug].json` の指示に従い執筆します。

### 執筆ルール:
- **タイトル**: 読者の悩みを解決するキャッチーなものにする。
- **内部リンク**: 関連するブランドガイドへのリンクを積極的に貼る。
- **形式**: HTML形式。

---

## Step 4: 投稿と画像生成
// turbo
```bash
npm run publish-generated-article -- --article-file tmp/article-factory/drafts/[slug].json
```
- このスクリプトにより、アイキャッチ生成とSupabaseへの `category: "ガイド"` での登録が行われます。

---

## Step 5: インデックス申請とリンク設置
1. **Google申請**:
   ```bash
   node scripts/google_indexing.js https://original-price.com/articles/[your-slug]
   ```
2. **ナビゲーション追加**: `app/guide/page.tsx` の適切なカテゴリセクションに新着記事を追加し、ユーザーが見つけられるようにします。
