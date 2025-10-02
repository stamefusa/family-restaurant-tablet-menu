"use client";

import { useAtom, useSetAtom } from 'jotai';
import { selectedStoreAtom, selectedCategoryAtom } from '@/lib/atoms';
import { stores } from '@/lib/mock-data';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { OriginalMenuItem } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [selectedStoreId, setSelectedStoreId] = useAtom(selectedStoreAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);

  // オリジナルメニュー名の入力
  const [originalMenuName, setOriginalMenuName] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // IndexedDBからオリジナルメニューを取得（リアルタイム）
  const originalMenus = useLiveQuery(() =>
    db.originalMenus.orderBy('createdAt').reverse().toArray()
  ) || [];

  // 選択中の店舗を取得（通常の店舗 or オリジナル）
  const selectedStore = useMemo(() => {
    if (selectedStoreId === 'original') {
      // オリジナルタブの場合
      return null;
    }
    return stores.find((store) => store.id === selectedStoreId);
  }, [selectedStoreId]);

  // カテゴリ一覧を取得
  const categories = useMemo(() => {
    if (selectedStoreId === 'original') {
      // オリジナルの場合は「メニュー追加」と「オリジナル」カテゴリ
      const cats = ['メニュー追加'];
      if (originalMenus.length > 0) {
        cats.push('オリジナル');
      }
      return cats;
    }

    if (!selectedStore) return [];

    // 通常店舗の場合はカテゴリを抽出
    const uniqueCategories = Array.from(
      new Set(selectedStore.items.map((item) => item.category))
    );
    return uniqueCategories;
  }, [selectedStore, selectedStoreId, originalMenus]);

  // 選択カテゴリのメニューアイテムを取得（最大4件）
  const categoryMenus = useMemo(() => {
    if (selectedStoreId === 'original') {
      if (selectedCategory === 'オリジナル') {
        return originalMenus.slice(0, 4);
      }
      return []; // メニュー追加の場合は空配列
    }

    if (!selectedStore) return [];

    return selectedStore.items
      .filter((item) => item.category === selectedCategory)
      .slice(0, 4);
  }, [selectedStore, selectedCategory, selectedStoreId, originalMenus]);

  // 店舗切り替え時にカテゴリをリセット
  const handleStoreChange = (storeId: string) => {
    setSelectedStoreId(storeId);

    if (storeId === 'original') {
      // オリジナルタブの場合は「メニュー追加」を選択
      setSelectedCategory('メニュー追加');
    } else {
      const newStore = stores.find((s) => s.id === storeId);
      if (newStore && newStore.items.length > 0) {
        // 最初のカテゴリを選択
        const firstCategory = newStore.items[0].category;
        setSelectedCategory(firstCategory);
      }
    }
  };

  // オリジナルメニューを生成
  const handleGenerateMenu = async () => {
    if (!originalMenuName.trim()) {
      alert('メニュー名を入力してください');
      return;
    }

    setIsGenerating(true);

    try {
      // 9件目追加時は最古を削除
      if (originalMenus.length >= 8) {
        const oldest = originalMenus[originalMenus.length - 1];
        if (oldest) {
          await db.originalMenus.delete(oldest.id);
        }
      }

      // APIで画像生成
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuName: originalMenuName }),
      });

      if (!response.ok) {
        throw new Error('画像生成に失敗しました');
      }

      const data = await response.json();

      // IndexedDBに保存（価格999円、カテゴリ「オリジナル」固定）
      const newMenu: OriginalMenuItem = {
        id: `original_${Date.now()}`,
        name: originalMenuName,
        price: 999, // オリジナルメニューは999円固定
        image: data.image, // base64画像
        category: 'オリジナル',
        createdAt: Date.now(),
      };

      await db.originalMenus.add(newMenu);

      // 入力をクリア
      setOriginalMenuName('');

      // オリジナルカテゴリに切り替え
      setSelectedCategory('オリジナル');

      showToast(`「${originalMenuName}」を作成しました`);
    } catch (error) {
      console.error('Error generating menu:', error);
      alert('メニュー生成に失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };

  // トースト通知
  const showToast = (message: string) => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 上段: 店舗タブ + オリジナルタブ */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
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
            {/* オリジナルタブ */}
            <button
              onClick={() => handleStoreChange('original')}
              className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedStoreId === 'original'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✨ オリジナル
            </button>
          </div>
        </div>
      </div>

      {/* 下段: カテゴリタブ */}
      {categories.length > 0 && (
        <div className="bg-red-600 border-b border-red-700">
          <div className="container mx-auto overflow-x-auto">
            <div className="flex gap-2 p-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
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

      {/* メインコンテンツ */}
      <main className="container mx-auto p-8">
        {selectedStoreId === 'original' && selectedCategory === 'メニュー追加' ? (
          // メニュー追加フォーム
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">
                オリジナルメニューを作成
              </h2>

              <div className="mb-6">
                <label className="block text-lg font-medium mb-2">
                  メニュー名
                </label>
                <input
                  type="text"
                  value={originalMenuName}
                  onChange={(e) => setOriginalMenuName(e.target.value)}
                  placeholder="例: 特製カレーラーメン"
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isGenerating}
                />
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600">
                  💡 AIが料理の画像を自動生成します<br />
                  最大8件まで保存できます（9件目で最古を削除）
                </p>
              </div>

              <button
                onClick={handleGenerateMenu}
                disabled={isGenerating || !originalMenuName.trim()}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-xl text-xl font-bold transition-colors shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? '生成中...' : '✨ メニューを作成'}
              </button>
            </div>
          </div>
        ) : categoryMenus.length > 0 ? (
          // メニューグリッド（2×2）
          <div className="grid grid-cols-2 gap-6 max-w-5xl mx-auto">
            {categoryMenus.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(`/menu/${item.id}`)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer text-left"
              >
                {/* メニュー画像 */}
                <div className="relative w-full h-64 bg-gray-200">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 400px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/placeholder.jpg';
                    }}
                  />
                </div>

                {/* メニュー情報 */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {item.name}
                  </h3>
                  {'price' in item && (
                    <div className="text-3xl font-bold text-red-600">
                      ¥{item.price.toLocaleString()}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-xl mt-8">
            このカテゴリにはメニューがありません
          </p>
        )}
      </main>
    </div>
  );
}
