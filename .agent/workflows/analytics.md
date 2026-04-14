---
description: [アクセス解析（GA4）の設定・管理手順]
---
# アクセス解析（Google Analytics 4）

このプロジェクトでは、GA4を使用してアクセス解析を行っています。

## 設定方法

1.  **環境変数の設定**
    `.env.local` に以下のキーを追加し、Google Analytics の測定ID（G-XXXXXXXXXX）を設定します。
    ```env
    NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
    ```

2.  **実装の詳細**
    `app/layout.tsx` で `@next/third-parties/google` を使用して読み込んでいます。環境変数が設定されている場合のみ、トラッキングコードが挿入されます。

## メンテナンス

- 測定IDを変更する場合は、`.env.local`（ローカル環境）および Vercel 等のデプロイ環境の環境変数を更新してください。
- カスタムイベントの計測が必要な場合は、`@next/third-parties/google` の `sendGAEvent` 関数を使用してください。
