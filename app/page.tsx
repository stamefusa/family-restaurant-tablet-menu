"use client";

import { useAtom, useSetAtom } from 'jotai';
import { selectedStoreAtom, selectedMenuIdAtom, addToCartAtom, originalMenusAtom } from '@/lib/atoms';
import { mockStores } from '@/lib/mock-data';
import { useMemo, useEffect, useState } from 'react';
import Image from 'next/image';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import { OriginalMenuItem } from '@/lib/types';

export default function HomePage() {
  const [selectedStoreId, setSelectedStoreId] = useAtom(selectedStoreAtom);
  const [selectedMenuId, setSelectedMenuId] = useAtom(selectedMenuIdAtom);
  const addToCart = useSetAtom(addToCartAtom);

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
    return mockStores.find((store) => store.id === selectedStoreId);
  }, [selectedStoreId]);

  // 選択中のメニューを取得
  const selectedMenu = useMemo(() => {
    if (selectedStoreId === 'original') {
      // オリジナルメニューから検索
      if (selectedMenuId === 'add-new') return null;
      return originalMenus.find((item) => item.id === selectedMenuId);
    }
    return selectedStore?.items.find((item) => item.id === selectedMenuId);
  }, [selectedStore, selectedMenuId, originalMenus, selectedStoreId]);

  // 店舗切り替え時にメニューをリセット
  const handleStoreChange = (storeId: string) => {
    setSelectedStoreId(storeId);

    if (storeId === 'original') {
      // オリジナルタブの場合は「メニュー追加」を選択
      setSelectedMenuId('add-new');
    } else {
      const newStore = mockStores.find((s) => s.id === storeId);
      if (newStore && newStore.items.length > 0) {
        setSelectedMenuId(newStore.items[0].id);
      }
    }
  };

  // かごに追加
  const handleAddToCart = () => {
    if (selectedMenu) {
      // MenuItemとOriginalMenuItemは同じ構造なので直接渡せる
      addToCart(selectedMenu as any);

      // トースト通知
      showToast(`「${selectedMenu.name}」をかごに追加しました`);
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

      // 作成したメニューを選択
      setSelectedMenuId(newMenu.id);

      showToast(`「${originalMenuName}」を作成しました`);
    } catch (error) {
      console.error('Error generating menu:', error);
      alert('メニュー生成に失敗しました');
    } finally {
      setIsGenerating(false);
    }
  };

  // オリジナルメニューを削除
  const handleDeleteOriginal = async (id: string) => {
    if (confirm('このメニューを削除しますか？')) {
      await db.originalMenus.delete(id);

      // 削除したメニューが選択中なら「メニュー追加」に戻る
      if (selectedMenuId === id) {
        setSelectedMenuId('add-new');
      }

      showToast('メニューを削除しました');
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

      {/* 下段: メニュータブ or オリジナルメニュータブ */}
      {selectedStoreId === 'original' ? (
        // オリジナルタブの場合
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto overflow-x-auto">
            <div className="flex gap-2 p-2">
              {/* メニュー追加タブ */}
              <button
                onClick={() => setSelectedMenuId('add-new')}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedMenuId === 'add-new'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                ➕ メニュー追加
              </button>

              {/* 作成済みオリジナルメニュータブ */}
              {originalMenus.map((item) => (
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
      ) : (
        // 通常の店舗の場合
        selectedStore && (
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
        )
      )}

      {/* メインコンテンツ */}
      <main className="container mx-auto p-8">
        {selectedStoreId === 'original' && selectedMenuId === 'add-new' ? (
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
        ) : selectedMenu ? (
          // 選択されたメニューを大きく表示
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
                {'category' in selectedMenu && (
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      selectedMenu.category === 'オリジナル'
                        ? 'bg-purple-200 text-purple-700'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {selectedMenu.category === 'オリジナル' && '✨ '}
                      {selectedMenu.category}
                    </span>
                  </div>
                )}

                {/* メニュー名 */}
                <h1 className="text-4xl font-bold text-gray-800 mb-6">
                  {selectedMenu.name}
                </h1>

                {/* 価格と注文ボタン */}
                {'price' in selectedMenu && (
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
                )}
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