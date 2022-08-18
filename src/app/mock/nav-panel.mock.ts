import {
  PagesList,
  ProductsCategories,
  ProductsCategoriesLinks,
  ProductsCategoriesSubItem
} from '../shared/components/nav-panel/models/nav-panel.model';

const PRODUCTS_CATEGORIES_ITEM_SPORTS: ProductsCategoriesSubItem[] = [
  new ProductsCategoriesSubItem('20017', 'shop-subcategory-sports-equipment', [
    new ProductsCategoriesLinks('30116', '/product/search?categoryId=5504', 'shop-subcategory-link-golf'),
    new ProductsCategoriesLinks('30117', '/product/search?categoryId=1434', 'shop-subcategory-link-cycling'),
    new ProductsCategoriesLinks('30118', '/product/search?categoryId=230', 'shop-subcategory-link-camping-fishing'),
    new ProductsCategoriesLinks('30119', '/product/search?categoryId=231', 'shop-subcategory-link-swimming-watersports'),
    new ProductsCategoriesLinks('30120', '/product/search?categoryId=5355', 'shop-subcategory-link-home-gym'),
    new ProductsCategoriesLinks('30121', '/product/search?categoryId=null', '瑜伽'),
    new ProductsCategoriesLinks('30122', '/product/search?categoryId=null', '互动式运动设备'),
    new ProductsCategoriesLinks('30123', '/product/search?categoryId=null', '运动补充剂'),
    new ProductsCategoriesLinks('30124', '/product/search?categoryId=null', '体育辅助'),
    new ProductsCategoriesLinks('30125', '/product/search?categoryId=null', '运动球拍'),
    new ProductsCategoriesLinks('30126', '/product/search?categoryId=2539', '滑板车 / 滑板'),
    new ProductsCategoriesLinks('30127', '/product/search?categoryId=999', '综合格斗/拳击/武术'),
    new ProductsCategoriesLinks('30128', '/product/search?categoryId=null', '冬季运动')
  ]),
  new ProductsCategoriesSubItem('20018', 'shop-subcategory-sportswear', [
    new ProductsCategoriesLinks('30129', '/product/search?categoryId=1028', 'shop-subcategory-link-sports-accessories'),
    new ProductsCategoriesLinks('30130', '/product/search?categoryId=982', 'shop-subcategory-link-sports-bags'),
    new ProductsCategoriesLinks('30131', '/product/search?categoryId=227', 'shop-subcategory-link-men-footwear'),
    new ProductsCategoriesLinks('30132', '/product/search?categoryId=228', '女士鞋类')
  ]),
  new ProductsCategoriesSubItem('20019', 'shop-subcategory-link-women-sports-apparel', [
    new ProductsCategoriesLinks('30133', '/product/search?categoryId=662', 'shop-subcategory-link-outerwear'),
    new ProductsCategoriesLinks('30134', '/product/search?categoryId=2953', '运动内衣'),
    new ProductsCategoriesLinks('30135', '/product/search?categoryId=669', 'shop-subcategory-link-pants'),
    new ProductsCategoriesLinks('30136', '/product/search?categoryId=null', 'shop-subcategory-link-tops'),
    new ProductsCategoriesLinks('30137', '/product/search?categoryId=670', '短裤'),
    new ProductsCategoriesLinks('30138', '/product/search?categoryId=2166', '泳装'),
    new ProductsCategoriesLinks('30139', '/product/search?categoryId=648', '袜子'),
    new ProductsCategoriesLinks('30140', '/product/search?categoryId=2478', '塑身衣'),
    new ProductsCategoriesLinks('30141', '/product/search?categoryId=7630', '瑜珈裤')
  ]),
  new ProductsCategoriesSubItem('20020', 'shop-subcategory-link-golf', [
    new ProductsCategoriesLinks('30142', '/product/search?categoryId=5504', '高尔夫配件'),
    new ProductsCategoriesLinks('30143', '/product/search?categoryId=null', '高尔夫球手套'),
    new ProductsCategoriesLinks('30144', '/product/search?categoryId=null', '高尔夫球杆'),
    new ProductsCategoriesLinks('30145', '/product/search?categoryId=5338', '高尔夫球'),
    new ProductsCategoriesLinks('30146', '/product/search?categoryId=8146', '高尔夫球袋'),
    new ProductsCategoriesLinks('30147', '/product/search?categoryId=null', '高尔夫球巾'),
    new ProductsCategoriesLinks('30148', '/product/search?categoryId=null', '高尔夫训练辅助工具')
  ]),
  new ProductsCategoriesSubItem('20021', 'shop-subcategory-link-men-sports-apparel', [
    new ProductsCategoriesLinks('30149', '/product/search?categoryId=662', 'shop-subcategory-link-outerwear'),
    new ProductsCategoriesLinks('30150', '/product/search?categoryId=2166', '泳装'),
    new ProductsCategoriesLinks('30151', '/product/search?categoryId=null', 'shop-subcategory-link-tops'),
    new ProductsCategoriesLinks('30152', '/product/search?categoryId=null', '运动短裤'),
    new ProductsCategoriesLinks('30153', '/product/search?categoryId=669', 'shop-subcategory-link-pants'),
    new ProductsCategoriesLinks('30154', '/product/search?categoryId=null', '球衣'),
    new ProductsCategoriesLinks('30155', '/product/search?categoryId=670', '短裤'),
    new ProductsCategoriesLinks('30156', '/product/search?categoryId=4326', '骑行服'),
    new ProductsCategoriesLinks('30157', '/product/search?categoryId=648', '袜子')
  ]),
  new ProductsCategoriesSubItem('20022', 'shop-subcategory-link-cycling', [
    new ProductsCategoriesLinks('30158', '/product/search?categoryId=1434', '自行车'),
    new ProductsCategoriesLinks('30159', '/product/search?categoryId=976', '自行车配件'),
    new ProductsCategoriesLinks('30160', '/product/search?categoryId=null', '防护用具'),
    new ProductsCategoriesLinks('30161', '/product/search?categoryId=957', '登山车'),
    new ProductsCategoriesLinks('30162', '/product/search?categoryId=945', '折叠自行车'),
    new ProductsCategoriesLinks('30163', '/product/search?categoryId=4485', '自行车灯'),
    new ProductsCategoriesLinks('30164', '/product/search?categoryId=3167', '骑行头盔'),
    new ProductsCategoriesLinks('30165', '/product/search?categoryId=null', '单车泵'),
    new ProductsCategoriesLinks('30166', '/product/search?categoryId=4900', '自行车锁'),
    new ProductsCategoriesLinks('30167', '/product/search?categoryId=null', '自行车铃'),
    new ProductsCategoriesLinks('30168', '/product/search?categoryId=null', '零件和组件')
  ]),
  new ProductsCategoriesSubItem('20023', 'shop-subcategory-link-camping-fishing', [
    new ProductsCategoriesLinks('30169', '/product/search?categoryId=230', '露营'),
    new ProductsCategoriesLinks('30170', '/product/search?categoryId=null', '徒步旅行'),
    new ProductsCategoriesLinks('30171', '/product/search?categoryId=2164', '帐篷'),
    new ProductsCategoriesLinks('30172', '/product/search?categoryId=975', '钓鱼'),
    new ProductsCategoriesLinks('30173', '/product/search?categoryId=null', '生存用品'),
    new ProductsCategoriesLinks('30174', '/product/search?categoryId=936', '睡袋'),
    new ProductsCategoriesLinks('30175', '/product/search?categoryId=971', '攀岩扣环'),
    new ProductsCategoriesLinks('30176', '/product/search?categoryId=null', '露营椅'),
    new ProductsCategoriesLinks('30177', '/product/search?categoryId=4923', '指南针'),
    new ProductsCategoriesLinks('30178', '/product/search?categoryId=null', '冷却器')
  ]),
  new ProductsCategoriesSubItem('20024', 'shop-subcategory-link-sports-accessories', [
    new ProductsCategoriesLinks('30179', '/product/search?categoryId=null', '臂章'),
    new ProductsCategoriesLinks('30180', '/product/search?categoryId=4808', '护膝'),
    new ProductsCategoriesLinks('30181', '/product/search?categoryId=2287', '手套'),
    new ProductsCategoriesLinks('30182', '/product/search?categoryId=null', '水瓶'),
    new ProductsCategoriesLinks('30183', '/product/search?categoryId=null', '墨镜'),
    new ProductsCategoriesLinks('30184', '/product/search?categoryId=1434', 'shop-subcategory-link-cycling'),
    new ProductsCategoriesLinks('30185', '/product/search?categoryId=913', '护腕')
  ]),
  new ProductsCategoriesSubItem('20025', 'shop-subcategory-link-swimming-watersports', [
    new ProductsCategoriesLinks('30186', '/product/search?categoryId=940', '泳镜'),
    new ProductsCategoriesLinks('30187', '/product/search?categoryId=948', '泳帽'),
    new ProductsCategoriesLinks('30188', '/product/search?categoryId=4473', '救生衣'),
    new ProductsCategoriesLinks('30189', '/product/search?categoryId=null', '充气船'),
    new ProductsCategoriesLinks('30190', '/product/search?categoryId=708', '干燥袋'),
    new ProductsCategoriesLinks('30191', '/product/search?categoryId=null', '潜水和浮潜'),
    new ProductsCategoriesLinks('30192', '/product/search?categoryId=2319', '浮板')
  ]),
  new ProductsCategoriesSubItem('20026', 'shop-subcategory-link-sports-bags', [
    new ProductsCategoriesLinks('30193', '/product/search?categoryId=null', '健身包'),
    new ProductsCategoriesLinks('30194', '/product/search?categoryId=3542', '防水袋'),
    new ProductsCategoriesLinks('30195', '/product/search?categoryId=null', '束袋包'),
    new ProductsCategoriesLinks('30196', '/product/search?categoryId=964', '游泳包'),
    new ProductsCategoriesLinks('30197', '/product/search?categoryId=null', '鞋包'),
    new ProductsCategoriesLinks('30198', '/product/search?categoryId=null', '瑜伽垫袋'),
    new ProductsCategoriesLinks('30199', '/product/search?categoryId=null', '羽毛球球拍袋'),
    new ProductsCategoriesLinks('30200', '/product/search?categoryId=5724', '徒步旅行背包')
  ])
];
const PRODUCTS_CATEGORIES_ITEM_SNACKS: ProductsCategoriesSubItem[] = [
  new ProductsCategoriesSubItem('20017', 'shop-subcategory-sports-equipment', [
    new ProductsCategoriesLinks('30116', '/product/search?categoryId=5504', 'shop-subcategory-link-golf'),
    new ProductsCategoriesLinks('30117', '/product/search?categoryId=1434', 'shop-subcategory-link-cycling'),
    new ProductsCategoriesLinks('30118', '/product/search?categoryId=230', 'shop-subcategory-link-camping-fishing'),
    new ProductsCategoriesLinks('30119', '/product/search?categoryId=231', 'shop-subcategory-link-swimming-watersports'),
    new ProductsCategoriesLinks('30120', '/product/search?categoryId=5355', 'shop-subcategory-link-home-gym'),
    new ProductsCategoriesLinks('30121', '/product/search?categoryId=null', '瑜伽'),
    new ProductsCategoriesLinks('30122', '/product/search?categoryId=null', '互动式运动设备'),
    new ProductsCategoriesLinks('30123', '/product/search?categoryId=null', '运动补充剂'),
    new ProductsCategoriesLinks('30124', '/product/search?categoryId=null', '体育辅助'),
    new ProductsCategoriesLinks('30125', '/product/search?categoryId=null', '运动球拍'),
    new ProductsCategoriesLinks('30126', '/product/search?categoryId=2539', '滑板车 / 滑板'),
    new ProductsCategoriesLinks('30127', '/product/search?categoryId=999', '综合格斗/拳击/武术'),
    new ProductsCategoriesLinks('30128', '/product/search?categoryId=null', '冬季运动')
  ]),
  new ProductsCategoriesSubItem('20018', 'shop-subcategory-sportswear', [
    new ProductsCategoriesLinks('30129', '/product/search?categoryId=1028', 'shop-subcategory-link-sports-accessories'),
    new ProductsCategoriesLinks('30130', '/product/search?categoryId=982', 'shop-subcategory-link-sports-bags'),
    new ProductsCategoriesLinks('30131', '/product/search?categoryId=227', 'shop-subcategory-link-men-footwear'),
    new ProductsCategoriesLinks('30132', '/product/search?categoryId=228', '女士鞋类')
  ]),
  new ProductsCategoriesSubItem('20019', 'shop-subcategory-link-women-sports-apparel', [
    new ProductsCategoriesLinks('30133', '/product/search?categoryId=662', 'shop-subcategory-link-outerwear'),
    new ProductsCategoriesLinks('30134', '/product/search?categoryId=2953', '运动内衣'),
    new ProductsCategoriesLinks('30135', '/product/search?categoryId=669', 'shop-subcategory-link-pants'),
    new ProductsCategoriesLinks('30136', '/product/search?categoryId=null', 'shop-subcategory-link-tops'),
    new ProductsCategoriesLinks('30137', '/product/search?categoryId=670', '短裤'),
    new ProductsCategoriesLinks('30138', '/product/search?categoryId=2166', '泳装'),
    new ProductsCategoriesLinks('30139', '/product/search?categoryId=648', '袜子'),
    new ProductsCategoriesLinks('30140', '/product/search?categoryId=2478', '塑身衣'),
    new ProductsCategoriesLinks('30141', '/product/search?categoryId=7630', '瑜珈裤')
  ]),
  new ProductsCategoriesSubItem('20020', 'shop-subcategory-link-golf', [
    new ProductsCategoriesLinks('30142', '/product/search?categoryId=5504', '高尔夫配件'),
    new ProductsCategoriesLinks('30143', '/product/search?categoryId=null', '高尔夫球手套'),
    new ProductsCategoriesLinks('30144', '/product/search?categoryId=null', '高尔夫球杆'),
    new ProductsCategoriesLinks('30145', '/product/search?categoryId=5338', '高尔夫球'),
    new ProductsCategoriesLinks('30146', '/product/search?categoryId=8146', '高尔夫球袋'),
    new ProductsCategoriesLinks('30147', '/product/search?categoryId=null', '高尔夫球巾'),
    new ProductsCategoriesLinks('30148', '/product/search?categoryId=null', '高尔夫训练辅助工具')
  ]),
  new ProductsCategoriesSubItem('20021', 'shop-subcategory-link-men-sports-apparel', [
    new ProductsCategoriesLinks('30149', '/product/search?categoryId=662', 'shop-subcategory-link-outerwear'),
    new ProductsCategoriesLinks('30150', '/product/search?categoryId=2166', '泳装'),
    new ProductsCategoriesLinks('30151', '/product/search?categoryId=null', 'shop-subcategory-link-tops'),
    new ProductsCategoriesLinks('30152', '/product/search?categoryId=null', '运动短裤'),
    new ProductsCategoriesLinks('30153', '/product/search?categoryId=669', 'shop-subcategory-link-pants'),
    new ProductsCategoriesLinks('30154', '/product/search?categoryId=null', '球衣'),
    new ProductsCategoriesLinks('30155', '/product/search?categoryId=670', '短裤'),
    new ProductsCategoriesLinks('30156', '/product/search?categoryId=4326', '骑行服'),
    new ProductsCategoriesLinks('30157', '/product/search?categoryId=648', '袜子')
  ]),
  new ProductsCategoriesSubItem('20022', 'shop-subcategory-link-cycling', [
    new ProductsCategoriesLinks('30158', '/product/search?categoryId=1434', '自行车'),
    new ProductsCategoriesLinks('30159', '/product/search?categoryId=976', '自行车配件'),
    new ProductsCategoriesLinks('30160', '/product/search?categoryId=null', '防护用具'),
    new ProductsCategoriesLinks('30161', '/product/search?categoryId=957', '登山车'),
    new ProductsCategoriesLinks('30162', '/product/search?categoryId=945', '折叠自行车'),
    new ProductsCategoriesLinks('30163', '/product/search?categoryId=4485', '自行车灯'),
    new ProductsCategoriesLinks('30164', '/product/search?categoryId=3167', '骑行头盔'),
    new ProductsCategoriesLinks('30165', '/product/search?categoryId=null', '单车泵'),
    new ProductsCategoriesLinks('30166', '/product/search?categoryId=4900', '自行车锁'),
    new ProductsCategoriesLinks('30167', '/product/search?categoryId=null', '自行车铃'),
    new ProductsCategoriesLinks('30168', '/product/search?categoryId=null', '零件和组件')
  ]),
  new ProductsCategoriesSubItem('20023', 'shop-subcategory-link-camping-fishing', [
    new ProductsCategoriesLinks('30169', '/product/search?categoryId=230', '露营'),
    new ProductsCategoriesLinks('30170', '/product/search?categoryId=null', '徒步旅行'),
    new ProductsCategoriesLinks('30171', '/product/search?categoryId=2164', '帐篷'),
    new ProductsCategoriesLinks('30172', '/product/search?categoryId=975', '钓鱼'),
    new ProductsCategoriesLinks('30173', '/product/search?categoryId=null', '生存用品'),
    new ProductsCategoriesLinks('30174', '/product/search?categoryId=936', '睡袋'),
    new ProductsCategoriesLinks('30175', '/product/search?categoryId=971', '攀岩扣环'),
    new ProductsCategoriesLinks('30176', '/product/search?categoryId=null', '露营椅'),
    new ProductsCategoriesLinks('30177', '/product/search?categoryId=4923', '指南针'),
    new ProductsCategoriesLinks('30178', '/product/search?categoryId=null', '冷却器')
  ]),
  new ProductsCategoriesSubItem('20024', 'shop-subcategory-link-sports-accessories', [
    new ProductsCategoriesLinks('30179', '/product/search?categoryId=null', '臂章'),
    new ProductsCategoriesLinks('30180', '/product/search?categoryId=4808', '护膝'),
    new ProductsCategoriesLinks('30181', '/product/search?categoryId=2287', '手套'),
    new ProductsCategoriesLinks('30182', '/product/search?categoryId=null', '水瓶'),
    new ProductsCategoriesLinks('30183', '/product/search?categoryId=null', '墨镜'),
    new ProductsCategoriesLinks('30184', '/product/search?categoryId=1434', 'shop-subcategory-link-cycling'),
    new ProductsCategoriesLinks('30185', '/product/search?categoryId=913', '护腕')
  ]),
  new ProductsCategoriesSubItem('20025', 'shop-subcategory-link-swimming-watersports', [
    new ProductsCategoriesLinks('30186', '/product/search?categoryId=940', '泳镜'),
    new ProductsCategoriesLinks('30187', '/product/search?categoryId=948', '泳帽'),
    new ProductsCategoriesLinks('30188', '/product/search?categoryId=4473', '救生衣'),
    new ProductsCategoriesLinks('30189', '/product/search?categoryId=null', '充气船'),
    new ProductsCategoriesLinks('30190', '/product/search?categoryId=708', '干燥袋'),
    new ProductsCategoriesLinks('30191', '/product/search?categoryId=null', '潜水和浮潜'),
    new ProductsCategoriesLinks('30192', '/product/search?categoryId=2319', '浮板')
  ]),
  new ProductsCategoriesSubItem('20026', 'shop-subcategory-link-sports-bags', [
    new ProductsCategoriesLinks('30193', '/product/search?categoryId=null', '健身包'),
    new ProductsCategoriesLinks('30194', '/product/search?categoryId=3542', '防水袋'),
    new ProductsCategoriesLinks('30195', '/product/search?categoryId=null', '束袋包'),
    new ProductsCategoriesLinks('30196', '/product/search?categoryId=964', '游泳包'),
    new ProductsCategoriesLinks('30197', '/product/search?categoryId=null', '鞋包'),
    new ProductsCategoriesLinks('30198', '/product/search?categoryId=null', '瑜伽垫袋'),
    new ProductsCategoriesLinks('30199', '/product/search?categoryId=null', '羽毛球球拍袋'),
    new ProductsCategoriesLinks('30200', '/product/search?categoryId=5724', '徒步旅行背包')
  ])
];

