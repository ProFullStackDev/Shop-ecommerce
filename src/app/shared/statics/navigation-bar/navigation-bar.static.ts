import { NavigationBar, NavigationBarLinkType } from '@shared/models/navigation-bar.model';

export const NAVIGATION_BAR: NavigationBar[] = [
  new NavigationBar('/', 'mobile-nav-home', 'houseIcon', null, NavigationBarLinkType.Home),
  new NavigationBar('/member/my-favorites/list', 'mobile-nav-list', 'heartIcon', null, NavigationBarLinkType.MyList),
  new NavigationBar(
    '/member/point',
    'account-menu-credits',
    null,
    '/assets/images/TYQOON-Dollars-cc-small.png',
    NavigationBarLinkType.Dollars
  ),
  new NavigationBar('javascript:void(0)', 'mobile-nav-account', 'user', '/assets/images/avatar.jpg', NavigationBarLinkType.Account)
];
