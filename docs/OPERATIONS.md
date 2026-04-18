# Operations Guide

## 基本ルール

- 変更したら原則コミットする
- 本番反映が必要な変更は、コミット後に必ず `main` へ push する
- 「まだ本番に出したくない」と明示されたときだけ push しない

## 用語

- `commit`: このPCの git 履歴に変更を保存する
- `push`: 保存した変更を GitHub に送る
- `main`: 本番反映の基準ブランチ

通常は、`main` への `push` が本番反映のきっかけになります。

## 通常の手順

1. 変更内容を確認する

```bash
git status --short
git diff
```

2. 今回の修正に関係するファイルだけを追加する

```bash
git add <file1> <file2> ...
```

3. コミットする

```bash
git commit -m "変更内容がわかるメッセージ"
```

4. `main` に push する

```bash
git push origin main
```

## Codex に依頼するときの前提

- Codex が変更したら、原則コミットまで行う
- 本番反映が必要な変更は、原則 push まで行う
- 関係ない未追跡ファイルや別作業の変更は、勝手に混ぜない

## 反映されているか確認する方法

```bash
git status --short --branch
```

確認ポイント:

- `ahead 1` のように出ていれば、ローカルだけで GitHub にはまだ送っていない
- `nothing to commit` かつ `ahead` がなければ、少なくとも git 上では push 済み

## リモートURL

現在の案内では、GitHub の移転先は次です。

```bash
https://github.com/cherrywakana/directfound.git
```

必要なら remote を更新します。

```bash
git remote set-url origin https://github.com/cherrywakana/directfound.git
```
