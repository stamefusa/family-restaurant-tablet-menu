"use client";

import { useAtom, useSetAtom } from 'jotai';
import { selectedStoreAtom, selectedMenuIdAtom, addToCartAtom } from '@/lib/atoms';
import { mockStores } from '@/lib/mock-data';
import { useMemo } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [selectedStoreId, setSelectedStoreId] = useAtom(selectedStoreAtom);
  const [selectedMenuId, setSelectedMenuId] = useAtom(selectedMenuIdAtom);
  const addToCart = useSetAtom(addToCartAtom);

  // 選択中の店舗を取得
  const selectedStore = useMemo(
    () => mockStores.find((store) => store.id === selectedStoreId),
    [selectedStoreId]
  );

  // 選択中のメニューを取得
  const selectedMenu = useMemo(
    () => selectedStore?.items.find((item) => item.id === selectedMenuId),
    [selectedStore, selectedMenuId]
  );

  // 店舗切り替え時にメニューをリセット
  const handleStoreChange = (storeId: string) => {
    setSelectedStoreId(storeId);
    const newStore = mockStores.find((s) => s.id === storeId);
    if (newStore && newStore.items.length > 0) {
      setSelectedMenuId(newStore.items[0].id);
    }
  };

  // かごに追加
  const handleAddToCart = () => {
    if (selectedMenu) {
      addToCart(selectedMenu);

      // トースト通知
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
      notification.textContent = `「${selectedMenu.name}」をかごに追加しました`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 上段: 店舗タブ */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex gap-2 p-2">
            {mockStores.map((store) => (
              <button
                key={store.id}
                onClick={() => handleStoreChange(store.id)}
                className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedStoreId === store.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {store.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 下段: 全メニュータブ */}
      {selectedStore && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto overflow-x-auto">
            <div className="flex gap-2 p-2">
              {selectedStore.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedMenuId(item.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedMenuId === item.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* メインコンテンツ: 選択メニューを大きく表示 */}
      <main className="container mx-auto p-8">
        {selectedMenu ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* メニュー画像 */}
              <div className="relative w-full h-96 bg-gray-200">
                <Image
                  src={selectedMenu.image}
                  alt={selectedMenu.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 768px"
                  priority
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
              </div>

              {/* メニュー情報 */}
              <div className="p-8">
                {/* カテゴリバッジ */}
                <div className="mb-4">
                  <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedMenu.category}
                  </span>
                </div>

                {/* メニュー名 */}
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                  {selectedMenu.name}
                </h1>

                {/* 価格と注文ボタン */}
                <div className="flex items-center justify-between">
                  <div className="text-5xl font-bold text-red-600">
                    ¥{selectedMenu.price.toLocaleString()}
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-xl text-2xl font-bold transition-colors shadow-lg hover:shadow-xl"
                  >
                    注文に追加
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl mt-8">
            メニューを選択してください
          </p>
        )}
      </main>
    </div>
  );
}