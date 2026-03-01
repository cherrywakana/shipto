---
description: note×Amazonアソシエイト自律最適化サイクルの実行
---

このワークフローは、システムの中心となる「収集・分析・決定・実行・学習」のサイクルを回すための手順です。

// turbo
1. 最新データの収集
`npm run collect`

2. パフォーマンス分析と戦略策定
`npm run analyze`

3. 記事生成と投稿
`npm run execute`

4. 実行結果の記録と学習
`npm run learn`

## 監視項目
- `data/logs/` の最新ログを確認し、エラーが出ていないかチェックする。
- SQLiteデータベース内の `performance_logs` テーブルを確認する。