const PRODUCTS_CATEGORIES_ITEM_HOME_APPLIANCES: ProductsCategoriesSubItem[] = [
  new ProductsCategoriesSubItem('20017', 'shop-subcategory-sports-equipment', [
    new ProductsCategoriesLinks('30116', '/product/search?categoryId=5504', 'shop-subcategory-link-golf'),
    new ProductsCategoriesLinks('30117', '/product/search?categoryId=1434', 'shop-subcategory-link-cycling'),
    new ProductsCategoriesLinks('30118', '/product/search?categoryId=230', 'shop-subcategory-link-camping-fishing'),
    new ProductsCategoriesLinks('30119', '/product/search?categoryId=231', 'shop-subcategory-link-swimming-watersports'),
    new ProductsCategoriesLinks('30120', '/product/search?categoryId=5355', 'shop-subcategory-link-home-gym'),
    new ProductsCategoriesLinks('30121', '/product/search?categoryId=null', '瑜伽'),
    new ProductsCategoriesLinks('30122', '/product/search?categoryId=null', '互动式运动设备'),
    new ProductsCategoriesLinks('30123', '/product/search?categoryId=null', '运动补充剂'),
    new ProductsCategoriesLinks('30124', '/product/search?categoryId=null', '体育辅助'),
    new ProductsCategoriesLinks('30125', '/product/search?categoryId=null', '运动球拍'),
    new ProductsCategoriesLinks('30126', '/product/search?categoryId=2539', '滑板车 / 滑板'),
    new ProductsCategoriesLinks('30127', '/product/search?categoryId=999', '综合格斗/拳击/武术'),
    new ProductsCategoriesLinks('30128', '/product/search?categoryId=null', '冬季运动')
  ]),
  new ProductsCategoriesSubItem('20018', 'shop-subcategory-sportswear', [
    new ProductsCategoriesLinks('30129', '/product/search?categoryId=1028', 'shop-subcategory-link-sports-accessories'),
    new ProductsCategoriesLinks('30130', '/product/search?categoryId=982', 'shop-subcategory-link-sports-bags'),
    new ProductsCategoriesLinks('30131', '/product/search?categoryId=227', 'shop-subcategory-link-men-footwear'),
    new ProductsCategoriesLinks('30132', '/product/search?categoryId=228', '女士鞋类')
  ]),
  new ProductsCategoriesSubItem('20019', 'shop-subcategory-link-women-sports-apparel', [
    new ProductsCategoriesLinks('30133', '/product/search?categoryId=662', 'shop-subcategory-link-outerwear'),
    new ProductsCategoriesLinks('30134', '/product/search?categoryId=2953', '运动内衣'),
    new ProductsCategoriesLinks('30135', '/product/search?categoryId=669', 'shop-subcategory-link-pants'),
    new ProductsCategoriesLinks('30136', '/product/search?categoryId=null', 'shop-subcategory-link-tops'),
    new ProductsCategoriesLinks('30137', '/product/search?categoryId=670', '短裤'),
    new ProductsCategoriesLinks('30138', '/product/search?categoryId=2166', '泳装'),
    new ProductsCategoriesLinks('30139', '/product/search?categoryId=648', '袜子'),
    new ProductsCategoriesLinks('30140', '/product/search?categoryId=2478', '塑身衣'),
    new ProductsCategoriesLinks('30141', '/product/search?categoryId=7630', '瑜珈裤')
  ]),
  new ProductsCategoriesSubItem('20020', 'shop-subcategory-link-golf', [
    new ProductsCategoriesLinks('30142', '/product/search?categoryId=5504', '高尔夫配件'),
    new ProductsCategoriesLinks('30143', '/product/search?categoryId=null', '高尔夫球手套'),
    new ProductsCategoriesLinks('30144', '/product/search?categoryId=null', '高尔夫球杆'),
    new ProductsCategoriesLinks('30145', '/product/search?categoryId=5338', '高尔夫球'),
    new ProductsCategoriesLinks('30146', '/product/search?categoryId=8146', '高尔夫球袋'),
    new ProductsCategoriesLinks('30147', '/product/search?categoryId=null', '高尔夫球巾'),
    new ProductsCategoriesLinks('30148', '/product/search?categoryId=null', '高尔夫训练辅助工具')
  ]),
  new ProductsCategoriesSubItem('20021', 'shop-subcategory-link-men-sports-apparel', [
    new ProductsCategoriesLinks('30149', '/product/search?categoryId=662', 'shop-subcategory-link-outerwear'),
    new ProductsCategoriesLinks('30150', '/product/search?categoryId=2166', '泳装'),
    new ProductsCategoriesLinks('30151', '/product/search?categoryId=null', 'shop-subcategory-link-tops'),
    new ProductsCategoriesLinks('30152', '/product/search?categoryId=null', '运动短裤'),
    new ProductsCategoriesLinks('30153', '/product/search?categoryId=669', 'shop-subcategory-link-pants'),
    new ProductsCategoriesLinks('30154', '/product/search?categoryId=null', '球衣'),
    new ProductsCategoriesLinks('30155', '/product/search?categoryId=670', '短裤'),
    new ProductsCategoriesLinks('30156', '/product/search?categoryId=4326', '骑行服'),
    new ProductsCategoriesLinks('30157', '/product/search?categoryId=648', '袜子')
  ]),
  new ProductsCategoriesSubItem('20022', 'shop-subcategory-link-cycling', [
    new ProductsCategoriesLinks('30158', '/product/search?categoryId=1434', '自行车'),
    new ProductsCategoriesLinks('30159', '/product/search?categoryId=976', '自行车配件'),
    new ProductsCategoriesLinks('30160', '/product/search?categoryId=null', '防护用具'),
    new ProductsCategoriesLinks('30161', '/product/search?categoryId=957', '登山车'),
    new ProductsCategoriesLinks('30162', '/product/search?categoryId=945', '折叠自行车'),
    new ProductsCategoriesLinks('30163', '/product/search?categoryId=4485', '自行车灯'),
    new ProductsCategoriesLinks('30164', '/product/search?categoryId=3167', '骑行头盔'),
    new ProductsCategoriesLinks('30165', '/product/search?categoryId=null', '单车泵'),
    new ProductsCategoriesLinks('30166', '/product/search?categoryId=4900', '自行车锁'),
    new ProductsCategoriesLinks('30167', '/product/search?categoryId=null', '自行车铃'),
    new ProductsCategoriesLinks('30168', '/product/search?categoryId=null', '零件和组件')
  ]),
  new ProductsCategoriesSubItem('20023', 'shop-subcategory-link-camping-fishing', [
    new ProductsCategoriesLinks('30169', '/product/search?categoryId=230', '露营'),
    new ProductsCategoriesLinks('30170', '/product/search?categoryId=null', '徒步旅行'),
    new ProductsCategoriesLinks('30171', '/product/search?categoryId=2164', '帐篷'),
    new ProductsCategoriesLinks('30172', '/product/search?categoryId=975', '钓鱼'),
    new ProductsCategoriesLinks('30173', '/product/search?categoryId=null', '生存用品'),
    new ProductsCategoriesLinks('30174', '/product/search?categoryId=936', '睡袋'),
    new ProductsCategoriesLinks('30175', '/product/search?categoryId=971', '攀岩扣环'),
    new ProductsCategoriesLinks('30176', '/product/search?categoryId=null', '露营椅'),
    new ProductsCategoriesLinks('30177', '/product/search?categoryId=4923', '指南针'),
    new ProductsCategoriesLinks('30178', '/product/search?categoryId=null', '冷却器')
  ]),
  new ProductsCategoriesSubItem('20024', 'shop-subcategory-link-sports-accessories', [
    new ProductsCategoriesLinks('30179', '/product/search?categoryId=null', '臂章'),
    new ProductsCategoriesLinks('30180', '/product/search?categoryId=4808', '护膝'),
    new ProductsCategoriesLinks('30181', '/product/search?categoryId=2287', '手套'),
    new ProductsCategoriesLinks('30182', '/product/search?categoryId=null', '水瓶'),
    new ProductsCategoriesLinks('30183', '/product/search?categoryId=null', '墨镜'),
    new ProductsCategoriesLinks('30184', '/product/search?categoryId=1434', 'shop-subcategory-link-cycling'),
    new ProductsCategoriesLinks('30185', '/product/search?categoryId=913', '护腕')
  ]),
  new ProductsCategoriesSubItem('20025', 'shop-subcategory-link-swimming-watersports', [
    new ProductsCategoriesLinks('30186', '/product/search?categoryId=940', '泳镜'),
    new ProductsCategoriesLinks('30187', '/product/search?categoryId=948', '泳帽'),
    new ProductsCategoriesLinks('30188', '/product/search?categoryId=4473', '救生衣'),
    new ProductsCategoriesLinks('30189', '/product/search?categoryId=null', '充气船'),
    new ProductsCategoriesLinks('30190', '/product/search?categoryId=708', '干燥袋'),
    new ProductsCategoriesLinks('30191', '/product/search?categoryId=null', '潜水和浮潜'),
    new ProductsCategoriesLinks('30192', '/product/search?categoryId=2319', '浮板')
  ]),
  new ProductsCategoriesSubItem('20026', 'shop-subcategory-link-sports-bags', [
    new ProductsCategoriesLinks('30193', '/product/search?categoryId=null', '健身包'),
    new ProductsCategoriesLinks('30194', '/product/search?categoryId=3542', '防水袋'),
    new ProductsCategoriesLinks('30195', '/product/search?categoryId=null', '束袋包'),
    new ProductsCategoriesLinks('30196', '/product/search?categoryId=964', '游泳包'),
    new ProductsCategoriesLinks('30197', '/product/search?categoryId=null', '鞋包'),
    new ProductsCategoriesLinks('30198', '/product/search?categoryId=null', '瑜伽垫袋'),
    new ProductsCategoriesLinks('30199', '/product/search?categoryId=null', '羽毛球球拍袋'),
    new ProductsCategoriesLinks('30200', '/product/search?categoryId=5724', '徒步旅行背包')
  ])
];

