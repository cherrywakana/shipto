---
description: カテゴリ別ガイド記事やハウツー記事の自動生成・投稿手順
---

# ガイド・特集記事の自動生成フロー (Ver 3.1 - Mega Guide Standard)

このワークフローは、「おすすめショップ12選」や「海外通販完全ガイド」など、特定のブランドに限定されないメガガイド記事を生成・投稿するための手順書です。

## Step 1: 記事テーマの選定とBriefの作成
1. **テーマ決定**: ターゲットキーワード（例：`海外通販 自転車 おすすめ`）を決定。
2. **構成案（Brief）の作成**: `tmp/article-factory/[slug]-brief.json` を作成。
   - `topShops`: 登場させるショップをDBから選定。
   - `secondaryKeywords`: SEOに必要な共起語を含める。
3. **リンクの生存確認（MANDATORY）**: 指定した全ショップの公式サイトURLを実際に開き、**403エラーが出ていないか、サイトが消失していないか** を100%確認する。問題がある場合はそのショップを構成から除外する。

---

## Step 2: 執筆素材（Draft）の生成と画像の準備
1. **Draft作成**:
   ```bash
   npm run generate-article-draft -- --brief tmp/article-factory/[slug]-brief.json
   ```
2. **アイキャッチ画像の生成（MANDATORY）**: `generate_image` を使用して、記事のテーマ（例：自転車海外通販の街並み、高級ファッションのブティックなど）に合わせた高品質なメイン画像を生成する。
   - **ルール**: ショップのロゴやUI画像をアイキャッチに流用することは禁止。常に記事固有のビジュアルを作成する。
   - すべて **WebP形式** に変換し、ローカルに保存。
3. **各ショップイメージの生成**: 同様に、紹介する各ショップごとの高品質イメージを個別に生成して保存する。

---

## Step 3: AIエージェントによる本文執筆
`tmp/article-factory/drafts/[slug].json` の `html` フィールドを編集します。

### 執筆・品質ルール（MANDATORY）:
- **文字数**: 純粋なテキストで **2200文字以上**（メガガイドは3500文字推奨）。
- **見出し**: `<h2>` セクションを **5つ以上** 配置。
- **ショップ紹介の黄金順序**:
  1. ショップ名（`<h3>`）
  2. 画像（`<img>`）：ローカルパスをそのまま記述。
  3. 解説文（`<p>`）：特徴、送料、安全性を具体的に記述。
  4. CTA（`<a>`）：`class='cta-button'` を付与し、さらに外部リンクには `target='_blank' rel='noopener'` を設定する。
- **内部リンク**:
  - `/shops/` (ショップ詳細) へのリンクを **3件以上**。
  - `/brands/` (ブランド一覧) へのリンクを **1件以上**。
- **構文**: JSONパースエラーを防ぐため、HTML属性には **シングルクォーツ（`'`）** を使用する。

---

## Step 4: 投稿と画像自動マイグレーション
// turbo
```bash
npm run publish-generated-article -- --brief [BRIEF_PATH] --article-file [DRAFT_PATH]
```
### スクリプトの自動処理:
- **画像自動移行**: 本文中の `<img> src`（ローカルパス）を自動で検出し、Supabase Storage に WebP としてアップロード。HTML内のパスを公開URLへ置換。

---

## Step 5: インデックス申請
```bash
npm run submit-indexing -- https://original-price.com/articles/[slug]
```
