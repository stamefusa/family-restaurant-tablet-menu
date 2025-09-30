"use client";

import { useEffect, useState } from 'react';

export function OrientationGuard({ children }: { children: React.ReactNode }) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      // 縦画面（ポートレート）かどうかをチェック
      const portrait = window.innerHeight > window.innerWidth;
      setIsPortrait(portrait);
    };

    // 初回チェック
    checkOrientation();

    // リサイズイベントでチェック
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  if (isPortrait) {
    return (
      <div className="fixed inset-0 bg-gray-900 flex items-center justify-center z-[9999]">
        <div className="text-center text-white p-8">
          <div className="text-8xl mb-8">📱 → 🔄</div>
          <h1 className="text-3xl font-bold mb-4">横画面にしてください</h1>
          <p className="text-xl text-gray-300">
            このアプリは横画面（ランドスケープ）でご利用ください
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}