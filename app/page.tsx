"use client";

import { useAtom, useAtomValue } from 'jotai';
import { selectedStoreAtom, selectedCategoryAtom } from '@/lib/atoms';
import { mockStores } from '@/lib/mock-data';
import { MenuCard } from '@/components/menu-card';
import { useMemo } from 'react';

export default function HomePage() {
  const [selectedStoreId, setSelectedStoreId] = useAtom(selectedStoreAtom);
  const [selectedCategoryId, setSelectedCategoryId] = useAtom(selectedCategoryAtom);

  // 選択中の店舗を取得
  const selectedStore = useMemo(
    () => mockStores.find((store) => store.id === selectedStoreId),
    [selectedStoreId]
  );

  // 選択中のカテゴリを取得
  const selectedCategory = useMemo(
    () => selectedStore?.categories.find((cat) => cat.id === selectedCategoryId),
    [selectedStore, selectedCategoryId]
  );

  // 店舗切り替え時にカテゴリをリセット
  const handleStoreChange = (storeId: string) => {
    setSelectedStoreId(storeId);
    const newStore = mockStores.find((s) => s.id === storeId);
    if (newStore && newStore.categories.length > 0) {
      setSelectedCategoryId(newStore.categories[0].id);
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

      {/* 下段: カテゴリタブ */}
      {selectedStore && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto overflow-x-auto">
            <div className="flex gap-2 p-2">
              {selectedStore.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategoryId === category.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* メインコンテンツ: メニュー一覧 */}
      <main className="container mx-auto p-4">
        {selectedCategory ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {selectedCategory.items.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">
            カテゴリを選択してください
          </p>
        )}
      </main>
    </div>
  );
}