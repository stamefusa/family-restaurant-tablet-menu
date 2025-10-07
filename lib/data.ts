import { Store } from './types';

// 本番用メニューデータ（docs/menu.tsvから生成）
export const stores: Store[] = [
  {
    id: 'bami',
    name: 'バーミヤン',
    items: [
      // 主菜・飯
      { id: 'main-mabotofu', name: '本格四川麻婆豆腐', price: 659, image: '/images/bami/main-mabotofu.jpg', category: '主菜・飯' },
      { id: 'main-yurinchi', name: '油淋鶏', price: 769, image: '/images/bami/main-yurinchi.jpg', category: '主菜・飯' },
      { id: 'main-mabokaraage', name: '麻婆チャーハン＆台湾大からあげ', price: 1319, image: '/images/bami/main-mabokaraage.jpg', category: '主菜・飯' },
      { id: 'main-chukadon', name: '中華丼', price: 824, image: '/images/bami/main-chukadon.jpg', category: '主菜・飯' },
      { id: 'main-tenshinchahan', name: '天津チャーハン', price: 879, image: '/images/bami/main-tenshinchahan.jpg', category: '主菜・飯' },

      // 麺
      { id: 'noodle-ramen', name: 'バーミヤンラーメン', price: 791, image: '/images/bami/noodle-ramen.jpg', category: '麺' },
      { id: 'noodle-gomoku', name: '五目麺', price: 934, image: '/images/bami/noodle-gomoku.jpg', category: '麺' },
      { id: 'noodle-tantan', name: '濃厚担々麺', price: 769, image: '/images/bami/noodle-tantan.jpg', category: '麺' },

      // 点心・デザート
      { id: 'ten-gyoza', name: '本格焼餃子（6コ）', price: 329, image: '/images/bami/ten-gyoza.jpg', category: '点心・デザート' },
      { id: 'ten-wantan', name: '皿ワンタン', price: 329, image: '/images/bami/ten-wantan.jpg', category: '点心・デザート' },
      { id: 'tan-annin', name: 'とろとろ白桃アンニン', price: 399, image: '/images/bami/tan-annin.jpg', category: '点心・デザート' },
      { id: 'tan-kasutera', name: 'あったか蒸籠蒸し台湾カステラ', price: 439, image: '/images/bami/tan-kasutera.jpg', category: '点心・デザート' },
    ],
  },
  {
    id: 'sai',
    name: 'サイゼリヤ',
    items: [
      // 前菜
      { id: 'ape-chicken', name: '辛味チキン', price: 300, image: '/images/sai/ape-chicken.jpg', category: '前菜' },
      { id: 'ape-shrimp', name: 'ポップコーンシュリンプ', price: 300, image: '/images/sai/ape-shrimp.jpg', category: '前菜' },
      { id: 'ape-spinach', name: 'ほうれん草のソテー', price: 200, image: '/images/sai/ape-spinach.jpg', category: '前菜' },
      { id: 'ape-lamb', name: 'アロスティチーニ', price: 400, image: '/images/sai/ape-lamb.jpg', category: '前菜' },

      // ピザ・ドリア
      { id: 'pizza-maru', name: 'バッファローモッツァレラのマルゲリータピザ', price: 400, image: '/images/sai/pizza-maru.jpg', category: 'ピザ・ドリア' },
      { id: 'pizza-sausage', name: 'ソーセージピザ', price: 400, image: '/images/sai/pizza-sausage.jpg', category: 'ピザ・ドリア' },
      { id: 'pizza-mirano', name: 'ミラノ風ドリア', price: 300, image: '/images/sai/pizza-mirano.jpg', category: 'ピザ・ドリア' },
      { id: 'pizza-egg', name: '半熟卵のミラノ風ドリア', price: 350, image: '/images/sai/pizza-egg.jpg', category: 'ピザ・ドリア' },
    ],
  },
  {
    id: 'coco',
    name: 'ココス',
    items: [
      // グリル・ライス
      { id: 'grill-tsutsumi', name: '濃厚ビーフシチューの包み焼きハンバーグ145g', price: 1199, image: '/images/coco/grill-tsutsumi.jpg', category: 'グリル・ライス' },
      { id: 'grill-double', name: 'ココスのハンバーグダブル', price: 1199, image: '/images/coco/grill-double.jpg', category: 'グリル・ライス' },
      { id: 'grill-steak', name: '厚切り!!サーロインステーキ', price: 2409, image: '/images/coco/grill-steak.jpg', category: 'グリル・ライス' },
      { id: 'grill-omu', name: '濃厚ビーフシチューのふわとろオムライス', price: 1309, image: '/images/coco/grill-omu.jpg', category: 'グリル・ライス' },

      // サイド・サラダ
      { id: 'side-potato', name: 'カリカリポテト', price: 495, image: '/images/coco/side-potato.jpg', category: 'サイド・サラダ' },
      { id: 'side-salad', name: '温野菜のシーザーサラダ', price: 429, image: '/images/coco/side-salad.jpg', category: 'サイド・サラダ' },
      { id: 'side-mexico', name: 'メキシカン・ケサディーヤ', price: 759, image: '/images/coco/side-mexico.jpg', category: 'サイド・サラダ' },
      { id: 'side-corn', name: 'コーンスープ', price: 319, image: '/images/coco/side-corn.jpg', category: 'サイド・サラダ' },
    ],
  },
];
