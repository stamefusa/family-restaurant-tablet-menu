# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

家庭用iPadでファミレスのタブレット注文体験を再現するデモWebサイト。実際の注文・決済は行わず、UI/UXの体験を提供。

## Tech Stack

- **Frontend**: Next.js 15 + React 19 (SPA/PWA)
- **Backend**: Next.js Route Handler (Edge Functions)
- **Styling**: Tailwind CSS + shadcn/ui
- **Storage**: IndexedDB (Dexie推奨) - 注文かご・オリジナルメニュー画像(最大8件)
- **AI Integration**: OpenAI Images API (proxy経由)
- **PWA**: Service Worker (App Shell cache)
- **Deployment**: Vercel/Netlify

## Architecture

### Frontend (iPad Client)
- **画面構成**:
  - メニュー一覧画面: 上段=店舗タブ、下段=カテゴリタブ、メイン=選択カテゴリの4メニューを2×2グリッド表示
  - メニュー詳細画面: 選択メニューを大きく表示、「注文に追加」ボタン、戻るボタン
  - 注文確認画面: かご一覧、削除・数量編集、注文確定
  - 右列固定ボタン: 注文かご(実動)、他はダミー
  - オリジナルタブ: 生成AI経由でメニュー追加（999円固定）

- **データフロー**:
  1. メニュー追加 → IndexedDB保存 → バッジ更新
  2. 注文確定 → モーダル表示 → かごクリア
  3. オリジナル追加 → `/api/generate` → base64画像をIndexedDB保存(最大8件、最古削除)

- **PWA要件**:
  - `manifest.json`: `display: "standalone"`, `orientation: "landscape"`
  - Service Worker: App Shellキャッシュ、オフライン対応
  - ホーム画面追加で全画面化

### Backend API
- **`/api/generate`**:
  - 入力: メニュー名
  - 処理: バリデーション → プロンプト整形 → OpenAI Images API呼び出し
  - 出力: base64画像
  - セキュリティ: APIキーは環境変数(`OPENAI_API_KEY`)

### Authentication
- **Next.js Middleware** で全ルート保護
- Basic認証: 環境変数 `BASIC_USER`, `BASIC_PASS` (Vercel設定)
- 除外パス: `/manifest.json`, `/sw.js`, `/icons/`, `/_next/static/`
- Edge Runtime互換のbase64デコード実装が必要

## Key Constraints

- **横画面固定**: 縦画面時は「横画面にしてください」オーバーレイ表示
- **オリジナルメニュー**: IndexedDBに最大8件、9件目で最古削除
- **対象デバイス**: iPad (10-13インチ)、Safari/Chrome最新版
- **パフォーマンス**: 主要操作は100ms以内応答目標

## Data Model

```typescript
// stores: { id, name, items: [{ id, name, price, image, category }] }
// cart: { items: [{ itemId, name, unitPrice, qty, image }] }
// original: { items: [{ id, name, image(base64), createdAt }] }
```

**重要な変更**: カテゴリは各メニューアイテムの属性として保持。下段タブにはカテゴリを表示し、メイン画面では選択カテゴリの4メニューを2×2グリッド表示。メニューカード押下でメニュー詳細画面に遷移する。

## Development Notes

- IndexedDBアクセスはDexieライブラリ推奨
- Service Workerでstale-while-revalidate戦略
- 環境変数は`.env.local`で管理、コミット禁止
- Vercel環境変数: `BASIC_USER`, `BASIC_PASS`, `OPENAI_API_KEY`
- Edge Runtime使用時はNode.js APIに注意(`Buffer`の代わりに`atob`使用)