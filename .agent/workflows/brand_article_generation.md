---
description: ブランド別SEO記事の自動生成とSupabase(DB)への直接登録手順
---

# ブランド別SEO記事の生成・投稿ワークフロー (Ver 3.0 - SEOファースト)

このワークフローは、「ブランド名＋海外通販」で検索1位を獲得するための、SEOに最適化されたブランド別ガイド記事を生成・投稿するための手順書です。

> [!IMPORTANT]
> **ターゲット読者**: 「海外通販でそのブランドが買えることは知っているが、具体的にどのサイトが一番安全で使いやすいか」を探し求めている中級者以上のユーザー。

---

## Step 0: 競合調査 (必須・新設)
記事の構成を決める前に、必ず競合上位記事を調査し「何をどう書けば勝てるか」を把握する。

1. 「ブランド名 海外通販」「ブランド名 個人輸入」でGoogle検索し、上位5記事を確認
2. 以下の項目を記録する:
   - 掲載ショップ数（→ **必ず上回る**）
   - 記事の文字数（→ **同等以上を目指す**）
   - 比較テーブルの有無
   - 独自コンテンツの有無（価格比較、購入手順スクリーンショット等）
3. 競合にない独自の差別化ポイントを1つ以上設計する

> [!TIP]
> 主要な競合サイト: `original-price.com`（ナイキ10選、アディダス14選を掲載）。ショップ数と網羅性で勝負している。

---

## Step 1: DBデータ抽出 (推測の排除)
AIの知識ではなく **DBの現在値のみ** を唯一の情報源とする。

```bash
export $(cat .env.local | xargs) && node -e '
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function getShops() {
    const { data: brand } = await supabase.from("brands").select("id").eq("slug", "[BRAND_SLUG]").single();
    const { data: shops } = await supabase
        .from("shop_brands")
        .select("shop_id, brand_url, shops(name, slug, popularity_score, is_affiliate)")
        .eq("brand_id", brand.id)
        .neq("status", "not_found");
    console.log(JSON.stringify(shops.sort((a, b) => b.shops.popularity_score - a.shops.popularity_score), null, 2));
}
getShops();'
```

- **掲載ショップ数**: 競合を上回る **6〜8件（最低5件）** を選定
- `is_affiliate: true` を優先しつつ `popularity_score` 順で選定
- 紹介可能ショップが5件未満の場合のみ、その旨を記事内で誠実に伝える

---

## Step 2: SEOメタ情報の設計
技術的SEOは `generateMetadata` が自動出力するが、タイトルとスラッグの設計は人間が行う。

- **`title`**: 30〜40文字。冒頭に「ブランド名」と「海外通販」or「個人輸入」を配置
- **バリエーション**: 全記事で同じパターンにしない。以下を使い分ける:
  - 比較型: 「【最新比較】New Balanceの安く買える海外通販サイトはどこ？」
  - ガイド型: 「Nikeの個人輸入ならここ。安さ・品揃え・信頼性で選ぶおすすめショップ」
  - 決定版型: 「Stone Island海外通販まとめ。正規品を扱う優良店を厳選」
- **`slug`**: `[brand]-overseas-shopping-guide` の形式（既存踏襲）

---

## Step 3: 記事コンテンツの執筆ルール
目標文字数: **5,000〜8,000文字**。情報量で競合を圧倒する。

### 3-1. 記事構成（この順番を厳守）

```
1. 導入（3〜5行）
2. ショップ個別紹介（6〜8件）
3. ★ ショップ比較テーブル（一覧表）← 位置変更
4. 個人輸入の実践ガイド（関税・サイズ・偽物対策）
5. まとめ（タイプ別おすすめ）
```

### 3-2. ショップ個別紹介
各ショップの紹介は以下のフォーマットで統一:
- `<h3>` で見出し（「1. ショップ名」）
- 直後にショップ画像（`<a>` でリンク付き）
- 紹介文 3〜5行: **そのブランドにおけるこのショップの独自の強み** を具体的に
- 中央寄せCTAボタン（「[ショップ名]をチェック」）

### 3-3. ★ ショップ比較テーブル（新設・差別化の核）
個別のショップ紹介の直後に、全ショップの一覧比較表を配置する。

