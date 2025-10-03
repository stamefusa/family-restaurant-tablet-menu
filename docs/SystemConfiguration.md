# SystemConfiguration.md

## 1. 全体像
- **利用端末**：iPad（横画面固定、ホーム画面追加により全画面利用）  
- **フロントエンド**：Next.js（React 19, Next.js 15）によるSPA／PWA  
- **バックエンド**：Next.js Route Handler（Edge Functionも可）  
- **生成AI接続**：バックエンドからOpenAI Images API等を呼び出す（プロキシAPI）  
- **ローカルストレージ**：IndexedDB（Dexie等利用）でオリジナルメニュー画像・かご状態を保持  
- **キャッシュ**：Service WorkerによるApp Shellキャッシュ  

## 2. クライアント構成（iPad側）
### UI/UX
- **画面**
  - メニュー一覧画面
  - 注文確認画面
  - （任意）トップページ
- **右列固定ボタン**（注文かご以外はダミー）
- **オリジナルメニュータブ**（生成AI経由で追加）

### フロント技術
- Next.js + React 19
- Tailwind CSS + shadcn/ui（UI構築）
- IndexedDB（Dexieライブラリ推奨）
  - 注文かご
  - オリジナルメニュー（最大30件）

### PWA要素
- `manifest.json` → standaloneモード、横画面固定
- Service Worker  
  - App Shell（HTML/JS/CSS/アイコン）をキャッシュ  
  - オフラインでも基本UIが立ち上がる  
- ホーム画面に追加 → 全画面化

## 3. サーバ構成（Next.js API）
- **役割**：生成AIのプロキシAPI
- **エンドポイント例**：`/api/generate`
  - 入力：メニュー名
  - 出力：生成画像（base64またはURL）
- **処理**  
  1. バリデーション（入力長さ、禁止ワード等）  
  2. プロンプト整形  
  3. OpenAI Images API呼び出し  
  4. 結果をフロントに返却  
- **セキュリティ**  
  - APIキーは環境変数で保持  
  - クライアントには渡さない  

## 4. データフロー
1. iPad（フロント）で店舗・カテゴリ・メニューを操作 → 表示UI更新  
2. 「注文に追加」 → ローカル状態（IndexedDB）に保存、右列バッジ更新  
3. 注文確認画面 → IndexedDBの内容を一覧表示 → 削除・確定処理  
4. 確定 → モーダル表示後、IndexedDBのかごをクリア  
5. 「オリジナルメニュー追加」 → `/api/generate` にリクエスト → サーバ経由で生成AIへ → base64画像を受信しIndexedDBに保存  
6. IndexedDBが8件を超えた場合、最古の1件を削除  

## 5. 開発・運用環境
- **開発**：ローカルでNext.jsアプリを起動、モックAPIでテスト  
- **デプロイ**：VercelやNetlify（Edge Functions利用可能）  
- **運用**：家庭内利用が前提のため、ログ・認証は最小限  

## 6. システム構成図（テキスト表現）

```
 ┌──────────────────────────┐
 │          iPad (PWA)         │
 │ ┌────────────────────────┐ │
 │ │ Next.js SPA (React)      │ │
 │ │ - メニュー一覧 / 注文確認 │ │
 │ │ - 右列固定ボタン          │ │
 │ │ - オリジナル追加UI        │ │
 │ └───────────┬────────┘ │
 │              │ IndexedDB        │
 │              │ (かご,画像最大30)│
 │ ┌───────────▼────────┐ │
 │ │ Service Worker            │ │
 │ │ - App Shell キャッシュ     │ │
 │ │ - オフラインUI提供         │ │
 │ └────────────────────────┘ │
 └──────────────────────────┘
                │ HTTPS
 ┌──────────────────────────┐
 │ Next.js Backend (API)    │
 │ - /api/generate          │
 │ - APIキー保持             │
 └───────────┬────────────┘
             │ HTTPS
 ┌──────────────────────────┐
 │  OpenAI Images API       │
 │  (画像生成モデル)          │
 └──────────────────────────┘
```

## 7. 認証（Vercel + Next.js Middleware / Basic認証）
### 方針
- Next.jsの **Middleware** で全ルートを保護し、ユーザー名・パスワードは **Vercelの環境変数** で管理します。  
- **PWA必須ファイル（manifest・アイコン・sw.js・_next/static）** は認証除外にして、ホーム追加と更新を円滑にします。  
- `/api/generate` などアプリ本体のパスは保護対象のままにします。

### 環境変数（Vercel → Project Settings → Environment Variables）
- `BASIC_USER`：ログインユーザー名（例：`stamefusa`）
- `BASIC_PASS`：強固なパスワード
- `OPENAI_API_KEY`：画像生成用APIキー（既存）

### Middleware 実装例
```ts
// middleware.ts
import { NextResponse } from 'next/server';

const EXCLUDE_PATHS = [
  '/manifest.json',
  '/sw.js',
  '/favicon.ico',
  '/icons/',
  '/_next/static/',
];

export function middleware(req: Request) {
  const url = new URL(req.url);
  if (EXCLUDE_PATHS.some((p) => url.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const header = (req as any).headers.get('authorization') as string | null;
  const decode = (b64: string) => {
    try {
      // Edge Runtime互換のbase64デコード
      return typeof atob !== 'undefined' ? atob(b64) : Buffer.from(b64, 'base64').toString('utf-8');
    } catch {
      return '';
    }
  };

  if (header?.startsWith('Basic ')) {
    const [user, pass] = decode(header.split(' ')[1] || '').split(':');
    if (user === process.env.BASIC_USER && pass === process.env.BASIC_PASS) {
      return NextResponse.next();
    }
  }

  return new NextResponse('Auth Required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
  });
}

export const config = { matcher: '/:path*' };
```

### 動作確認
1. 初回アクセス時にベーシック認証ダイアログが表示され、正しい資格情報で通過できる。  
2. その後、**ホーム画面追加 → standalone起動**で全画面表示可能。  
3. 一度認証を通過し、SWがApp Shellをキャッシュ済みなら、**オフライン起動**も可能。  
4. `/api/generate` は保護対象のため、第三者によるAPI直叩きの抑止に有効。

### 運用注意
- パスワードは長く複雑にし、VercelのEnv更新でローテーション。  
- リポジトリに認証情報を置かない（`.env.local` もコミットしない）。  
- さらに厳格にするなら **Vercelのプロジェクト保護**（Dashboard側のPassword Protection）も併用可。
