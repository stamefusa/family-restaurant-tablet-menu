import { Store } from './types';

// 店舗・メニューデータ
export const stores: Store[] = [
  {
    id: 'bami',
    name: 'バーミヤン',
    items: [
      // ラーメン（6件 = 2ページ）
      { id: 'ramen_shoyu', name: '醤油ラーメン', price: 690, image: '/images/ramen-shoyu.jpg', category: 'ラーメン' },
      { id: 'ramen_miso', name: '味噌ラーメン', price: 720, image: '/images/ramen-miso.jpg', category: 'ラーメン' },
      { id: 'ramen_tonkotsu', name: 'とんこつラーメン', price: 750, image: '/images/ramen-tonkotsu.jpg', category: 'ラーメン' },
      { id: 'ramen_shio', name: '塩ラーメン', price: 690, image: '/images/placeholder.jpg', category: 'ラーメン' },
      { id: 'ramen_spicy', name: '辛味噌ラーメン', price: 790, image: '/images/placeholder.jpg', category: 'ラーメン' },
      { id: 'ramen_tantanmen', name: '担々麺', price: 850, image: '/images/placeholder.jpg', category: 'ラーメン' },

      // 餃子・点心（5件 = 2ページ）
      { id: 'gyoza_yaki', name: '焼き餃子', price: 390, image: '/images/placeholder.jpg', category: '餃子・点心' },
      { id: 'gyoza_sui', name: '水餃子', price: 420, image: '/images/placeholder.jpg', category: '餃子・点心' },
      { id: 'gyoza_age', name: '揚げ餃子', price: 450, image: '/images/placeholder.jpg', category: '餃子・点心' },
      { id: 'shumai', name: 'シュウマイ', price: 490, image: '/images/placeholder.jpg', category: '餃子・点心' },
      { id: 'harumaki', name: '春巻き', price: 390, image: '/images/placeholder.jpg', category: '餃子・点心' },

      // 定食（7件 = 2ページ）
      { id: 'teishoku_gyoza', name: '餃子定食', price: 890, image: '/images/gyoza-teishoku.jpg', category: '定食' },
      { id: 'teishoku_karaage', name: '唐揚げ定食', price: 950, image: '/images/karaage-teishoku.jpg', category: '定食' },
      { id: 'teishoku_mapo', name: '麻婆豆腐定食', price: 880, image: '/images/mapo-teishoku.jpg', category: '定食' },
      { id: 'teishoku_ebi', name: 'エビチリ定食', price: 990, image: '/images/placeholder.jpg', category: '定食' },
      { id: 'teishoku_hoikoro', name: 'ホイコーロー定食', price: 920, image: '/images/placeholder.jpg', category: '定食' },
      { id: 'teishoku_twice', name: '回鍋肉定食', price: 950, image: '/images/placeholder.jpg', category: '定食' },
      { id: 'teishoku_nira', name: 'ニラレバ定食', price: 890, image: '/images/placeholder.jpg', category: '定食' },

      // ドリンク（6件 = 2ページ）
      { id: 'drink_oolong', name: 'ウーロン茶', price: 290, image: '/images/oolong.jpg', category: 'ドリンク' },
      { id: 'drink_beer', name: 'ビール', price: 490, image: '/images/beer.jpg', category: 'ドリンク' },
      { id: 'drink_highball', name: 'ハイボール', price: 390, image: '/images/highball.jpg', category: 'ドリンク' },
      { id: 'drink_sake', name: '日本酒', price: 590, image: '/images/placeholder.jpg', category: 'ドリンク' },
      { id: 'drink_shochu', name: '焼酎', price: 490, image: '/images/placeholder.jpg', category: 'ドリンク' },
      { id: 'drink_wine', name: 'ワイン', price: 690, image: '/images/placeholder.jpg', category: 'ドリンク' },
    ],
  },
  {
    id: 'gusto',
    name: 'ガスト',
    items: [
      // ハンバーグ（6件 = 2ページ）
      { id: 'hamburg_cheese', name: 'チーズハンバーグ', price: 890, image: '/images/hamburg-cheese.jpg', category: 'ハンバーグ' },
      { id: 'hamburg_demi', name: 'デミグラスハンバーグ', price: 920, image: '/images/hamburg-demi.jpg', category: 'ハンバーグ' },
      { id: 'hamburg_wafu', name: '和風ハンバーグ', price: 850, image: '/images/hamburg-wafu.jpg', category: 'ハンバーグ' },
      { id: 'hamburg_tomato', name: 'トマトハンバーグ', price: 880, image: '/images/placeholder.jpg', category: 'ハンバーグ' },
      { id: 'hamburg_teriyaki', name: 'てりやきハンバーグ', price: 890, image: '/images/placeholder.jpg', category: 'ハンバーグ' },
      { id: 'hamburg_avo', name: 'アボカドハンバーグ', price: 950, image: '/images/placeholder.jpg', category: 'ハンバーグ' },

      // パスタ（8件 = 2ページ）
      { id: 'pasta_carbonara', name: 'カルボナーラ', price: 790, image: '/images/carbonara.jpg', category: 'パスタ' },
      { id: 'pasta_peperoncino', name: 'ペペロンチーノ', price: 690, image: '/images/peperoncino.jpg', category: 'パスタ' },
      { id: 'pasta_meat', name: 'ミートソース', price: 720, image: '/images/meat-pasta.jpg', category: 'パスタ' },
      { id: 'pasta_tomato', name: 'トマトソース', price: 690, image: '/images/placeholder.jpg', category: 'パスタ' },
      { id: 'pasta_cream', name: 'クリームソース', price: 790, image: '/images/placeholder.jpg', category: 'パスタ' },
      { id: 'pasta_vongole', name: 'ボンゴレビアンコ', price: 890, image: '/images/placeholder.jpg', category: 'パスタ' },
      { id: 'pasta_arrabiata', name: 'アラビアータ', price: 750, image: '/images/placeholder.jpg', category: 'パスタ' },
      { id: 'pasta_mentaiko', name: '明太子パスタ', price: 850, image: '/images/placeholder.jpg', category: 'パスタ' },

      // ピザ（5件 = 2ページ）
      { id: 'pizza_margherita', name: 'マルゲリータ', price: 990, image: '/images/placeholder.jpg', category: 'ピザ' },
      { id: 'pizza_quattro', name: 'クアトロフォルマッジ', price: 1090, image: '/images/placeholder.jpg', category: 'ピザ' },
      { id: 'pizza_teriyaki', name: 'てりやきチキンピザ', price: 1050, image: '/images/placeholder.jpg', category: 'ピザ' },
      { id: 'pizza_seafood', name: 'シーフードピザ', price: 1190, image: '/images/placeholder.jpg', category: 'ピザ' },
      { id: 'pizza_veggie', name: 'ベジタブルピザ', price: 950, image: '/images/placeholder.jpg', category: 'ピザ' },

      // デザート（6件 = 2ページ）
      { id: 'dessert_pudding', name: 'プリン', price: 390, image: '/images/pudding.jpg', category: 'デザート' },
      { id: 'dessert_icecream', name: 'アイスクリーム', price: 350, image: '/images/icecream.jpg', category: 'デザート' },
      { id: 'dessert_cake', name: 'ケーキ', price: 490, image: '/images/cake.jpg', category: 'デザート' },
      { id: 'dessert_parfait', name: 'パフェ', price: 590, image: '/images/placeholder.jpg', category: 'デザート' },
      { id: 'dessert_tiramisu', name: 'ティラミス', price: 490, image: '/images/placeholder.jpg', category: 'デザート' },
      { id: 'dessert_crepe', name: 'クレープ', price: 450, image: '/images/placeholder.jpg', category: 'デザート' },
    ],
  },
  {
    id: 'jonathan',
    name: 'ジョナサン',
    items: [
      // ステーキ（7件 = 2ページ）
      { id: 'steak_ribeye', name: 'リブロースステーキ', price: 1890, image: '/images/ribeye.jpg', category: 'ステーキ' },
      { id: 'steak_sirloin', name: 'サーロインステーキ', price: 1690, image: '/images/sirloin.jpg', category: 'ステーキ' },
      { id: 'steak_combo', name: 'コンビステーキ', price: 1990, image: '/images/combo-steak.jpg', category: 'ステーキ' },
      { id: 'steak_fillet', name: 'ヒレステーキ', price: 2190, image: '/images/placeholder.jpg', category: 'ステーキ' },
      { id: 'steak_tbone', name: 'Tボーンステーキ', price: 2490, image: '/images/placeholder.jpg', category: 'ステーキ' },
      { id: 'steak_garlic', name: 'ガーリックステーキ', price: 1890, image: '/images/placeholder.jpg', category: 'ステーキ' },
      { id: 'steak_pepper', name: 'ペッパーステーキ', price: 1790, image: '/images/placeholder.jpg', category: 'ステーキ' },

      // サラダ（6件 = 2ページ）
      { id: 'salad_caesar', name: 'シーザーサラダ', price: 590, image: '/images/caesar.jpg', category: 'サラダ' },
      { id: 'salad_green', name: 'グリーンサラダ', price: 490, image: '/images/green-salad.jpg', category: 'サラダ' },
      { id: 'salad_cobb', name: 'コブサラダ', price: 690, image: '/images/cobb.jpg', category: 'サラダ' },
      { id: 'salad_caprese', name: 'カプレーゼ', price: 650, image: '/images/placeholder.jpg', category: 'サラダ' },
      { id: 'salad_avocado', name: 'アボカドサラダ', price: 690, image: '/images/placeholder.jpg', category: 'サラダ' },
      { id: 'salad_tuna', name: 'ツナサラダ', price: 590, image: '/images/placeholder.jpg', category: 'サラダ' },

      // グリル（5件 = 2ページ）
      { id: 'grill_chicken', name: 'グリルチキン', price: 990, image: '/images/placeholder.jpg', category: 'グリル' },
      { id: 'grill_salmon', name: 'サーモングリル', price: 1190, image: '/images/placeholder.jpg', category: 'グリル' },
      { id: 'grill_pork', name: 'ポークグリル', price: 1090, image: '/images/placeholder.jpg', category: 'グリル' },
      { id: 'grill_seafood', name: 'シーフードグリル', price: 1390, image: '/images/placeholder.jpg', category: 'グリル' },
      { id: 'grill_veggie', name: '野菜グリル', price: 790, image: '/images/placeholder.jpg', category: 'グリル' },

      // ドリンク（8件 = 2ページ）
      { id: 'drink_coffee', name: 'コーヒー', price: 290, image: '/images/coffee.jpg', category: 'ドリンク' },
      { id: 'drink_tea', name: '紅茶', price: 290, image: '/images/tea.jpg', category: 'ドリンク' },
      { id: 'drink_juice', name: 'オレンジジュース', price: 350, image: '/images/orange-juice.jpg', category: 'ドリンク' },
      { id: 'drink_latte', name: 'カフェラテ', price: 390, image: '/images/placeholder.jpg', category: 'ドリンク' },
      { id: 'drink_cappuccino', name: 'カプチーノ', price: 390, image: '/images/placeholder.jpg', category: 'ドリンク' },
      { id: 'drink_espresso', name: 'エスプレッソ', price: 320, image: '/images/placeholder.jpg', category: 'ドリンク' },
      { id: 'drink_smoothie', name: 'スムージー', price: 490, image: '/images/placeholder.jpg', category: 'ドリンク' },
      { id: 'drink_soda', name: 'ソーダ', price: 290, image: '/images/placeholder.jpg', category: 'ドリンク' },
    ],
  },
];
