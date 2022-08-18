import { DropdownItem } from '../../../../../controls/form-select/models/form-select.model';
import { HotSearchDto, HotSearchList, SearchCategories } from '../models/search.model';

export const SEARCH_CATEGORIES: Array<DropdownItem<number>> = [
  new DropdownItem('shop-category-home', 1),
  new DropdownItem('shop-category-fashion', 5),
  new DropdownItem('shop-category-sports', 13),
  new DropdownItem('Profile P', 2),
  new DropdownItem('shop-category-home', 3),
  new DropdownItem('shop-category-snacks', 8),
  new DropdownItem('shop-category-baby', 4)
];

const HOT_SEARCH_LIST: HotSearchList[] = [
  new HotSearchList('苹果'),
  new HotSearchList('三星'),
  new HotSearchList('索尼'),
  new HotSearchList('华为'),
  new HotSearchList('魅族'),
  new HotSearchList('佳能'),
  new HotSearchList('小米'),
  new HotSearchList('美的'),
  new HotSearchList('格力')
];

export const HOT_SEARCH: HotSearchDto = {
  label: '热门搜索',
  list: HOT_SEARCH_LIST
};