const PRODUCTS_CATEGORIES_ITEM_ELECTRONICS: ProductsCategoriesSubItem[] = [
  new ProductsCategoriesSubItem('20027', 'shop-subcategory-mobile-accessories', [
    new ProductsCategoriesLinks('30201', '/product/search?categoryId=1055', 'shop-subcategory-link-cases-covers'),
    new ProductsCategoriesLinks('30202', '/product/search?categoryId=1045', 'shop-subcategory-link-chargers-cables'),
    new ProductsCategoriesLinks('30203', '/product/search?categoryId=4021', 'shop-subcategory-link-earphones-headsets'),
    new ProductsCategoriesLinks('30204', '/product/search?categoryId=3398', 'shop-subcategory-link-screen-protectors'),
    new ProductsCategoriesLinks('30205', '/product/search?categoryId=1046', 'shop-subcategory-link-powerbanks-batteries'),
    new ProductsCategoriesLinks('30206', '/product/search?categoryId=null', '内存/连接线')
  ]),
  new ProductsCategoriesSubItem('20028', 'shop-subcategory-small-appliances', [
    new ProductsCategoriesLinks('30207', '/product/search?categoryId=53', 'shop-subcategory-link-kitchen-appliances'),
    new ProductsCategoriesLinks('30208', '/product/search?categoryId=', 'shop-subcategory-link-medical-devices'),
    new ProductsCategoriesLinks('30209', '/product/search?categoryId=2241', 'shop-subcategory-link-fan'),
    new ProductsCategoriesLinks('30210', '/product/search?categoryId=717', 'shop-subcategory-link-vacuum-cleaner'),
    new ProductsCategoriesLinks('30211', '/product/search?categoryId=3904', 'shop-subcategory-link-personal-grooming'),
    new ProductsCategoriesLinks('30212', '/product/search?categoryId=729', '净水器'),
    new ProductsCategoriesLinks('30213', '/product/search?categoryId=null', '加湿器/除湿机'),
    new ProductsCategoriesLinks('30214', '/product/search?categoryId=null', '电源供应'),
    new ProductsCategoriesLinks('30215', '/product/search?categoryId=738', '空气净化器'),
    new ProductsCategoriesLinks('30216', '/product/search?categoryId=null', '居家监控'),
    new ProductsCategoriesLinks('30217', '/product/search?categoryId=734', '挂烫机/熨斗'),
    new ProductsCategoriesLinks('30218', '/product/search?categoryId=null', '电话/传真'),
    new ProductsCategoriesLinks('30219', '/product/search?categoryId=2594', '缝纫机'),
    new ProductsCategoriesLinks('30220', '/product/search?categoryId=4371', '加热垫'),
    new ProductsCategoriesLinks('30221', '/product/search?categoryId=42', 'shop-subcategory-link-others')
  ]),
  new ProductsCategoriesSubItem('20029', 'shop-subcategory-computer-games', [
    new ProductsCategoriesLinks('30222', '/product/search?categoryId=1648', 'shop-subcategory-link-desktops'),
    new ProductsCategoriesLinks('30223', '/product/search?categoryId=null', 'shop-subcategory-link-peripherals-accessories'),
    new ProductsCategoriesLinks('30224', '/product/search?categoryId=4034', 'shop-subcategory-link-laptops'),
    new ProductsCategoriesLinks('30225', '/product/search?categoryId=1605', 'shop-subcategory-link-printers-scanners'),
    new ProductsCategoriesLinks('30226', '/product/search?categoryId=null', 'shop-subcategory-link-diy-computer-parts'),
    new ProductsCategoriesLinks('30227', '/product/search?categoryId=1616', '键盘/鼠标'),
    new ProductsCategoriesLinks('30228', '/product/search?categoryId=1630', '路由器'),
    new ProductsCategoriesLinks('30229', '/product/search?categoryId=1662', '游戏'),
    new ProductsCategoriesLinks('30230', '/product/search?categoryId=1615', '显示器/投影仪'),
    new ProductsCategoriesLinks('30231', '/product/search?categoryId=null', '外置硬盘/存储'),
    new ProductsCategoriesLinks('30232', '/product/search?categoryId=7646', '电脑软件'),
    new ProductsCategoriesLinks('30233', '/product/search?categoryId=1656', '游戏主机')
  ]),
  new ProductsCategoriesSubItem('20030', 'shop-subcategory-cameras-recorders', [
    new ProductsCategoriesLinks('30234', '/product/search?categoryId=null', 'shop-subcategory-link-camera-accessories'),
    new ProductsCategoriesLinks('30235', '/product/search?categoryId=3962', 'shop-subcategory-link-car-cam-nav-audio'),
    new ProductsCategoriesLinks('30236', '/product/search?categoryId=1833', 'shop-subcategory-link-camcorders-cctv'),
    new ProductsCategoriesLinks('30237', '/product/search?categoryId=1840', 'shop-subcategory-link-action-sports-camera'),
    new ProductsCategoriesLinks('30238', '/product/search?categoryId=1831', 'shop-subcategory-link-digital-camera'),
    new ProductsCategoriesLinks('30239', '/product/search?categoryId=null', '功能相机'),
    new ProductsCategoriesLinks('30240', '/product/search?categoryId=1826', '数码/单反相机')
  ]),
  new ProductsCategoriesSubItem('20031', 'shop-subcategory-smart-tech', [
    new ProductsCategoriesLinks('30241', '/product/search?categoryId=168', 'shop-subcategory-link-smart-gadgets'),
    new ProductsCategoriesLinks('30242', '/product/search?categoryId=null', 'shop-subcategory-link-digital-wearables'),
    new ProductsCategoriesLinks('30243', '/product/search?categoryId=1847', 'shop-subcategory-link-drones')
  ]),
  new ProductsCategoriesSubItem('20032', 'shop-subcategory-mobile-devices', [
    new ProductsCategoriesLinks('30244', '/product/search?categoryId=1054', 'shop-subcategory-link-mobile-phones'),
    new ProductsCategoriesLinks('30245', '/product/search?categoryId=null', 'shop-subcategory-link-speakers-communicators'),
    new ProductsCategoriesLinks('30246', '/product/search?categoryId=1642', 'shop-subcategory-link-tablets-ebooks'),
    new ProductsCategoriesLinks('30247', '/product/search?categoryId=5734', 'shop-subcategory-link-mp3-players')
  ]),
  new ProductsCategoriesSubItem('20033', '影视娱乐', [
    new ProductsCategoriesLinks('30248', '/product/search?categoryId=null', '摆件支架/底座/配件'),
    new ProductsCategoriesLinks('30249', '/product/search?categoryId=null', '家庭音响系统'),
    new ProductsCategoriesLinks('30250', '/product/search?categoryId=342', '电视 / 影像'),
    new ProductsCategoriesLinks('30251', '/product/search?categoryId=null', '音乐/媒体播放器'),
    new ProductsCategoriesLinks('30252', '/product/search?categoryId=4049', '乐器')
  ]),
  new ProductsCategoriesSubItem('20034', 'shop-subcategory-major-appliances', [
    new ProductsCategoriesLinks('30253', '/product/search?categoryId=727', 'shop-subcategory-link-refrigerators'),
    new ProductsCategoriesLinks('30254', '/product/search?categoryId=744', 'shop-subcategory-link-washing-machine'),
    new ProductsCategoriesLinks('30255', '/product/search?categoryId=740', '空调'),
    new ProductsCategoriesLinks('30256', '/product/search?categoryId=2241', 'shop-subcategory-link-mounted-fan'),
    new ProductsCategoriesLinks('30257', '/product/search?categoryId=6908', 'shop-subcategory-link-cooking-equipment'),
    new ProductsCategoriesLinks('30258', '/product/search?categoryId=4447', 'shop-subcategory-link-water-heater')
  ])
];

