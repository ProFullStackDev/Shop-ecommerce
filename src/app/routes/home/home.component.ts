import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ProductCategoryAttributes } from '@core/models/ProductCategory';
import { AdPositionEnum, CommonService, ConfigThemeEnum, ConfigThemePOM } from '@core/services/common.service';
import { rewardService } from '@core/services/game/reward.service';
import { ShopArticleService, ArticlePOM } from '@core/services/shop/article.service';
import { ShopBrandService } from '@core/services/shop/brand.service';
import { ProductCategoryPOM, ShopCategoryService } from '@core/services/shop/category.service';
import { CouponPOM, ShopCouponService } from '@core/services/shop/coupon.service';
import { ProductImageType, ProductPOM, ProductQueryParams, ShopProductService } from '@core/services/shop/product.service';
import { EmService } from '@core/system/customerService/em.service';
import { SystemUserService } from '@core/system/system-user.service';
import { GetPrimeModalComponent } from '@routes/dashboard/modules/get-prime-modal/components/get-prime-modal.component';
import {
  ProductsCategories,
  ProductsCategoriesLinks,
  ProductsCategoriesSubItem
} from '@shared/components/nav-panel/models/nav-panel.model';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { ProductCategoriesService } from '@shared/services/productCategories/product-categories.service';
import { SkeletonService } from '@shared/services/skeletonService/skeleton.service';
import { getProductCover } from '@shared/utils/utils';
import { forkJoin, Observable, filter, startWith, take, takeUntil, map, EMPTY } from 'rxjs';
import SwiperCore, { Pagination, Navigation, Autoplay, EffectCoverflow, SwiperOptions } from 'swiper';

import { CHANEL_NAMES } from '../../mock/home-blocks.mock';

