import { DropdownItem } from '../../components/app-select/models/app-select.model';

export const LANGUAGES_LIST: DropdownItem[] = [
  new DropdownItem(1, 'gbFlag', null, 'en-GB', 'English'),
  new DropdownItem(2, 'chFlag', null, 'zh-CN', '简体中文'),
  new DropdownItem(3, 'chHgFlag', null, 'cn-TR', '繁體中文')
  // new DropdownItem(4, 'koFlag', null, 'ko-KR', 'Korean'), TODO add when translation will ba available in spreadsheet
  // new DropdownItem(5, 'viFlag', null, 'vi-VN', 'Vietnamese'),
  // new DropdownItem(6, 'jaFlag', null, 'ja-JP', 'Japanese'),
  // new DropdownItem(7, 'ruFlag', null, 'ru-RU', 'Russian')
];