const PRODUCTS_CATEGORIES_ITEM_TOPUP_VOUCHER: ProductsCategoriesSubItem[] = [
  new ProductsCategoriesSubItem('20054', '旅游&交通', [
    new ProductsCategoriesLinks('30387', '/product/search?categoryId=null', '当地交通'),
    new ProductsCategoriesLinks('30388', '/product/search?categoryId=null', '当地旅游景点'),
    new ProductsCategoriesLinks('30389', '/product/search?categoryId=null', '海外旅游与交通'),
    new ProductsCategoriesLinks('30390', '/product/search?categoryId=null', '海外运输'),
    new ProductsCategoriesLinks('30391', '/product/search?categoryId=null', '住宿设施')
  ]),
  new ProductsCategoriesSubItem('20055', '充值&礼品卡', [
    new ProductsCategoriesLinks('30392', '/product/search?categoryId=null', '海外电话卡'),
    new ProductsCategoriesLinks('30393', '/product/search?categoryId=null', '充值/预付')
  ]),
  new ProductsCategoriesSubItem('20056', '按摩&水疗', [
    new ProductsCategoriesLinks('30394', '/product/search?categoryId=null', '按摩和水疗'),
    new ProductsCategoriesLinks('30395', '/product/search?categoryId=null', '美容服务'),
    new ProductsCategoriesLinks('30396', '/product/search?categoryId=null', '身体与健身')
  ])
];
const PRODUCTS_CATEGORIES_ITEM_TOYS_BABY_PRODUCTS: ProductsCategoriesSubItem[] = [
  new ProductsCategoriesSubItem('20051', '儿童时装', [
    new ProductsCategoriesLinks('30358', '/product/search?categoryId=222', 'shop-subcategory-link-girl-clothing'),
    new ProductsCategoriesLinks('30359', '/product/search?categoryId=null', 'shop-subcategory-link-etc-clothing'),
    new ProductsCategoriesLinks('30360', '/product/search?categoryId=348', 'shop-subcategory-link-bags-shoes'),
    new ProductsCategoriesLinks('30361', '/product/search?categoryId=null', 'shop-subcategory-link-boy-clothing'),
    new ProductsCategoriesLinks('30362', '/product/search?categoryId=null', 'shop-subcategory-link-hats-socks'),
    new ProductsCategoriesLinks('30363', '/product/search?categoryId=6736', '内衣/睡衣'),
    new ProductsCategoriesLinks('30364', '/product/search?categoryId=4058', '配饰/更多'),
    new ProductsCategoriesLinks('30365', '/product/search?categoryId=null', '主题童装')
  ]),
  new ProductsCategoriesSubItem('20052', '玩具', [
    new ProductsCategoriesLinks('30366', '/product/search?categoryId=null', 'shop-subcategory-link-educational-stationeries'),
    new ProductsCategoriesLinks('30367', '/product/search?categoryId=1855', 'shop-subcategory-link-board-games-puzzles'),
    new ProductsCategoriesLinks('30368', '/product/search?categoryId=null', 'shop-subcategory-link-active-games'),
    new ProductsCategoriesLinks('30369', '/product/search?categoryId=1856', 'shop-subcategory-link-building-blocks'),
    new ProductsCategoriesLinks('30370', '/product/search?categoryId=470', 'shop-subcategory-link-plush-toys-dolls'),
    new ProductsCategoriesLinks('30371', '/product/search?categoryId=null', '模型和工具包'),
    new ProductsCategoriesLinks('30372', '/product/search?categoryId=1889', '机器人 / 汽车'),
    new ProductsCategoriesLinks('30373', '/product/search?categoryId=4049', '乐器'),
    new ProductsCategoriesLinks('30374', '/product/search?categoryId=2629', '过家家玩具组'),
    new ProductsCategoriesLinks('30375', '/product/search?categoryId=243', '游乐设施/滑梯'),
    new ProductsCategoriesLinks('30376', '/product/search?categoryId=null', '安全防护/游戏垫')
  ]),
  new ProductsCategoriesSubItem('20053', '婴儿&孕妇', [
    new ProductsCategoriesLinks('30377', '/product/search?categoryId=538', 'shop-subcategory-link-maternity-clothing'),
    new ProductsCategoriesLinks('30378', '/product/search?categoryId=6900', 'shop-subcategory-link-baby-clothing'),
    new ProductsCategoriesLinks('30379', '/product/search?categoryId=2599', 'shop-subcategory-link-feeding'),
    new ProductsCategoriesLinks('30380', '/product/search?categoryId=null', 'shop-subcategory-link-baby-health-bath'),
    new ProductsCategoriesLinks('30381', '/product/search?categoryId=null', 'shop-subcategory-link-home-laundry-cleaner'),
    new ProductsCategoriesLinks('30382', '/product/search?categoryId=5448', '尿布'),
    new ProductsCategoriesLinks('30383', '/product/search?categoryId=null', '汽车安全座椅'),
    new ProductsCategoriesLinks('30384', '/product/search?categoryId=null', '寝具 / 家具'),
    new ProductsCategoriesLinks('30385', '/product/search?categoryId=null', '婴儿皮肤护理'),
    new ProductsCategoriesLinks('30386', '/product/search?categoryId=null', '产后护理用品')
  ])
];