SwiperCore.use([Pagination, Navigation, Autoplay, EffectCoverflow]);
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent extends DestroySubscription implements OnInit {
  userPrimeInfo: any;
  homePage = true;
  isMobile = false;
  countUpOptions: any = {
    decimalPlaces: 2,
    duration: 1
  };

  constructor(
    private categoryService: ShopCategoryService,
    private commonService: CommonService,
    private brandService: ShopBrandService,
    private productService: ShopProductService,
    private couponService: ShopCouponService,
    private readonly productCategories: ProductCategoriesService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly skeletonService: SkeletonService,
    private readonly renderer: Renderer2,
    @Inject(DOCUMENT) private readonly document: Document,
    private articleSrv: ShopArticleService,
    private userService: SystemUserService,
    private readonly overlayService: OverlayService,
    private customSrv: EmService,
    private reward: rewardService
  ) {
    super();
  }

  silderValue: boolean = false;
  array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  mainSwiperAdPositionName = AdPositionEnum.HOME_MAIN_SWIPER_AD;
  asideSwiperAdPositionName = AdPositionEnum.HOME_ASIDE_SWIPER_AD;
  middleAdPositionName = AdPositionEnum.HOME_MIDDLE_AD;
  bottomAdPositionName = AdPositionEnum.HOME_BOTTOM_AD;
  allCategory: ProductCategoryPOM[] = [];
  themeConfig: ConfigThemePOM[] = [];
  categoryTree: ProductCategoryPOM[] = [];
  currentMoreCategory: ProductCategoryPOM;
  moreCategoryList: ProductCategoryPOM[] = [];
  foundGoodsList: ProductPOM[] = [];
  hotGoodsList: ProductPOM[] = [];
  newGoodsList: ProductPOM[] = [];
  leaderboardList: ProductPOM[] = [];
  wishListItems: any;
  channelData: Array<{ name: string; link: string; description?: string; productList: ProductPOM[] }> = [];
  public productCategories$: Observable<ProductsCategories[]>;
  width: number;
  allowTouchMove: boolean;
  stop: any;

  recommendTabs: Array<{
    categoryTreePath: string;
    meta: any;
    key: string;
    title: string;
  }> = [];
  recommendKey: string = '';
  recommendGoods: {
    [key: string]: ProductPOM[];
  } = {};

  swiperConfig: SwiperOptions = {
    slidesPerView: 5,
    spaceBetween: 20,
    loopFillGroupWithBlank: true,
    loop: true,
    loopedSlides: 5,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    on: {
      init() {
        this.autoplayPause;
        this.autoplayResume;
      }
    },
    breakpoints: {
      1200: {
        slidesPerView: 5
      },
      980: {
        slidesPerView: 4
      },
      820: {
        slidesPerView: 3
      },
      425: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1.6
      }
    }
  };
  
  get currentRecommendList() {
    return this.recommendGoods[this.recommendKey];
  }

  // get selectedSku() {
  //   return this.skuList.find(sku =>
  //     sku.specifications.every(specification => Object.values(this.specificationMap).includes(specification.id))
  //   );
  // }

  couponList: CouponPOM[] = [];
  showMoreCategory: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    let t, l, w, h;
    if (document.documentElement && document.documentElement.scrollTop) {
      t = document.documentElement.scrollTop;
      l = document.documentElement.scrollLeft;
      w = document.documentElement.scrollWidth;
      h = document.documentElement.scrollHeight;
      if (t > 400) {
        this.silderValue = true;
      } else {
        this.silderValue = false;
      }
    }
  }

  ngOnInit(): void {
    if (window && window.innerWidth <= 1200) {
      this.homePage = false;
    }

    if (window && window.innerWidth <= 992) {
      this.isMobile = true;
    }
    this.customSrv.getScript();
    this.customSrv.load(this.userService.userInfo);

    this.userPrime();
    this.wishListItems = this.localStorageService.getItem('wishListItems') ? this.localStorageService.getItem('wishListItems') : [];

    // TODO: Hide Skeleton Loading
    //this.setSkeleton();

    // this.productCategories$ = this.productCategories.getProductsCategories().pipe(take(1));
    this.productCategories$ = this.productCategories.getProductsCategories1();
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        startWith(null),
        takeUntil(this.destroyStream$)
      )
      .subscribe(() => {
        this.queryAllCategory();
      });
      this.width = window.innerWidth;
      this.allowTouchMove = this.width > 1200;
      this.queryAllCategory();
  }

  get pointStatistics() {
    return this.userService.cashBackData;
  }

  userPrime(): void {
    let primeInfo;
    const hasPrime = this.userService.showPrime;
    if (!hasPrime) {
      return;
    }
    const vipLevel = this.userService.userData?.vipLevel;
    switch (vipLevel) {
      case 0:
        primeInfo = null;
        break;
      case 1:
        primeInfo = {
          image: '/assets/images/get-prime-modal/ticket-bronze.png',
          text: 'prime-bronze-title',
          features: [
            {
              perk: 'prime-bronze-perk-one'
            },
            {
              perk: 'prime-bronze-perk-two'
            },
            {
              perk: 'prime-bronze-perk-three'
            }
          ]
        };
        break;
      case 2:
        primeInfo = {
          image: '/assets/images/get-prime-modal/ticket-silver.png',
          text: 'prime-silver-title',
          features: [
            {
              perk: 'prime-silver-perk-one'
            },
            {
              perk: 'prime-silver-perk-two'
            },
            {
              perk: 'prime-silver-perk-three'
            }
          ]
        };
        break;
      case 3:
        primeInfo = {
          image: '/assets/images/get-prime-modal/ticket-gold.png',
          text: 'prime-gold-title',
          features: [
            {
              perk: 'prime-gold-perk-one'
            },
            {
              perk: 'prime-gold-perk-two'
            },
            {
              perk: 'prime-gold-perk-three'
            }
          ]
        };
        break;
      default:
        primeInfo = null;
    }
    this.userPrimeInfo = {
      hasPrime,
      primeInfo
    };
  }

  setSkeleton(): void {
    const goods = this.document.querySelector('.found-goods-swiper');
    const leaderBoards = this.document.querySelectorAll('.leader-board');
    const newProduct = this.document.querySelector('.new-product');
    const content = this.document.querySelector('.hot-goods-bord .content');
    const block1 = this.document.querySelector('.app-shop-ad');
    const block2 = this.document.querySelector('#channel .content-title-style');
    const block3 = this.document.querySelector('#recommend .content-title-style');
    const block4 = this.document.querySelector('.nav-tabs');
    const block5 = this.document.querySelector('.product-category-content');

    const elementsArray = [goods, newProduct, content, block1, block2, block3, block4, block5];

    this.skeletonService.setSkeleton(elementsArray, leaderBoards);
  }

  appendNumber = 4;
  prependNumber = 1;

  category: Array<Partial<ProductCategoryAttributes>> = [
    {
      name: '123',
      icon: '5645'
    }
  ];
  categoryMouseenter(categoryId: number) {
    this.showMoreCategory = true;
    const targetCategory = this.categoryTree.find(item => Object.is(item.id, categoryId));

    if (targetCategory) {
      this.currentMoreCategory = targetCategory;
      if (targetCategory.child && targetCategory.child.length > 0) {
        this.moreCategoryList = targetCategory.child;
      }
    }
  }

  categoryMouseleave() {
    this.showMoreCategory = false;
  }

  toggleWishlist(good: any) {
    if (this.wishListItems[good.id]) {
      delete this.wishListItems[good.id];
    } else {
      this.wishListItems[good.id] = {
        id: good.id,
        title: good.name,
        price: good.price,
        cover: good.cover
      };
    }

    this.localStorageService.setItem('wishListItems', { ...this.wishListItems });
  }

  isActive(goodId: number) {
    return this.wishListItems[goodId] !== undefined;
  }

  bannerListIcon = [
    {
      icon: 'tgicon-huiyuan',
      words: 'home-right-menu-member',
      link: '/member/order/list'
    },
    {
      icon: 'tgicon-jifen',
      words: 'home-right-menu-dollars',
      link: '/member/point'
    },
    {
      icon: 'tgicon-dingdan',
      words: 'home-right-menu-order',
      link: '/member/order/list'
    },
    {
      icon: 'tgicon-shoucang',
      words: 'home-right-menu-wishlist',
      link: '/member/my-favorites/list'
    },
    {
      icon: 'tgicon-chongzhi',
      words: 'home-right-menu-credits',
      link: '/member/point'
    },
    {
      icon: 'tgicon-help',
      words: 'home-right-menu-help',
      link: 'https://about.tyqoon.co/faq/',
      targetBlank: true
    }
  ];
  goodLogo = `https://image.demo.b2b2c.shopxx.net/9.0/9956e86d-a5ca-40fb-ac46-c67a93bab2c9.jpg`;
  linkCompanyList = [
    { index: 0, url: 'https://image.demo.b2b2c.shopxx.net/9.0/fc8a80af-7fe1-44d2-a81b-564900d0a166.png' },
    { index: 1, url: 'https://image.demo.b2b2c.shopxx.net/9.0/27ebf729-400e-424e-837d-00c23a0f7818.png' },
    { index: 2, url: 'https://image.demo.b2b2c.shopxx.net/9.0/0625d640-5136-4106-b33b-999c0d0f9f8e.png' },
    { index: 3, url: 'https://image.demo.b2b2c.shopxx.net/9.0/fc89ade2-5b21-4233-9b61-08e28e7c826a.png' },
    { index: 4, url: 'https://image.demo.b2b2c.shopxx.net/9.0/2a66066c-2d26-4a1b-afa5-df32bbf5becb.png' },
    { index: 5, url: 'https://image.demo.b2b2c.shopxx.net/9.0/f497b2a8-bffb-4ddd-93e6-b6f0e6d29e7c.png' },
    { index: 6, url: 'https://image.demo.b2b2c.shopxx.net/9.0/eb9cc7d6-b61b-4003-8eed-c151bf5e5e4c.png' },
    { index: 7, url: 'https://image.demo.b2b2c.shopxx.net/9.0/457772af-446c-489d-9232-58cdc79e3748.png' },
    { index: 8, url: 'https://image.demo.b2b2c.shopxx.net/9.0/b3031acc-8053-4d9d-adf3-c9d84ab0a416.png' },
    { index: 9, url: 'https://image.demo.b2b2c.shopxx.net/9.0/f1e27bcc-c80d-4dd7-8f65-6df3fcfd6096.png' }
  ];
  linkCompanyListtrackBy() {}

  queryAllCategory() {
    // TODO: cache data
    // forkJoin([this.commonService.queryConfigTheme(), this.categoryService.queryAll()])
    forkJoin([this.commonService.queryConfigTheme()])
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        ([themeConfig]) => {
          this.themeConfig = themeConfig;
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.getChannelData();
        this.getData();
      });
  }

  generateCategoryItem(categoryItem: ProductCategoryPOM): ProductCategoryPOM {
    const childCategory = this.allCategory.filter(item => Object.is(item.parentId, categoryItem.id));
    return {
      ...categoryItem,
      ...(childCategory.length > 0 ? { child: childCategory.map(item => this.generateCategoryItem(item)) } : {})
    };
  }

  generateProduct(product: ProductPOM): ProductPOM {
    return {
      ...product,
      cover: getProductCover(product.productImages || '{}', ProductImageType.THUMBNAIL)
    };
  }
  getChannelData() {
    const goods = this.document.querySelector('.found-goods-swiper');
    const leaderBoards = this.document.querySelectorAll('.leader-board');
    const newProduct = this.document.querySelector('.new-product');
    const content = this.document.querySelector('.hot-goods-bord .content');
    const block1 = this.document.querySelector('.app-shop-ad');
    const block2 = this.document.querySelector('#channel .content-title-style');
    const block3 = this.document.querySelector('#recommend .content-title-style');
    const block4 = this.document.querySelector('.nav-tabs');
    const block5 = this.document.querySelector('.product-category-content');

    const elementsArray = [goods, newProduct, content, block1, block2, block3, block4, block5];
    const channelThemeConfig = this.themeConfig.find(config => Object.is(config.theme, ConfigThemeEnum.ChannelSquare));
    const channelList: Array<{ meta: Object; title: string }> = JSON.parse((channelThemeConfig || {}).data || '[]');
    forkJoin(
      channelList.map(item => {
        const params = item.meta;
        return this.productService.query(params as ProductQueryParams);
      })
    )
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        dataList => {
          this.channelData = channelList.map((item, index) => ({
            name: CHANEL_NAMES[index].name,
            link: CHANEL_NAMES[index].link,
            // description: item.description || '',
            productList: dataList[index].rows.map(this.generateProduct)
          }));

          // TODO: Hide Skeleton Loading
          // this.skeletonService.toggleSkeleton(elementsArray, leaderBoards);
        },
        () => {
          // TODO: Hide Skeleton Loading
          //this.skeletonService.toggleSkeleton(elementsArray, leaderBoards);
        }
      );
  }

  getData() {
    forkJoin([
      this.productService.query({ page: 0, rows: 10, productTagName: '发现好物' }),
      this.couponService.query({ page: 0, rows: 3 }),
      this.productService.query({ page: 0, rows: 10, isHot: 'true', allowUsePoint: 'false' }),
      this.productService.query({ page: 0, rows: 4, isNew: 'true' }),
      this.productService.query({ page: 0, rows: 6, isLeaderboard: 'true' })
    ])
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        ([foundGood, coupon, hot, newGoods, leaderboard]) => {
          this.foundGoodsList = foundGood.rows.map(this.generateProduct);
          this.couponList = coupon.rows;
          this.hotGoodsList = hot.rows.map(this.generateProduct);
          this.newGoodsList = newGoods.rows.map(this.generateProduct);
          this.leaderboardList = leaderboard.rows.map(this.generateProduct);
        },
        error => {
          console.log(error);
        }
      );
  }

  backToTop() {
    document.documentElement.scrollTop = 0;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth;
    this.allowTouchMove = this.width > 1200;
    this.homePage = this.width >= 1200;
    this.isMobile = this.width <= 992;
  }

  scrollOnSelect(e: any) {
    e.target.scrollIntoView({ inline: 'start', behavior: 'smooth', block: 'nearest' });
  }

  openPrimeModal() {
    const ref = this.overlayService.open(
      GetPrimeModalComponent,
      { productPage: true },
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  goByUrl(item: any): any {
    if (item.targetBlank) {
      return window.open(item.link);
    }
    this.router.navigate([item.link]);
  }
}
