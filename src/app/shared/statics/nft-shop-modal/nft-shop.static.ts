import { BuildingType, NftShopListDto } from '../../models/nft-shop-modal.model';

export const NFT_SHOP_LIST: NftShopListDto[] = [
  new NftShopListDto(
    '/assets/images/game-board-parts/blank.png',
    '/assets/images/game-board-parts/shop.png',
    BuildingType.Shop,
    '/assets/images/TYD@2x.png',
    'game-build-buy',
    1500,
    false,
    1,
    0
  ),
  new NftShopListDto(
    '/assets/images/game-board-parts/shop.png',
    '/assets/images/nft-shop/franchise.png',
    BuildingType.Franchise,
    '/assets/images/game-board-parts/shop.png',
    'game-build-merge',
    4,
    true,
    0,
    0
  ),
  new NftShopListDto(
    '/assets/images/nft-shop/franchise.png',
    '/assets/images/nft-shop/super-market.png',
    BuildingType.SuperMarket,
    '/assets/images/game-board-parts/shop.png',
    'game-build-merge',
    4,
    true,
    0,
    0
  ),
  new NftShopListDto(
    '/assets/images/nft-shop/super-market.png',
    '/assets/images/nft-shop/mall.png',
    BuildingType.Mall,
    '/assets/images/game-board-parts/shop.png',
    'game-build-merge',
    4,
    true,
    0,
    0
  )
];
