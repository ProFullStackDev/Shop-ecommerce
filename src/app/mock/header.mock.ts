import { NavBarList } from '@shared/components/header/models/header.model';

import { ProductsList } from '../shared/components/header/modules/shop-basket/models/shop-basket.model';

const AUTH_LIST = [
  {
    name: '请登录',
    link: '/login'
  },
  {
    name: '注册有礼',
    link: '/register'
  }
];

const FUN_LIST = [
  {
    name: '会员中心',
    link: '/member'
  },
  {
    name: '我的订单',
    link: '#'
  }
];

const MERCHANT_SERVICES_LIST = [
  {
    name: '商家中心',
    link: '#'
  },
  {
    name: '商家入驻',
    link: ''
  }
];

const MERCHANT_SERVICES = {
  name: ' 商家服务 ',
  links: MERCHANT_SERVICES_LIST
};

const QR_CODES = [
  {
    image: '/assets/images/qr-codes/qrcode-wechat.jpg',
    name: '微信公众号'
  },
  {
    image: '/assets/images/qr-codes/qrcode-app.jpg',
    name: '微信小程序'
  },
  {
    image: '/assets/images/qr-codes/qrcode-applet.jpg',
    name: '下载APP'
  }
];

const QR_LIST = {
  name: '手机商城',
  list: QR_CODES
};

export const NAV_BAR = {
  title: '您好，欢迎来到SHOP++商城',
  authList: AUTH_LIST,
  funList: FUN_LIST,
  merchantServices: MERCHANT_SERVICES,
  qrList: QR_LIST
};

export const SHOP_BASKET_PRODUCTS_LIST: ProductsList[] = [
  new ProductsList('/assets/images/products/product-1.jpg', 'Bernese/伯尔尼斯伯爵蒸锅双层不锈钢', '180.40', '1'),
  new ProductsList('/assets/images/products/product-2.jpg', 'Bernese/伯尔尼斯 双层汤蒸锅', '110.00', '1'),
  new ProductsList('/assets/images/products/product-3.jpg', 'Bernese/伯尔尼斯 三层加厚蒸笼蒸格', '330.00', '1'),
  new ProductsList('/assets/images/products/product-1.jpg', 'Bernese/伯尔尼斯伯爵蒸锅双层不锈钢', '180.40', '1'),
  new ProductsList('/assets/images/products/product-2.jpg', 'Bernese/伯尔尼斯 双层汤蒸锅', '110.00', '1'),
  new ProductsList('/assets/images/products/product-3.jpg', 'Bernese/伯尔尼斯 三层加厚蒸笼蒸格', '330.00', '1'),
  new ProductsList('/assets/images/products/product-1.jpg', 'Bernese/伯尔尼斯伯爵蒸锅双层不锈钢', '180.40', '1'),
  new ProductsList('/assets/images/products/product-2.jpg', 'Bernese/伯尔尼斯 双层汤蒸锅', '110.00', '1'),
  new ProductsList('/assets/images/products/product-3.jpg', 'Bernese/伯尔尼斯 三层加厚蒸笼蒸格', '330.00', '1'),
  new ProductsList('/assets/images/products/product-1.jpg', 'Bernese/伯尔尼斯伯爵蒸锅双层不锈钢', '180.40', '1'),
  new ProductsList('/assets/images/products/product-2.jpg', 'Bernese/伯尔尼斯 双层汤蒸锅', '110.00', '1'),
  new ProductsList('/assets/images/products/product-3.jpg', 'Bernese/伯尔尼斯 三层加厚蒸笼蒸格', '330.00', '1')
];

export const NAV_BAR_LIST: NavBarList[] = [
  {
    text: 'header-dropdown-home',
    navLink: '/',
    action: false
  },
  {
    text: 'header-dropdown-my-account',
    navLink: '/member/order/list',
    action: false
  },
  {
    text: 'header-dropdown-watchlist',
    navLink: '/member/my-favorites/list',
    action: false
  },
  // TODO temporary hided
  // {
  //   text: 'header-dropdown-gameboard',
  //   navLink: '/gameboard',
  //   action: false
  // },
  {
    text: 'header-dropdown-dashboard',
    navLink: '/dashboard',
    action: false
  },
  {
    text: 'header-dropdown-logout',
    navLink: null,
    action: true
  }
];

export const NAV_BAR_LIST_MOB: NavBarList[] = [
  {
    text: 'header-dropdown-home',
    navLink: '/',
    action: false
  },
  {
    text: 'header-dropdown-my-account',
    navLink: '/member/order/list',
    action: false
  },
  {
    text: 'header-dropdown-dashboard',
    navLink: '/dashboard',
    action: false
  },
  {
    text: 'header-dropdown-logout',
    navLink: null,
    action: true
  }
];
