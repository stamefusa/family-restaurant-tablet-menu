import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { CartItem, MenuItem, OriginalMenuItem } from './types';

// 選択中の店舗ID
export const selectedStoreAtom = atom<string>('bami');

// 選択中のカテゴリ
export const selectedCategoryAtom = atom<string>('ラーメン');

// 注文かご (LocalStorage永続化)
export const cartAtom = atomWithStorage<CartItem[]>('cart', []);

// 派生状態: かご内商品数
export const cartCountAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((sum, item) => sum + item.qty, 0);
});

// 派生状態: 合計金額
export const cartTotalAtom = atom((get) => {
  const cart = get(cartAtom);
  return cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
});

// 書き込み専用アクション: かごに追加
export const addToCartAtom = atom(
  null,
  (get, set, item: MenuItem) => {
    const cart = get(cartAtom);
    const existing = cart.find((c) => c.itemId === item.id);

    if (existing) {
      // 既存の商品なら数量を増やす
      set(
        cartAtom,
        cart.map((c) =>
          c.itemId === item.id ? { ...c, qty: c.qty + 1 } : c
        )
      );
    } else {
      // 新規商品なら追加
      set(cartAtom, [
        ...cart,
        {
          itemId: item.id,
          name: item.name,
          unitPrice: item.price,
          qty: 1,
          image: item.image,
        },
      ]);
    }
  }
);

// 書き込み専用アクション: かごから削除
export const removeFromCartAtom = atom(
  null,
  (get, set, itemId: string) => {
    const cart = get(cartAtom);
    set(
      cartAtom,
      cart.filter((c) => c.itemId !== itemId)
    );
  }
);

// 書き込み専用アクション: かごをクリア
export const clearCartAtom = atom(null, (get, set) => {
  set(cartAtom, []);
});

// 書き込み専用アクション: 数量を更新
export const updateCartQuantityAtom = atom(
  null,
  (get, set, { itemId, qty }: { itemId: string; qty: number }) => {
    const cart = get(cartAtom);
    if (qty <= 0) {
      // 数量が0以下なら削除
      set(
        cartAtom,
        cart.filter((c) => c.itemId !== itemId)
      );
    } else {
      set(
        cartAtom,
        cart.map((c) => (c.itemId === itemId ? { ...c, qty } : c))
      );
    }
  }
);

// オリジナルメニュー用のatom (クライアントサイドのみで使用)
export const originalMenusAtom = atom<OriginalMenuItem[]>([]);