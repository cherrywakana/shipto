---
description: [アフィリエイト情報の同期手順]
---
# アフィリエイト情報の同期ワークフロー

このワークフローは、`docs/assets/skimlinks_merchants.csv` の情報に基づいて、データベース内の全ショップの `is_affiliate` フラグを一括更新する手順です。CSVファイルが更新された際などに実行します。

## 実行手順

1. **環境変数の確認**
   `.env.local` に `NEXT_PUBLIC_SUPABASE_URL` と `NEXT_PUBLIC_SUPABASE_ANON_KEY` が設定されていることを確認します。

2. **同期スクリプトの実行**
// turbo
   以下のコマンドをプロジェクトルートで実行します。
   ```bash
   node scripts/sync_affiliates.js
   ```

3. **実行結果の確認**
   ターミナルに出力されるログを確認します。
   - `✅ Affiliate: [ショップ名]` : 一致するドメインが見つかり、フラグが立てられた
   - `⚪ Non-Affiliate: [ショップ名]` : 一致するドメインがなく、フラグが外された

4. **GitHubへの反映**
   データベースの更新は即時反映されますが、スクリプトやCSVに変更を加えた場合は GitHub にプッシュしてください。

## 注意事項
- このスクリプトはドメインの完全一致（wwwなどは除く）で判定します。誤判定がある場合は `scripts/sync_affiliates.js` の正規化ロジックを確認してください。
