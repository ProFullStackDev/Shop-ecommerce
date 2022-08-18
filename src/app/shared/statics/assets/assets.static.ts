import {AssetsList} from "@shared/models/assets.model";

export const ASSETS_LIST: AssetsList[] = [
  new AssetsList('/assets/images/game-board-parts/shop.png', 'game-build-shop-one', 2, '25,000', true),
  new AssetsList('/assets/images/nft-shop/franchise.png', 'game-build-shop-two', 0, '10,000', false),
  new AssetsList('/assets/images/nft-shop/super-market.png', 'game-build-shop-three', 0, '1,000', false),
  new AssetsList('/assets/images/nft-shop/mall.png', 'game-build-shop-four', 0, '100', false)
];
