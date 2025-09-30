import type { Metadata } from "next";
import "./globals.css";
import { SidebarButtons } from "@/components/sidebar-buttons";
import { OrientationGuard } from "@/components/orientation-guard";

export const metadata: Metadata = {
  title: "ファミリーレストラン タブレットメニュー",
  description: "家庭用iPadでファミレスのタブレット注文体験を再現",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
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