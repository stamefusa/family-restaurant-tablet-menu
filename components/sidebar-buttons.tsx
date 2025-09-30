"use client";

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { cartCountAtom } from '@/lib/atoms';

export function SidebarButtons() {
  const router = useRouter();
  const cartCount = useAtomValue(cartCountAtom);

  const handleDummyClick = (buttonName: string) => {
    alert(`${buttonName}は準備中です`);
  };

  return (
    <div className="fixed right-0 top-0 h-screen flex flex-col gap-2 p-2 bg-white border-l border-gray-200 shadow-lg z-50">
      {/* 店員呼び出し */}
      <button
        onClick={() => handleDummyClick('店員呼び出し')}
        className="w-20 h-16 flex flex-col items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition-colors"
      >
        <span className="text-2xl mb-1">🔔</span>
        <span>店員</span>
      </button>

      {/* トップページ */}
      <button
        onClick={() => router.push('/')}
        className="w-20 h-16 flex flex-col items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
      >
        <span className="text-2xl mb-1">🏠</span>
        <span>トップ</span>
      </button>

      {/* クーポン番号 */}
      <button
        onClick={() => handleDummyClick('クーポン番号')}
        className="w-20 h-16 flex flex-col items-center justify-center bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium transition-colors"
      >
        <span className="text-2xl mb-1">🎫</span>
        <span>クーポン</span>
      </button>

      {/* お持ち帰り */}
      <button
        onClick={() => handleDummyClick('お持ち帰り')}
        className="w-20 h-16 flex flex-col items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors"
      >
        <span className="text-2xl mb-1">📦</span>
        <span>持帰り</span>
      </button>

      {/* テーブル決済 */}
      <button
        onClick={() => handleDummyClick('テーブル決済')}
        className="w-20 h-16 flex flex-col items-center justify-center bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-xs font-medium transition-colors"
      >
        <span className="text-2xl mb-1">💳</span>
        <span>決済</span>
      </button>

      {/* 注文履歴 */}
      <button
        onClick={() => handleDummyClick('注文履歴')}
        className="w-20 h-16 flex flex-col items-center justify-center bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-xs font-medium transition-colors"
      >
        <span className="text-2xl mb-1">📋</span>
        <span>履歴</span>
      </button>

      {/* 注文かご（実動） */}
      <button
        onClick={() => router.push('/cart')}
        className="w-20 h-16 flex flex-col items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-xs font-medium transition-colors relative"
      >
        <span className="text-2xl mb-1">🛒</span>
        <span>かご</span>
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {cartCount}
          </div>
        )}
      </button>
    </div>
  );
}