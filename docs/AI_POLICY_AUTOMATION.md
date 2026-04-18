# Policy Automation

## 目的

人手レビューなしで、ショップごとの `日本発送` `関税` `送料` の根拠URLと説明文をできるだけ自動で埋める。  
外部LLM APIは使わず、ローカルのルールベース抽出だけで回す。

## 実装

スクリプト:

```bash
npm run verify-shop-policies
```

ファイル:

- `scripts/verify_shop_policies.js`

## 必要な環境変数

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 動き

1. `shops` テーブルから対象ショップを取る
2. 公式トップページと内部リンク候補を収集する
3. 配送・関税・送料に関係しそうなページ候補を取得する
4. 取得した本文をローカルのルールで判定する
5. 次を `shops` に保存する

- `shipping_guide`
- `tax_guide`
- `fee_guide`
- `shipping_url`
- `tax_url`
- `fee_url`

6. 実行レポートを `tmp/shop-policy-verifier/` に保存する

## 実行例

全体を上位10件だけ:

```bash
npm run verify-shop-policies
```

1ショップだけ:

```bash
npm run verify-shop-policies -- --slug farfetch
```

件数を増やす:

```bash
npm run verify-shop-policies -- --limit 30
```

保存せず確認だけ:

```bash
npm run verify-shop-policies -- --slug farfetch --dry-run
```

## 判定ルール

- 公式ドメイン内のページ候補だけを使う
- `Japan` `international` `shipping` `duty` `tax` `cost` などのキーワードでスコアリングする
- 一番強い文を根拠として採用する
- 日本向け情報が弱い場合は `unknown` のまま残す

## 注意

- 完全な意味理解ではなく、ルールベース抽出
- スキーマ差分で `shipping_url` などの更新に失敗した場合は、説明文だけ保存するフォールバックを入れている
