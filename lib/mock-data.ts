import { Store } from './types';

// 店舗・メニューデータ
export const stores: Store[] = [
  {
    id: 'bami',
    name: 'バーミヤン',
    items: [
      { id: 'ramen_shoyu', name: '醤油ラーメン', price: 690, image: '/images/ramen-shoyu.jpg', category: 'ラーメン' },
      { id: 'ramen_miso', name: '味噌ラーメン', price: 720, image: '/images/ramen-miso.jpg', category: 'ラーメン' },
      { id: 'ramen_tonkotsu', name: 'とんこつラーメン', price: 750, image: '/images/ramen-tonkotsu.jpg', category: 'ラーメン' },
      { id: 'teishoku_gyoza', name: '餃子定食', price: 890, image: '/images/gyoza-teishoku.jpg', category: '定食' },
      { id: 'teishoku_karaage', name: '唐揚げ定食', price: 950, image: '/images/karaage-teishoku.jpg', category: '定食' },
      { id: 'teishoku_mapo', name: '麻婆豆腐定食', price: 880, image: '/images/mapo-teishoku.jpg', category: '定食' },
      { id: 'drink_oolong', name: 'ウーロン茶', price: 290, image: '/images/oolong.jpg', category: 'ドリンク' },
      { id: 'drink_beer', name: 'ビール', price: 490, image: '/images/beer.jpg', category: 'ドリンク' },
      { id: 'drink_highball', name: 'ハイボール', price: 390, image: '/images/highball.jpg', category: 'ドリンク' },
    ],
  },
  {
    id: 'gusto',
    name: 'ガスト',
    items: [
      { id: 'hamburg_cheese', name: 'チーズハンバーグ', price: 890, image: '/images/hamburg-cheese.jpg', category: 'ハンバーグ' },
      { id: 'hamburg_demi', name: 'デミグラスハンバーグ', price: 920, image: '/images/hamburg-demi.jpg', category: 'ハンバーグ' },
      { id: 'hamburg_wafu', name: '和風ハンバーグ', price: 850, image: '/images/hamburg-wafu.jpg', category: 'ハンバーグ' },
      { id: 'pasta_carbonara', name: 'カルボナーラ', price: 790, image: '/images/carbonara.jpg', category: 'パスタ' },
      { id: 'pasta_peperoncino', name: 'ペペロンチーノ', price: 690, image: '/images/peperoncino.jpg', category: 'パスタ' },
      { id: 'pasta_meat', name: 'ミートソース', price: 720, image: '/images/meat-pasta.jpg', category: 'パスタ' },
      { id: 'dessert_pudding', name: 'プリン', price: 390, image: '/images/pudding.jpg', category: 'デザート' },
      { id: 'dessert_icecream', name: 'アイスクリーム', price: 350, image: '/images/icecream.jpg', category: 'デザート' },
      { id: 'dessert_cake', name: 'ケーキ', price: 490, image: '/images/cake.jpg', category: 'デザート' },
    ],
  },
  {
    id: 'jonathan',
    name: 'ジョナサン',
    items: [
      { id: 'steak_ribeye', name: 'リブロースステーキ', price: 1890, image: '/images/ribeye.jpg', category: 'ステーキ' },
      { id: 'steak_sirloin', name: 'サーロインステーキ', price: 1690, image: '/images/sirloin.jpg', category: 'ステーキ' },
      { id: 'steak_combo', name: 'コンビステーキ', price: 1990, image: '/images/combo-steak.jpg', category: 'ステーキ' },
      { id: 'salad_caesar', name: 'シーザーサラダ', price: 590, image: '/images/caesar.jpg', category: 'サラダ' },
      { id: 'salad_green', name: 'グリーンサラダ', price: 490, image: '/images/green-salad.jpg', category: 'サラダ' },
      { id: 'salad_cobb', name: 'コブサラダ', price: 690, image: '/images/cobb.jpg', category: 'サラダ' },
      { id: 'drink_coffee', name: 'コーヒー', price: 290, image: '/images/coffee.jpg', category: 'ドリンク' },
      { id: 'drink_tea', name: '紅茶', price: 290, image: '/images/tea.jpg', category: 'ドリンク' },
      { id: 'drink_juice', name: 'オレンジジュース', price: 350, image: '/images/orange-juice.jpg', category: 'ドリンク' },
    ],
  },
];