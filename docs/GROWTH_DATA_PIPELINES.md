# Growth Data Pipelines

収益最大化のために、まず `GSC` と `Skimlinks` のデータを定期取得できる状態を作る。

## 1. Google Search Console

公式 API:

- [Search Console API Overview](https://developers.google.com/webmaster-tools/about)

このリポジトリでは次のスクリプトを使う。

```bash
npm run fetch-gsc
```

### 必要な環境変数

次のどれか 1 つの形でサービスアカウント認証を渡す。

- `GSC_SERVICE_ACCOUNT_KEY_PATH`
- `GSC_SERVICE_ACCOUNT_KEY_JSON`
- `GSC_SERVICE_ACCOUNT_CLIENT_EMAIL`
- `GSC_SERVICE_ACCOUNT_PRIVATE_KEY`

あわせて次も設定する。

- `GSC_SITE_URL`

例:

```bash
GSC_SITE_URL=sc-domain:original-price.com
GSC_SERVICE_ACCOUNT_KEY_PATH=secrets/gsc-service-account.json
```

### 重要

サービスアカウントを使う場合、その `client_email` を Search Console プロパティにユーザー追加しておく必要がある。

### 実行例

直近 28 日:

```bash
npm run fetch-gsc
```

日付指定:

```bash
npm run fetch-gsc -- --start-date 2026-03-01 --end-date 2026-03-31
```

次元指定:

```bash
npm run fetch-gsc -- --dimensions page,query,country --row-limit 500
```

### 出力先

```bash
tmp/growth-metrics/gsc/
```

## 2. Skimlinks

公式情報:

- [Reporting API](https://support.skimlinks.com/hc/en-us/articles/223835348-What-is-the-Reporting-API)
- [Datapipe](https://support.skimlinks.com/hc/en-us/articles/27518827796893-What-is-the-Datapipe)

このリポジトリでは次のスクリプトを使う。

```bash
npm run fetch-skimlinks
```

### 運用方針

Skimlinks は 2 通りで取得できるようにしている。

1. `csv` モード
   Publisher Hub から export した CSV を取り込む
2. `api` モード
   Reporting API の接続情報がある場合に API 取得する

認証情報や private docs が未整備の間は、まず `csv` モードで回してよい。

### CSV モード

```bash
npm run fetch-skimlinks -- --mode csv --input path/to/skimlinks-page-report.csv
```

または:

```bash
SKIMLINKS_EXPORT_PATH=path/to/skimlinks-page-report.csv
npm run fetch-skimlinks
```

### API モード

```bash
SKIMLINKS_REPORTING_API_URL=...
SKIMLINKS_API_KEY=...
```

必要に応じて次も設定できる。

- `SKIMLINKS_API_KEY_HEADER`
- `SKIMLINKS_API_KEY_PREFIX`
- `SKIMLINKS_REPORT_TIMEZONE`

実行例:

```bash
npm run fetch-skimlinks -- --mode api --report page --start-date 2026-03-01 --end-date 2026-03-31
```

### 出力先

```bash
tmp/growth-metrics/skimlinks/
```

## 3. 優先して見るべき粒度

最初は次を優先して取得する。

- GSC: `page,query`
- Skimlinks: `page`
- Skimlinks: `merchant`

この 3 つが揃うと、次の判断がしやすい。

- 流入があるのに稼げていないページ
- 稼げているのに流入が少ないページ
- 売上が出る merchant / category の傾向

## 4. 次の発展

基盤の次は、取得データを正規化して `Supabase` かローカル集計ファイルへ寄せる。

候補:

- `page x query x clicks` の GSC 日次蓄積
- `page x revenue x clicks x sales` の Skimlinks 日次蓄積
- `merchant x revenue` の Skimlinks 日次蓄積
