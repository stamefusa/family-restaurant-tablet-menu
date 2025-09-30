"use client";

import { useAtomValue, useSetAtom } from 'jotai';
import { cartAtom, cartTotalAtom, removeFromCartAtom, updateCartQuantityAtom, clearCartAtom } from '@/lib/atoms';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';

export default function CartPage() {
  const router = useRouter();
  const cart = useAtomValue(cartAtom);
  const total = useAtomValue(cartTotalAtom);
  const removeFromCart = useSetAtom(removeFromCartAtom);
  const updateQuantity = useSetAtom(updateCartQuantityAtom);
  const clearCart = useSetAtom(clearCartAtom);
  const [showModal, setShowModal] = useState(false);

  const handleConfirmOrder = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    clearCart();
    setShowModal(false);
    router.push('/');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-gray-600 mb-4">注文かごは空です</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            メニューを見る
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="container mx-auto p-4 flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              ← メニューに戻る
            </button>
            <h1 className="text-2xl font-bold">注文確認</h1>
            <div className="w-32"></div>
          </div>
        </div>

        <main className="container mx-auto p-4 max-w-4xl">
          {/* 注文アイテム一覧 */}
          <div className="space-y-4 mb-8">
            {cart.map((item) => (
              <div key={item.itemId} className="bg-white rounded-lg shadow-md p-4 flex gap-4">
                {/* 画像 */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                {/* 商品情報 */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600">¥{item.unitPrice.toLocaleString()}</p>
                </div>

                {/* 数量調整 */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity({ itemId: item.itemId, qty: item.qty - 1 })}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                    >
                      −
                    </button>
                    <span className="w-12 text-center font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQuantity({ itemId: item.itemId, qty: item.qty + 1 })}
                      className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.itemId)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    削除
                  </button>
                </div>

                {/* 小計 */}
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">
                    ¥{(item.unitPrice * item.qty).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* 合計と注文確定 */}
          <div className="bg-white rounded-lg shadow-md p-6 sticky bottom-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold">合計</span>
              <span className="text-3xl font-bold text-red-600">
                ¥{total.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-lg text-xl font-bold transition-colors"
            >
              注文を確定する
            </button>
          </div>
        </main>
      </div>

      {/* 注文確定モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-4">注文しました</h2>
            <p className="text-gray-600 mb-6">
              ご注文ありがとうございます
            </p>
            <button
              onClick={handleModalClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              メニューに戻る
            </button>
          </div>
        </div>
      )}
    </>
  );
}