const PRODUCTS_CATEGORIES_ITEM_FASHION: ProductsCategoriesSubItem[] = [
  new ProductsCategoriesSubItem('20008', 'shop-subcategory-women-clothing', [
    new ProductsCategoriesLinks('30045', '/product/search?categoryId=1293', 'shop-subcategory-link-dresses'),
    new ProductsCategoriesLinks('30046', '/product/search?categoryId=null', 'shop-subcategory-link-tops'),
    new ProductsCategoriesLinks('30047', '/product/search?categoryId=2023', 'shop-subcategory-link-shirts-blouses'),
    new ProductsCategoriesLinks('30048', '/product/search?categoryId=1305', 'shop-subcategory-link-skirts'),
    new ProductsCategoriesLinks('30049', '/product/search?categoryId=669', 'shop-subcategory-link-pants'),
    new ProductsCategoriesLinks('30050', '/product/search?categoryId=672', '牛仔裤'),
    new ProductsCategoriesLinks('30051', '/product/search?categoryId=670', '短裤'),
    new ProductsCategoriesLinks('30052', '/product/search?categoryId=662', '外套'),
    new ProductsCategoriesLinks('30053', '/product/search?categoryId=2562', '羊毛衫'),
    new ProductsCategoriesLinks('30054', '/product/search?categoryId=661', '卫衣'),
    new ProductsCategoriesLinks('30055', '/product/search?categoryId=674', '连体裤'),
    new ProductsCategoriesLinks('30056', '/product/search?categoryId=null', '传统服饰'),
    new ProductsCategoriesLinks('30057', '/product/search?categoryId=null', '加大码')
  ]),
  new ProductsCategoriesSubItem('20009', 'shop-subcategory-lingerie-sleepwear', [
    new ProductsCategoriesLinks('30058', '/product/search?categoryId=1275', 'shop-subcategory-link-bras'),
    new ProductsCategoriesLinks('30059', '/product/search?categoryId=6774', 'shop-subcategory-link-panties'),
    new ProductsCategoriesLinks('30060', '/product/search?categoryId=4053', 'shop-subcategory-link-lingerie'),
    new ProductsCategoriesLinks('30061', '/product/search?categoryId=6930', 'shop-subcategory-link-sleepwear'),
    new ProductsCategoriesLinks('30062', '/product/search?categoryId=2478', 'shop-subcategory-link-body-shapers'),
    new ProductsCategoriesLinks('30063', '/product/search?categoryId=null', '内衣配件')
  ]),
  new ProductsCategoriesSubItem('20010', '男士配饰', [
    new ProductsCategoriesLinks('30064', '/product/search?categoryId=70', 'shop-category-shoes'),
    new ProductsCategoriesLinks('30065', '/product/search?categoryId=652', 'shop-category-bags'),
    new ProductsCategoriesLinks('30066', '/product/search?categoryId=653', 'shop-subcategory-accessories'),
    new ProductsCategoriesLinks('30067', '/product/search?categoryId=7336', '旅行/箱包'),
    new ProductsCategoriesLinks('30068', '/product/search?categoryId=7866', 'shop-subcategory-link-wallets'),
    new ProductsCategoriesLinks('30069', '/product/search?categoryId=4054', 'shop-category-jewelry'),
    new ProductsCategoriesLinks('30070', '/product/search?categoryId=42', 'shop-subcategory-link-others')
  ]),
  new ProductsCategoriesSubItem('20011', 'shop-subcategory-men-clothing', [
    new ProductsCategoriesLinks('30071', '/product/search?categoryId=655', 'shop-subcategory-link-t-shirts-polo'),
    new ProductsCategoriesLinks('30072', '/product/search?categoryId=1295', 'shop-subcategory-link-sweater-knitwear'),
    new ProductsCategoriesLinks('30073', '/product/search?categoryId=662', 'shop-subcategory-link-outerwear'),
    new ProductsCategoriesLinks('30074', '/product/search?categoryId=null', 'shop-subcategory-link-innerwear-socks'),
    new ProductsCategoriesLinks('30075', '/product/search?categoryId=null', 'shop-subcategory-link-winter-wear'),
    new ProductsCategoriesLinks('30076', '/product/search?categoryId=2066', 'shop-subcategory-link-pants'),
    new ProductsCategoriesLinks('30077', '/product/search?categoryId=660', '西装'),
    new ProductsCategoriesLinks('30078', '/product/search?categoryId=656', '衬衫'),
    new ProductsCategoriesLinks('30079', '/product/search?categoryId=670', '短裤'),
    new ProductsCategoriesLinks('30080', '/product/search?categoryId=672', '牛仔裤'),
    new ProductsCategoriesLinks('30081', '/product/search?categoryId=null', '加大码'),
    new ProductsCategoriesLinks('30082', '/product/search?categoryId=null', '传统服饰')
  ]),
  new ProductsCategoriesSubItem('20013', 'shop-subcategory-accessories', [
    new ProductsCategoriesLinks('30089', '/product/search?categoryId=277', 'shop-subcategory-link-hair-goods'),
    new ProductsCategoriesLinks('30090', '/product/search?categoryId=650', 'shop-subcategory-link-eyewear'),
    new ProductsCategoriesLinks('30091', '/product/search?categoryId=651', 'shop-subcategory-link-hats-caps'),
    new ProductsCategoriesLinks('30092', '/product/search?categoryId=3315', 'shop-subcategory-link-scarves'),
    new ProductsCategoriesLinks('30093', '/product/search?categoryId=649', 'shop-subcategory-link-belts'),
    new ProductsCategoriesLinks('30094', '/product/search?categoryId=null', '长筒袜'),
    new ProductsCategoriesLinks('30095', '/product/search?categoryId=648', '袜子'),
    new ProductsCategoriesLinks('30096', '/product/search?categoryId=142', '时尚饰品')
  ]),
  new ProductsCategoriesSubItem('20014', 'shop-category-shoes', [
    new ProductsCategoriesLinks('30097', '/product/search?categoryId=1463', '凉鞋'),
    new ProductsCategoriesLinks('30098', '/product/search?categoryId=1462', '高跟鞋'),
    new ProductsCategoriesLinks('30099', '/product/search?categoryId=1021', '拖鞋'),
    new ProductsCategoriesLinks('30100', '/product/search?categoryId=1243', '靴子'),
    new ProductsCategoriesLinks('30101', '/product/search?categoryId=966', '休闲鞋'),
    new ProductsCategoriesLinks('30102', '/product/search?categoryId=null', '平底鞋'),
    new ProductsCategoriesLinks('30103', '/product/search?categoryId=null', '球鞋'),
    new ProductsCategoriesLinks('30104', '/product/search?categoryId=null', '品牌鞋'),
    new ProductsCategoriesLinks('30105', '/product/search?categoryId=1461', '鞋类配件')
  ]),
  new ProductsCategoriesSubItem('20015', 'shop-category-watches', [
    new ProductsCategoriesLinks('30106', '/product/search?categoryId=null', '奢侈手表'),
    new ProductsCategoriesLinks('30107', '/product/search?categoryId=null', '时尚手表'),
    new ProductsCategoriesLinks('30108', '/product/search?categoryId=3417', '电子手表'),
    new ProductsCategoriesLinks('30109', '/product/search?categoryId=799', '腕表配件')
  ]),
  new ProductsCategoriesSubItem('20016', 'shop-category-jewelry', [
    new ProductsCategoriesLinks('30110', '/product/search?categoryId=1131', '项链'),
    new ProductsCategoriesLinks('30111', '/product/search?categoryId=2795', '耳环'),
    new ProductsCategoriesLinks('30112', '/product/search?categoryId=6217', '手链'),
    new ProductsCategoriesLinks('30113', '/product/search?categoryId=1178', '胸针'),
    new ProductsCategoriesLinks('30114', '/product/search?categoryId=6923', '戒指'),
    new ProductsCategoriesLinks('30115', '/product/search?categoryId=null', '金/银条')
  ])
];

