# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

家庭用iPadでファミレスのタブレット注文体験を再現するデモWebサイト。実際の注文・決済は行わず、UI/UXの体験を提供。

## Tech Stack

- **Frontend**: Next.js 15 + React 19 (SPA/PWA)
- **Styling**: Tailwind CSS + shadcn/ui
- **Storage**: IndexedDB (Dexie推奨) - 注文かご
- **PWA**: Service Worker (App Shell cache)
- **Deployment**: Vercel/Netlify

## Architecture

### Frontend (iPad Client)
- **画面構成**:
  - メニュー一覧画面: 上段=店舗タブ、下段=カテゴリタブ、メイン=選択カテゴリの4メニューを2×2グリッド表示
    - グリッド左右にページネーションボタン（前のページ/次のページ）
    - カテゴリ内およびカテゴリ間でページ移動可能（循環）
  - メニュー詳細画面: 選択メニューを大きく表示、「注文に追加」ボタン、戻るボタン
  - 注文確認画面: かご一覧、削除・数量編集、注文確定
  - 右列固定ボタン: 注文かご(実動)、他はダミー

- **データフロー**:
  1. メニュー追加 → IndexedDB保存 → バッジ更新
  2. 注文確定 → モーダル表示 → かごクリア

- **PWA要件**:
  - `manifest.json`: `display: "standalone"`, `orientation: "landscape"`
  - Service Worker: App Shellキャッシュ、オフライン対応
  - ホーム画面追加で全画面化

## Key Constraints

- **横画面固定**: 縦画面時は「横画面にしてください」オーバーレイ表示
- **対象デバイス**: iPad (10-13インチ)、Safari/Chrome最新版
- **パフォーマンス**: 主要操作は100ms以内応答目標

## Data Model

```typescript
// stores: { id, name, items: [{ id, name, price, image, category }] }
// cart: { items: [{ itemId, name, unitPrice, qty, image }] }
```

**重要な変更**: カテゴリは各メニューアイテムの属性として保持。下段タブにはカテゴリを表示し、メイン画面では選択カテゴリの4メニューを2×2グリッド表示。グリッド左右にページネーションボタンを配置し、カテゴリ内/カテゴリ間でページ移動可能（循環）。メニューカード押下でメニュー詳細画面に遷移する。

## Development Notes

- IndexedDBアクセスはDexieライブラリ推奨
- Service Workerでstale-while-revalidate戦略
- 環境変数は`.env.local`で管理、コミット禁止