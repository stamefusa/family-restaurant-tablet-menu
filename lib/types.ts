// メニューアイテムの型定義
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

// カテゴリの型定義
export interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

// 店舗の型定義
export interface Store {
  id: string;
  name: string;
  categories: Category[];
}

// 注文かごアイテムの型定義
export interface CartItem {
  itemId: string;
  name: string;
  unitPrice: number;
  qty: number;
  image: string;
}

// オリジナルメニューの型定義
export interface OriginalMenuItem {
  id: string;
  name: string;
  image: string; // base64形式
  createdAt: number;
}