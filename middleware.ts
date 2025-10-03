import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - manifest.json (PWA manifest)
     * - sw.js (service worker)
     * - icons/ (PWA icons)
     * - images/ (static images)
     */
    '/((?!_next/static|_next/image|manifest\\.json|sw\\.js|icons/|images/).*)',
  ],
};

export function middleware(request: NextRequest) {
  const basicAuth = request.headers.get('authorization');
  const url = request.nextUrl;

  // 環境変数から認証情報を取得
  const username = process.env.BASIC_USER;
  const password = process.env.BASIC_PASS;

  // 認証情報が設定されていない場合はスキップ
  if (!username || !password) {
    return NextResponse.next();
  }

  if (basicAuth) {
    const authValue = basicAuth.split(' ')[1];

    // Edge Runtime互換のデコード処理
    const [user, pwd] = atob(authValue).split(':');

    if (user === username && pwd === password) {
      return NextResponse.next();
    }
  }

  // 認証失敗時は401を返す
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  });
}
