# Original Price

Original Price は、日本から使いやすい海外通販ショップを紹介する Next.js サイトです。  
`shops` `brands` `posts` などのデータを Supabase から読み込み、ショップ一覧、ブランド一覧、記事ページを配信しています。

## 開発

開発サーバーの起動:

```bash
npm run dev
```

主な構成:

- `app/`: 公開ページ
- `lib/`: Supabase 接続や共通処理
- `scripts/`: データ収集・同期スクリプト
- `docs/`: 運用用データや手順書

## 運用ルール

このリポジトリでは、変更したら原則として次まで行います。

1. 変更内容を確認する
2. 必要なファイルだけ `git add` する
3. `git commit` する
4. `main` に `git push` する

本番反映が必要な通常の修正は、`push` まで終えてはじめて完了です。  
「まだ本番に出したくない」と明示された場合だけ、push を止めます。

詳しい手順は [docs/OPERATIONS.md](/Users/reona/projects/directfound/docs/OPERATIONS.md) を見てください。  
ショップ情報の確認ルールは [docs/SHOP_VERIFICATION.md](/Users/reona/projects/directfound/docs/SHOP_VERIFICATION.md) にまとめています。
