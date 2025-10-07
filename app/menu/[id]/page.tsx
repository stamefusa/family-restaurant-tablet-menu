"use client";

import { useRouter, useParams } from 'next/navigation';
import { useSetAtom } from 'jotai';
import { addToCartAtom } from '@/lib/atoms';
import { stores } from '@/lib/data';
import { useState } from 'react';
import Image from 'next/image';
import { MenuItem } from '@/lib/types';

export default function MenuDetailPage() {
  const router = useRouter();
  const params = useParams();
  const menuId = params.id as string;

  const addToCart = useSetAtom(addToCartAtom);
  const [showToast, setShowToast] = useState(false);

  // Find menu item across all stores (not dependent on selectedStore state)
  let menuItem: MenuItem | undefined;

  for (const store of stores) {
    const item = store.items.find((item) => item.id === menuId);
    if (item) {
      menuItem = item;
      break;
    }
  }

  const handleAddToCart = () => {
    if (menuItem && 'price' in menuItem) {
      addToCart(menuItem as MenuItem);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        router.push('/');
      }, 500);
    }
  };

  if (!menuItem) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">メニューが見つかりません</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            メニュー一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="container mx-auto p-4 flex items-center">
            <button
              onClick={() => router.push('/')}
              className="text-blue-500 hover:text-blue-600 font-medium text-lg"
            >
              ← 戻る
            </button>
          </div>
        </div>

        {/* Main Content */}
        <main className="container mx-auto p-8 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="grid grid-cols-2 gap-12">
              {/* Left: Image */}
              <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <Image
                  src={menuItem.image}
                  alt={menuItem.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 600px"
                  priority
                />
              </div>

              {/* Right: Details */}
              <div className="flex flex-col justify-between">
                <div>
                  {/* Category Badge */}
                  {'category' in menuItem && (
                    <div className="mb-4">
                      <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                        menuItem.category === 'オリジナル'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {menuItem.category}
                      </span>
                    </div>
                  )}

                  {/* Menu Name */}
                  <h1 className="text-5xl font-bold mb-8">{menuItem.name}</h1>

                  {/* Price */}
                  {'price' in menuItem && (
                    <div className="text-6xl font-bold text-red-600 mb-12">
                      ¥{menuItem.price.toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Add to Cart Button */}
                {'price' in menuItem && (
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6 rounded-xl text-2xl font-bold transition-colors shadow-lg hover:shadow-xl"
                  >
                    注文に追加
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-8 right-32 bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg z-50 animate-fade-in">
          ✓ 「{menuItem.name}」をかごに追加しました
        </div>
      )}
    </>
  );
}