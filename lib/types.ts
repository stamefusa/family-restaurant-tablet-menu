// メニューアイテムの型定義
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string; // カテゴリ名（表示目的のみ）
}

// 店舗の型定義
export interface Store {
  id: string;
  name: string;
  items: MenuItem[]; // 全メニューをフラットに保持
}

// 注文かごアイテムの型定義
export interface CartItem {
  itemId: string;
  name: string;
  unitPrice: number;
  qty: number;
  image: string;
}