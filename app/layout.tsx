import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SidebarButtons } from "@/components/sidebar-buttons";
import { OrientationGuard } from "@/components/orientation-guard";
import { PWARegister } from "@/components/pwa-register";

export const metadata: Metadata = {
  title: "ファミリーレストラン タブレットメニュー",
  description: "家庭用iPadでファミレスのタブレット注文体験を再現",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "タブレットメニュー",
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <PWARegister />
        <OrientationGuard>
          <div className="relative min-h-screen">
            {/* メインコンテンツ（右側にマージン） */}
            <div className="pr-24">
              {children}
            </div>

            {/* 右列固定ボタン */}
            <SidebarButtons />
          </div>
        </OrientationGuard>
      </body>
    </html>
  );
}