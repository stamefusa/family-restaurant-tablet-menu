"use client";

import { useSetAtom } from 'jotai';
import { addToCartAtom } from '@/lib/atoms';
import { MenuItem } from '@/lib/types';
import Image from 'next/image';

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const addToCart = useSetAtom(addToCartAtom);

  const handleAddToCart = () => {
    addToCart(item);
    // トースト通知を表示（シンプルなalertで代用）
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in';
    notification.textContent = `「${item.name}」をかごに追加しました`;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* 画像 */}
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            // 画像が見つからない場合は代替画像を表示
            const target = e.target as HTMLImageElement;
            target.src = '/images/placeholder.jpg';
          }}
        />
      </div>

      {/* メニュー情報 */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {item.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-red-600">
            ¥{item.price.toLocaleString()}
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            注文に追加
          </button>
        </div>
      </div>
    </div>
  );
}