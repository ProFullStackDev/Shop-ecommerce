export interface TyqoonIconI {
  name: TyqoonIcon;
  data: string;
}

export type TyqoonIcon =
  | 'gbFlag'
  | 'chFlag'
  | 'chHgFlag'
  | 'arrowDown'
  | 'search'
  | 'shopBasket'
  | 'list'
  | 'anquanbaozhang'
  | 'tooltip'
  | 'wallet'
  | 'camera'
  | 'arrowUp'
  | 'check'
  | 'protect'
  | 'truck'
  | 'headphones'
  | 'present'
  | 'box'
  | 'qrCode'
  | 'phone'
  | 'mail'
  | 'environment'
  | 'tablet'
  | 'cameraSmall'
  | 'smth'
  | 'diamond'
  | 'gift'
  | 'flower'
  | 'burgerMenu'
  | 'scan'
  | 'bell'
  | 'closeMenu'
  | 'crown'
  | 'facebookSocial'
  | 'twitterSocial'
  | 'instagramSocial'
  | 'discordSocial'
  | 'telegramSocial'
  | 'wechatSocial'
  | 'whatsappSocial'
  | 'mailSocial'
  | 'smsSocial'
  | 'qrSocial'
  | 'envelope'
  | 'cross'
  | 'withdraw'
  | 'mobileBasket'
  | 'arrowRight'
  | 'logo'
  | 'logoFooter'
  | 'mallAnimated'
  | 'shopAnimated'
  | 'stokedStar'
  | 'filledStar'
  | 'stokedStarMobile'
  | 'filledStarMobile'
  | 'arrowDownNew'
  | 'giftBox'
  | 'franchiseAnimated'
  | 'supermarketAnimated'
  | 'mallBuildAnimated'
  | 'logoMob'
  | 'houseIcon'
  | 'heartIcon'
  | 'heartMenuIcon'
  | 'stokedHeart'
  | 'filledHeart'
  | 'user'
  | 'copyIcon';

export type TyqoonIconColor = 'white' | 'light-gray' | 'black';

export interface TyqoonIconColorI {
  name: TyqoonIconColor;
  color: string;
}

export const tyqoonIconColorList: TyqoonIconColorI[] = [
  { name: 'white', color: '#ffffff' },
  { name: 'light-gray', color: '#cccccc' },
  { name: 'black', color: '#000000' }
];
