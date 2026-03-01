---
description: [サイトのリブランディング・名称変更の手順]
---
# サイトブランディング更新ワークフロー

サイト名やドメインが変更された場合、以下の箇所を更新します。

## 1. メタデータとSEO設定
- `app/layout.tsx`
  - `metadata.title`
  - `metadata.description`
  - `metadataBase` (new URL)
  - `openGraph.url`
  - `openGraph.siteName`

## 2. ロゴと共通コンポーネント
- `components/Header.tsx` (ロゴテキストとスタイル)
- `components/Footer.tsx` (コピーライトとロゴ)

## 3. プロジェクト設定
- `package.json` (`name` フィールド)
- `README.md` (プロジェクト名と説明)

## 4. ビジュアルアセット
- `app/icon.svg` (ファビコン)
- 必要に応じてロゴ画像等の更新

## 5. 全体検索
- 旧サイト名（例: `ShipToJP`）や旧ドメインで全体検索を行い、残骸がないか確認する。
