import Dexie, { Table } from 'dexie';
import { OriginalMenuItem } from './types';

// IndexedDBデータベース定義
export class MenuDatabase extends Dexie {
  originalMenus!: Table<OriginalMenuItem, string>;

  constructor() {
    super('MenuDatabase');

    // スキーマ定義（バージョン2に更新）
    this.version(2).stores({
      originalMenus: 'id, name, price, image, category, createdAt',
    });
  }
}

// シングルトンインスタンス
export const db = new MenuDatabase();