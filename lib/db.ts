import Dexie, { Table } from 'dexie';
import { OriginalMenuItem } from './types';

// IndexedDBデータベース定義
export class MenuDatabase extends Dexie {
  originalMenus!: Table<OriginalMenuItem, string>;

  constructor() {
    super('MenuDatabase');

    // スキーマ定義
    this.version(1).stores({
      originalMenus: 'id, name, image, createdAt',
    });
  }
}

// シングルトンインスタンス
export const db = new MenuDatabase();