const PRODUCTS_CATEGORIES_ITEMS_BEAUTY: ProductsCategoriesSubItem[] = [
  new ProductsCategoriesSubItem('20001', 'shop-subcategory-skin-care', [
    new ProductsCategoriesLinks('30001', '/product/search?categoryId=2717', 'shop-subcategory-link-cleansers'),
    new ProductsCategoriesLinks('30002', '/product/search?categoryId=3317', 'shop-subcategory-link-toners-mist'),
    new ProductsCategoriesLinks('30003', '/product/search?categoryId=3195', 'shop-subcategory-link-serum-essence'),
    new ProductsCategoriesLinks('30004', '/product/search?categoryId=1309', 'shop-subcategory-link-moisturizers-creams'),
    new ProductsCategoriesLinks('30005', '/product/search?categoryId=1323', 'shop-subcategory-link-masks'),
    new ProductsCategoriesLinks('30006', '/product/search?categoryId=3331', '眼部护理'),
    new ProductsCategoriesLinks('30007', '/product/search?categoryId=1312', '防晒'),
    new ProductsCategoriesLinks('30008', '/product/search?categoryId=1339', 'T区护理')
  ]),
  new ProductsCategoriesSubItem('20002', 'shop-subcategory-cosmetics', [
    new ProductsCategoriesLinks('30009', '/product/search?categoryId=6863', 'shop-subcategory-link-lip'),
    new ProductsCategoriesLinks('30010', '/product/search?categoryId=6865', 'shop-subcategory-link-face'),
    new ProductsCategoriesLinks('30011', '/product/search?categoryId=6866', 'shop-subcategory-link-eye-make-up'),
    new ProductsCategoriesLinks('30012', '/product/search?categoryId=6870', 'shop-subcategory-link-men-grooming')
  ]),
  new ProductsCategoriesSubItem('20003', 'shop-subcategory-bath-body', [
    new ProductsCategoriesLinks('30013', '/product/search?categoryId=47', 'shop-subcategory-link-beauty-tools'),
    new ProductsCategoriesLinks('30014', '/product/search?categoryId=2492', 'shop-subcategory-link-body-shower'),
    new ProductsCategoriesLinks('30015', '/product/search?categoryId=2546', 'shop-subcategory-link-nail-care'),
    new ProductsCategoriesLinks('30016', '/product/search?categoryId=2779', 'shop-subcategory-link-foot-care'),
    new ProductsCategoriesLinks('30017', '/product/search?categoryId=1308', '剃须/脱毛'),
    new ProductsCategoriesLinks('30018', '/product/search?categoryId=1309', 'shop-subcategory-link-lotion-cream'),
    new ProductsCategoriesLinks('30019', '/product/search?categoryId=7570', '手部护理'),
    new ProductsCategoriesLinks('30020', '/product/search?categoryId=4069', '身体护理')
  ]),
  new ProductsCategoriesSubItem('20004', 'shop-subcategory-hair-care', [
    new ProductsCategoriesLinks('30021', '/product/search?categoryId=1975', 'shop-subcategory-link-shampoo'),
    new ProductsCategoriesLinks('30022', '/product/search?categoryId=1976', 'shop-subcategory-link-conditioner'),
    new ProductsCategoriesLinks('30023', '/product/search?categoryId=3187', 'shop-subcategory-link-hair-scalp-treatment'),
    new ProductsCategoriesLinks('30024', '/product/search?categoryId=6875', 'shop-subcategory-link-hair-styling-tools'),
    new ProductsCategoriesLinks('30025', '/product/search?categoryId=2839', '染发剂'),
    new ProductsCategoriesLinks('30026', '/product/search?categoryId=null', 'shop-subcategory-link-salon-grade')
  ]),
  new ProductsCategoriesSubItem('20005', 'shop-subcategory-dietary-management', [
    new ProductsCategoriesLinks('30027', '/product/search?categoryId=2906', '膳食补充剂'),
    new ProductsCategoriesLinks('30028', '/product/search?categoryId=1480', '减肥配方'),
    new ProductsCategoriesLinks('30029', '/product/search?categoryId=7813', '维生素'),
    new ProductsCategoriesLinks('30030', '/product/search?categoryId=null', '超级食物'),
    new ProductsCategoriesLinks('30031', '/product/search?categoryId=null', '排毒饮品'),
    new ProductsCategoriesLinks('30032', '/product/search?categoryId=32', '营养保健'),
    new ProductsCategoriesLinks('30033', '/product/search?categoryId=1539', '鱼油'),
    new ProductsCategoriesLinks('30034', '/product/search?categoryId=1487', '胶原蛋白')
  ]),
  new ProductsCategoriesSubItem('20006', 'shop-subcategory-personal-care-medical-supplies', [
    new ProductsCategoriesLinks('30035', '/product/search?categoryId=178', '计生情趣'),
    new ProductsCategoriesLinks('30036', '/product/search?categoryId=6390', '个人卫生'),
    new ProductsCategoriesLinks('30037', '/product/search?categoryId=null', '非处方药'),
    new ProductsCategoriesLinks('30038', '/product/search?categoryId=1791', '医疗用品'),
    new ProductsCategoriesLinks('30039', '/product/search?categoryId=null', '眼耳护理'),
    new ProductsCategoriesLinks('30040', '/product/search?categoryId=null', '急救用品'),
    new ProductsCategoriesLinks('30041', '/product/search?categoryId=null', '戒烟和助眠')
  ]),
  new ProductsCategoriesSubItem('20007', 'shop-subcategory-personal-care-medical-supplies', [
    new ProductsCategoriesLinks('30042', '/product/search?categoryId=7296', '香氛'),
    new ProductsCategoriesLinks('30043', '/product/search?categoryId=null', '品牌护肤品/彩妆'),
    new ProductsCategoriesLinks('30044', '/product/search?categoryId=null', '芳香疗法')
  ])
];

