# Article Factory

検索流入を増やしつつ、最終的に加盟ショップへの送客と収益につなげるための記事量産フロー。

## 基本方針

狙うのは、`検索需要があり、かつ送客につながるキーワード`。

優先順位は次の順で考える。

1. ブランド名付きの商業意図
   例: `arc'teryx 安い 海外通販`
2. カテゴリの比較意図
   例: `ハイブランド 安い 海外通販`
3. 商品ジャンルの比較意図
   例: `スニーカー 海外通販 おすすめ`
4. 補助的な情報意図
   例: `海外通販 関税 送料`

このサイトでは、特に次が強い。

- `ブランド名 + 安い 海外通販`
- `ブランド名 + どこで買う`
- `ブランド名 + おすすめショップ`
- `カテゴリ名 + 海外通販 おすすめ`

## どんな記事を作るか

### 1. Brand Guide

最優先。収益ページになりやすい。

例:

- `Nike が安い海外通販サイトおすすめ7選`
- `Aesop が安い海外通販サイトおすすめ5選`

狙う検索意図:

- そのブランドを安く安全に買えるショップを知りたい

### 2. Category List

次点。比較意図が強く、内部リンクのハブにもなる。

例:

- `ハイブランドが安い海外通販おすすめショップ一覧`
- `アウトドア用品が安い海外通販おすすめショップ一覧`

狙う検索意図:

- カテゴリ全体で有力な通販先を比較したい

### 3. Refresh / Rewrite

すでに売上が出ている既存ページを更新する。

狙う検索意図:

- 既存の上位・収益ページを、より強い送客ページにする

## 記事フロー

### Step 1. backlog を作る

```bash
npm run build-article-backlog
```

出力先:

```bash
tmp/article-factory/
```

このスクリプトは次を見て優先順位を出す。

- `brands`
- `shop_brands`
- `posts`
- 直近の `Skimlinks page report`

評価に使う軸:

- そのブランドのガイドが未作成か
- 日本配送しやすいショップ数
- popularity の強さ
- 既存売上ページとの近さ

### Step 2. 1本分の brief を作る

```bash
npm run create-article-brief -- --brand-slug aesop
```

出力:

- primary keyword
- secondary keywords
- 見出し構成
- 内部リンク候補
- 上位ショップ候補

### Step 3. 公開する

Codex が本文を書いた後、そのまま `posts` に公開する場合:

```bash
npm run publish-generated-article -- --brand-slug nike --article-file tmp/article-factory/drafts/nike-overseas-shopping-guide.json
```

または:

```bash
npm run publish-generated-article -- --brief tmp/article-factory/nike-brief.json --article-file tmp/article-factory/drafts/nike-overseas-shopping-guide.json
```

このスクリプトは次を行う。

- brief を読む
- canonical target の重複を確認する
- Codex が書いた本文ファイルを読む
- 品質ゲートを通した本文だけを採用する
- 同じ slug の記事があれば更新、なければ新規公開する

### Step 4. draft を残したいときだけ本文を書く

Codex 執筆用の素材ファイルを作る場合:

```bash
npm run generate-article-draft -- --brand-slug nike
```

または:

```bash
npm run generate-article-draft -- --brief tmp/article-factory/nike-brief.json
```

出力先:

```bash
tmp/article-factory/drafts/
```

このファイルには次が入る。

- brief
- Codex 向け執筆プロンプト
- 品質チェック項目
- 公開に必要なメタ情報

Codex が本文を書くときは次を守る。

- 1スクロール以内で「おすすめショップ」と「向いている人」を見せる
- 各ショップ節の最後に CTA を置く
- 比較表のショップ名もそのまま遷移できるリンクにする
- 情報だけで終わらず、比較からクリックにつながる構成にする
- 送料・関税の説明は補足で、主役はショップ選びに置く
- DB の情報を材料にしつつ、本文は Codex が自然な日本語で書く
- テンプレ文の機械的な差し込みではなく、検索意図に沿った流れで構成する
- 記事の作り方を説明するメタ文は書かない
- 運営側の補足や読者への誘導説明ではなく、読者が知りたい情報そのものを書く

### Step 5. 補助フロー

## 重複制御

`1キーワードに1ページ` を守る。

ブランドガイドでは、canonical target を次で固定する。

```text
brand:<brand-slug>:cheap-overseas-shopping
```

たとえば `nike` の場合:

```text
brand:nike:cheap-overseas-shopping
```

`generate-article-draft` は次をチェックする。

- 既存 `posts` に同じ canonical target を持つページがあるか
- 既存 draft に同じ canonical target を持つページがあるか

別の slug で同じ target を取ろうとした場合は生成を止める。

つまり、次のような重複を防ぐ。

- `Nike 安い 海外通販`
- `Nike どこで買う`
- `Nike おすすめショップ`

これらを別ページで乱立させず、1本の強いページにまとめて育てる。

## SEO ルール

- タイトルは `ブランド名 + 安い + 海外通販` を基本にする
- 見出しに `おすすめ`, `比較`, `どこで買う`, `注意点` を入れる
- slug は短く、ブランド名中心にする
- 同じ意図の記事を乱立させない

## 品質担保ルール

- 記事本文は Codex が書く前提にする
- DB にない事実は書かない
- 比較表、ショップ別 CTA、内部リンクを必須にする
- 文字数、見出し数、外部リンク数、内部リンク数を機械チェックする
- テンプレ感や注意書き過多が出た場合は書き直す
- `この記事では` `〜ようにしています` のようなメタ文章が出た場合は書き直す

## 量産の優先順位

1. `未作成ブランドガイド`
2. `売上シグナルに近いブランドの更新`
3. `収益カテゴリの一覧記事`
4. `補助ガイド`

## 今後の運用

基本は次のサイクルで回す。

1. `npm run build-article-backlog`
2. 上位候補を 3〜5 本選ぶ
3. `npm run create-article-brief -- --brand-slug <slug>`
4. `npm run generate-article-draft -- --brand-slug <slug>`
5. Codex が `tmp/article-factory/drafts/<slug>.json` に本文HTMLを入れる
6. `npm run publish-generated-article -- --brand-slug <slug> --article-file tmp/article-factory/drafts/<slug>.json`
7. 内部リンクを追加

## 補足

計測基盤の構築は別トラックで進める。初期段階では、このフロー単体で回せることを優先する。
