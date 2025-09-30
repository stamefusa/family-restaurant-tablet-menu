import { Store } from './types';

// モックデータ: 店舗・カテゴリ・メニュー
export const mockStores: Store[] = [
  {
    id: 'bami',
    name: 'バーミヤン',
    categories: [
      {
        id: 'ramen',
        name: 'ラーメン',
        items: [
          { id: 'ramen_shoyu', name: '醤油ラーメン', price: 690, image: '/images/ramen-shoyu.jpg' },
          { id: 'ramen_miso', name: '味噌ラーメン', price: 720, image: '/images/ramen-miso.jpg' },
          { id: 'ramen_tonkotsu', name: 'とんこつラーメン', price: 750, image: '/images/ramen-tonkotsu.jpg' },
        ],
      },
      {
        id: 'teishoku',
        name: '定食',
        items: [
          { id: 'teishoku_gyoza', name: '餃子定食', price: 890, image: '/images/gyoza-teishoku.jpg' },
          { id: 'teishoku_karaage', name: '唐揚げ定食', price: 950, image: '/images/karaage-teishoku.jpg' },
          { id: 'teishoku_mapo', name: '麻婆豆腐定食', price: 880, image: '/images/mapo-teishoku.jpg' },
        ],
      },
      {
        id: 'drink',
        name: 'ドリンク',
        items: [
          { id: 'drink_oolong', name: 'ウーロン茶', price: 290, image: '/images/oolong.jpg' },
          { id: 'drink_beer', name: 'ビール', price: 490, image: '/images/beer.jpg' },
          { id: 'drink_highball', name: 'ハイボール', price: 390, image: '/images/highball.jpg' },
        ],
      },
    ],
  },
  {
    id: 'gusto',
    name: 'ガスト',
    categories: [
      {
        id: 'hamburg',
        name: 'ハンバーグ',
        items: [
          { id: 'hamburg_cheese', name: 'チーズハンバーグ', price: 890, image: '/images/hamburg-cheese.jpg' },
          { id: 'hamburg_demi', name: 'デミグラスハンバーグ', price: 920, image: '/images/hamburg-demi.jpg' },
          { id: 'hamburg_wafu', name: '和風ハンバーグ', price: 850, image: '/images/hamburg-wafu.jpg' },
        ],
      },
      {
        id: 'pasta',
        name: 'パスタ',
        items: [
          { id: 'pasta_carbonara', name: 'カルボナーラ', price: 790, image: '/images/carbonara.jpg' },
          { id: 'pasta_peperoncino', name: 'ペペロンチーノ', price: 690, image: '/images/peperoncino.jpg' },
          { id: 'pasta_meat', name: 'ミートソース', price: 720, image: '/images/meat-pasta.jpg' },
        ],
      },
      {
        id: 'dessert',
        name: 'デザート',
        items: [
          { id: 'dessert_pudding', name: 'プリン', price: 390, image: '/images/pudding.jpg' },
          { id: 'dessert_icecream', name: 'アイスクリーム', price: 350, image: '/images/icecream.jpg' },
          { id: 'dessert_cake', name: 'ケーキ', price: 490, image: '/images/cake.jpg' },
        ],
      },
    ],
  },
  {
    id: 'jonathan',
    name: 'ジョナサン',
    categories: [
      {
        id: 'steak',
        name: 'ステーキ',
        items: [
          { id: 'steak_ribeye', name: 'リブロースステーキ', price: 1890, image: '/images/ribeye.jpg' },
          { id: 'steak_sirloin', name: 'サーロインステーキ', price: 1690, image: '/images/sirloin.jpg' },
          { id: 'steak_combo', name: 'コンビステーキ', price: 1990, image: '/images/combo-steak.jpg' },
        ],
      },
      {
        id: 'salad',
        name: 'サラダ',
        items: [
          { id: 'salad_caesar', name: 'シーザーサラダ', price: 590, image: '/images/caesar.jpg' },
          { id: 'salad_green', name: 'グリーンサラダ', price: 490, image: '/images/green-salad.jpg' },
          { id: 'salad_cobb', name: 'コブサラダ', price: 690, image: '/images/cobb.jpg' },
        ],
      },
      {
        id: 'drink',
        name: 'ドリンク',
        items: [
          { id: 'drink_coffee', name: 'コーヒー', price: 290, image: '/images/coffee.jpg' },
          { id: 'drink_tea', name: '紅茶', price: 290, image: '/images/tea.jpg' },
          { id: 'drink_juice', name: 'オレンジジュース', price: 350, image: '/images/orange-juice.jpg' },
        ],
      },
    ],
  },
];