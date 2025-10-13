"use client";

import { useAtom } from 'jotai';
import { selectedStoreAtom, selectedCategoryAtom, currentPageAtom } from '@/lib/atoms';
import { stores } from '@/lib/data';
import { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [selectedStoreId, setSelectedStoreId] = useAtom(selectedStoreAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  // 選択中の店舗を取得
  const selectedStore = useMemo(() => {
    return stores.find((store) => store.id === selectedStoreId);
  }, [selectedStoreId]);

  // カテゴリ一覧を取得
  const categories = useMemo(() => {
    if (!selectedStore) return [];
    const uniqueCategories = Array.from(
      new Set(selectedStore.items.map((item) => item.category))
    );
    return uniqueCategories;
  }, [selectedStore]);

  // 選択カテゴリの全アイテムを取得
  const allCategoryItems = useMemo(() => {
    if (!selectedStore) return [];
    return selectedStore.items.filter((item) => item.category === selectedCategory);
  }, [selectedStore, selectedCategory]);

  // 総ページ数を計算
  const totalPages = Math.ceil(allCategoryItems.length / 4);

  // 現在のページに表示するメニューアイテム（4件）
  const categoryMenus = useMemo(() => {
    const startIndex = currentPage * 4;
    return allCategoryItems.slice(startIndex, startIndex + 4);
  }, [allCategoryItems, currentPage]);

  // 店舗切り替え時にカテゴリとページをリセット
  const handleStoreChange = (storeId: string) => {
    setSelectedStoreId(storeId);
    setCurrentPage(0);
    const newStore = stores.find((s) => s.id === storeId);
    if (newStore && newStore.items.length > 0) {
      const firstCategory = newStore.items[0].category;
      setSelectedCategory(firstCategory);
    }
  };

  // カテゴリ切り替え時にページをリセット
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0); // ページを最初に戻す
  };

  // 次のページに進む
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      // カテゴリ内の次ページへ
      setCurrentPage(currentPage + 1);
    } else {
      // カテゴリの最終ページなら次のカテゴリへ
      const currentCategoryIndex = categories.indexOf(selectedCategory);
      const nextCategoryIndex = (currentCategoryIndex + 1) % categories.length;
      setSelectedCategory(categories[nextCategoryIndex]);
      setCurrentPage(0);
    }
  };

  // 前のページに戻る
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      const currentCategoryIndex = categories.indexOf(selectedCategory);
      const prevCategoryIndex = (currentCategoryIndex - 1 + categories.length) % categories.length;
      const prevCategory = categories[prevCategoryIndex];
      setSelectedCategory(prevCategory);

      if (selectedStore) {
        const prevCategoryItems = selectedStore.items.filter((item) => item.category === prevCategory);
        const prevTotalPages = Math.ceil(prevCategoryItems.length / 4);
        setCurrentPage(Math.max(0, prevTotalPages - 1));
      }
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex flex-col">
      {/* 上段: 店舗タブ + オリジナルタブ（固定高さ） */}
      {/* <div className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex gap-2 p-2">
            {stores.map((store) => (
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
      </div> */}

      {/* 下段: カテゴリタブ（固定高さ） */}
      {categories.length > 0 && (
        <div className="bg-red-600 border-b border-red-700 flex-shrink-0">
          <div className="container mx-auto overflow-x-auto">
            <div className="flex gap-2 p-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-white text-red-600'
                      : 'bg-red-500 text-white hover:bg-red-400'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* メインコンテンツ（残りの高さを使用） */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 h-full">
        {categoryMenus.length > 0 ? (
          // メニューグリッド（2×2）+ ページネーション（16:9画像）
          <div className="w-full max-w-[1000px] mx-auto h-full flex items-center">
            <div className="flex items-center gap-3 w-full">
              {/* 前のページボタン */}
              <button
                onClick={handlePrevPage}
                className="flex-shrink-0 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-2xl font-bold transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
              >
                &lt;
              </button>

              {/* メニューグリッド（16:9画像） */}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  {categoryMenus.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => router.push(`/menu/${item.id}`)}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer text-left"
                    >
                      {/* メニュー画像（16:9） */}
                      <div className="relative w-full aspect-video bg-gray-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 40vw, 450px"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/placeholder.jpg';
                          }}
                        />
                      </div>

                      {/* メニュー情報 */}
                      <div className="p-3">
                        <h3 className="text-base font-bold text-gray-800 mb-1 line-clamp-2 leading-tight">
                          {item.name}
                        </h3>
                        {'price' in item && (
                          <div className="text-lg font-bold text-red-600">
                            ¥{item.price.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
              </div>
              </div>

              {/* 次のページボタン */}
              <button
                onClick={handleNextPage}
                className="flex-shrink-0 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-2xl font-bold transition-colors shadow-md hover:shadow-lg flex items-center justify-center"
              >
                &gt;
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl mt-8">
            このカテゴリにはメニューがありません
          </p>
        )}
        </div>
      </main>
    </div>
  );
}