export const PRODUCT_CATEGORIES: ProductsCategories[] = [
  new ProductsCategories(
    '10001',
    'shop-category-beauty',
    '/product/search?categoryId=1',
    '/assets/images/categories/category-cosmetics-min.png',
    PRODUCTS_CATEGORIES_ITEMS_BEAUTY
  ),
  new ProductsCategories(
    '100002',
    'shop-category-fashion',
    '/product/search?categoryId=5',
    '/assets/images/categories/category-apparel-min.png',
    PRODUCTS_CATEGORIES_ITEM_FASHION
  ),
  new ProductsCategories(
    '100003',
    'shop-category-sports',
    '/product/search?categoryId=13',
    '/assets/images/categories/category-sports-min.png',
    PRODUCTS_CATEGORIES_ITEM_SPORTS
  ),
  new ProductsCategories(
    '100004',
    'shop-category-electronics',
    '/product/search?categoryId=2',
    '/assets/images/categories/category-electronics-min.png',
    PRODUCTS_CATEGORIES_ITEM_ELECTRONICS
  ),
  new ProductsCategories(
    '100005',
    'shop-category-home',
    '/product/search?categoryId=27',
    '/assets/images/categories/category-home-min.png',
    PRODUCTS_CATEGORIES_ITEM_HOME_APPLIANCES
  ),
  new ProductsCategories(
    '100006',
    'shop-category-snacks',
    '/product/search?categoryId=8',
    '/assets/images/categories/category-snacksl-min.png',
    PRODUCTS_CATEGORIES_ITEM_SNACKS
  ),
  new ProductsCategories(
    '100007',
    'shop-category-baby',
    '/product/search?categoryId=4',
    '/assets/images/categories/category-toys-min.png',
    PRODUCTS_CATEGORIES_ITEM_TOYS_BABY_PRODUCTS
  ),
  new ProductsCategories(
    '100008',
    'shop-category-topup-voucher',
    '/product/search?categoryId=',
    '/assets/images/categories/category-jewelry-min.png',
    PRODUCTS_CATEGORIES_ITEM_TOPUP_VOUCHER
  )
];

export const PAGES_LINKS = [
  new PagesList('header-home-link', '/', {}),
  new PagesList('header-limited-deals-links', '/product/search', { isLimited: 'true' }),
  new PagesList('header-dropdown-watchlist', '/member/my-favorites/list', {}),
  new PagesList('store-credit-page-title', '/member/point', {})
];