```html
<table style="width:100%; border-collapse:collapse; margin:30px 0; font-size: 0.9rem;">
  <thead>
    <tr style="background:#f1f5f9;">
      <th style="padding:12px; text-align:left; border-bottom:2px solid #e2e8f0;">ショップ名</th>
      <th style="padding:12px; text-align:center; border-bottom:2px solid #e2e8f0;">日本語対応</th>
      <th style="padding:12px; text-align:center; border-bottom:2px solid #e2e8f0;">関税込み</th>
      <th style="padding:12px; text-align:left; border-bottom:2px solid #e2e8f0;">特徴</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:12px; border-bottom:1px solid #e2e8f0;">SSENSE</td>
      <td style="padding:12px; text-align:center; border-bottom:1px solid #e2e8f0;">◎</td>
      <td style="padding:12px; text-align:center; border-bottom:1px solid #e2e8f0;">○</td>
      <td style="padding:12px; border-bottom:1px solid #e2e8f0;">品揃え・価格共に最強</td>
    </tr>
    <!-- 他のショップも同様に -->
  </tbody>
</table>
<p style="font-size: 0.8rem; color: #666; margin-top: -20px;">※最新のサービス内容、関税対応、在庫状況は必ず各公式サイトにてご確認ください。</p>
```

### 3-4. 見出し設計（目次自動生成のため）
記事内の見出しは **必ず `<h2>` と `<h3>` を使用する**。
- `<h2>`: 大セクション（「おすすめショップ一覧」「個人輸入ガイド」「まとめ」等）
- `<h3>`: 個別ショップ名、ガイドのサブトピック
- **理由**: サイトが自動で目次を生成し、Google検索結果に見出しジャンプリンクが表示される

### 3-5. 内部リンク戦略（SEO回遊率向上）
記事内に以下への内部リンクを **最低2箇所** 自然に埋め込む:
- `/shops/[shop-slug]`: 紹介したショップの個別ページ
- `/brands/[brand-slug]`: そのブランドの商品一覧ページ
- `/guide`: 海外通販ガイドページ
- 関連する他のブランド記事（例：Nike記事内でAdidas記事にリンク）

### 3-6. スタイル・禁止事項
- **強調の禁止**: `<strong>` や `<b>` を一切使用しない
- **メタ表現の禁止**: 以下のような「システム側」「運営側」の視点を絶対に書かない
  - 「Google検索1位を狙う」「SEO」「インデックス」などの検索エンジン対策への言及
  - 「DB」「データベース」「アフィリエイト」「人気スコア」などの内部データへの言及
  - 「AI」「自動生成」など生成プロセスへの言及
- **キーワードの自然配置**: 「海外通販」「個人輸入」を各1回以上、自然に文中に溶け込ませる（ユーザー目線を徹底する）

---

## Step 4: ビジュアルと投稿

1. **アイキャッチ生成**: `generate_image` でブランドの世界観を表現した16:9画像を生成
2. **投稿**: `scripts/manage_articles.js` の `publishArticle` 関数で投稿
   - **注意**: 画像ファイル名はタイムスタンプ付きの実際のファイル名を使用すること（`generate_image` の出力パスをそのまま渡す）

---

## Step 5: 公開後のSEO・表示確認 (追加)

記事公開直後に必ず以下の項目を確認し、問題があれば即座に修正する。

1. **DBのサムネイルURL確認**: `thumbnail_url` が `null` になっていないか、正しいバケット（`article-thumbnails`）を指しているか確認。
2. **Google Search Console でインデックス登録をリクエスト**（ユーザーに依頼）
3. **リンク切れチェック**: 内部リンクが正しく機能しているかブラウザで確認
4. **表示崩れチェック**: 比較テーブルや画像がモバイルでも正しく表示されているか確認

> [!WARNING]
> **サムネイル消失の注意**: リライト時に `publishArticle` を実行する際、`localImagePath` も `thumbnail_url` も指定し忘れると、スクリプトの不備により `null` で上書きされるリスクがあります。必ず既存のURLを引き継ぐか、新しい画像を指定してください。

---

## 年次リライトの指針
- Google Search Console のデータを元に、順位が低いKWの記事を優先的にリライト
- ショップの最新状況（閉店、新規オープン等）をDBで再確認
- 競合の最新記事を再調査し、情報量で常に上回る状態を維持
