# CLAUDE.md

このファイルは Claude Code (claude.ai/code) がこのリポジトリで作業する際のガイダンスを提供します。

## プロジェクト概要

**task-board** — React + Vite で構築されたタスクボードアプリ。タスクの追加・完了切り替え・削除ができ、localStorage でデータを永続化する。

## デプロイ先

https://masa4542.github.io/task-board/

ローカル開発サーバー: `http://localhost:5173`

## 技術スタック

- **React 18** — UIコンポーネント・状態管理（`useState` / `useEffect`）
- **Vite 5** — ビルドツール・開発サーバー
- **CSS3** — コンポーネントごとのスタイル（`App.css`）
- **localStorage** — タスクデータの永続化
- **gh-pages** — GitHub Pages へのデプロイ

## 開発コマンド

```bash
# 依存パッケージのインストール
npm install

# 開発サーバー起動（ホットリロードあり）
npm run dev

# プロダクションビルド（dist/ に出力）
npm run build

# GitHub Pages へデプロイ（build → gh-pages ブランチへ push）
npm run deploy
```

## アーキテクチャ

### ファイル構成

```
task-board/
├── CLAUDE.md
├── index.html              # Vite エントリーポイント
├── vite.config.js          # base: '/task-board/' を設定
├── package.json
└── src/
    ├── main.jsx            # ReactDOM.createRoot のマウント
    ├── App.jsx             # メインコンポーネント（状態・ロジック）
    └── App.css             # スタイル定義
```

### 状態管理

`App.jsx` 内で `useState` を使い、タスク一覧（`tasks`）と入力テキスト（`inputText`）を管理する。

```js
// タスクの型
{ id: number, text: string, completed: boolean }
```

`useEffect` で `tasks` の変化を監視し、`localStorage` へ自動保存する。初期値は `localStorage` から復元する。

### コンポーネント構成

現時点では単一コンポーネント構成。機能追加でコンポーネントを分割する場合は `src/components/` ディレクトリに配置する。

## コンポーネント命名規約

| 対象 | 規約 | 例 |
|---|---|---|
| コンポーネントファイル | PascalCase + `.jsx` | `TaskItem.jsx` |
| コンポーネント関数 | PascalCase | `function TaskItem()` |
| CSS クラス | kebab-case | `.task-item`, `.delete-btn` |
| state 変数 | camelCase | `inputText`, `tasks` |
| イベントハンドラ | `handle` + 動詞 | `handleKeyDown`, `handleSubmit` |

## コーディング規約

- インデントは **スペース2文字**
- セミコロンあり
- `const` / `let` を使用し、`var` は使わない
- コメントは日本語で記述する
- コンポーネントは関数宣言（`function` キーワード）で定義する

## Git 運用ルール

**コードを変更するたびに、必ずコミットしてGitHubへプッシュする。**

### 手順

1. 変更をステージング
   ```bash
   git add <変更したファイル>
   ```

2. 変更内容を簡潔に表すコミットメッセージでコミット
   ```bash
   git commit -m "変更内容の説明"
   ```

3. `main` ブランチへプッシュ
   ```bash
   git push origin main
   ```

### コミットメッセージ規約

- 日本語で記述する
- 変更の種別を先頭に付ける：
  - `feat:` — 新機能追加
  - `fix:` — バグ修正
  - `style:` — スタイル変更（機能に影響なし）
  - `refactor:` — リファクタリング
  - `docs:` — ドキュメント変更

例：`feat: タイマー機能を追加`、`fix: スコア計算のバグを修正`

### 注意事項

- `--no-verify` でフックをスキップしない
- `git push --force` は使わない
- コミット前に `git diff` で変更内容を確認する
