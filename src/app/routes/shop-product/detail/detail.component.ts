import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponPOM, ShopCouponService } from '@core/services/shop/coupon.service';
import {
  ConsultationPOM,
  ProductImageType,
  ProductPOM,
  ProductSkuPOM,
  ProductSpecification,
  ReviewPOM,
  ShopProductService,
  ShopScoreType,
  SpecificationPOM,
  ReviewTotal
} from '@core/services/shop/product.service';
import { EmService } from '@core/system/customerService/em.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { GetPrimeModalComponent } from '@routes/dashboard/modules/get-prime-modal/components/get-prime-modal.component';
import { SharedModalComponent } from '@routes/dashboard/modules/shared-modal/components/shared-modal/shared-modal.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { WINDOW } from '@shared/helpers/window';
import { PlansList } from '@shared/models/get-prime-modal.model';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { PLANS_LIST } from '@shared/statics/get-prime-modal/get-prime-modal.static';
import { getProductCover, isNullOrUndefinedOrEmpty } from '@shared/utils/utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { forkJoin, EMPTY, Observable, map, takeUntil, take } from 'rxjs';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';

SwiperCore.use([Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less'],
  providers: [ShopProductService, ShopCouponService]
})
export class DetailComponent extends DestroySubscription implements OnInit, OnDestroy {
  readonly plansList: PlansList[] = PLANS_LIST;
  readonly sharedModal = SharedModalComponent;
  public isScrolled = false;
  public showList = false;
  chosenPlan: string | undefined;
  public primeData = {
    prime: null
  };

  get hasPrime() {
    let plan;
    switch (this.userService.userData?.vipLevel) {
      case 0:
        plan = null;
        break;
      case 1:
        plan = 'bronze';
        break;
      case 2:
        plan = 'silver';
        break;
      case 3:
        plan = 'gold';
        break;
      case 4:
        plan = 'no prime';
        break;
      default:
        plan = null;
    }

    return plan;
  }

  constructor(
    private route: ActivatedRoute,
    private productSrv: ShopProductService,
    private couponSrv: ShopCouponService,
    private sanitizer: DomSanitizer,
    private userSrv: SystemUserService,
    private router: Router,
    private cartService: SystemCartService,
    private message: NzMessageService,
    private customSrv: EmService,
    private readonly localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(WINDOW) protected readonly window: Window,
    private readonly overlayService: OverlayService,
    private readonly userService: SystemUserService
  ) {
    super();
  }

  productId!: string;
  productInfo!: ProductPOM;
  reviewList: ReviewPOM[] = [];
  reviewTotal: ReviewTotal = { averageScore: '0', total: 0 };
  consultationList: ConsultationPOM[] = [];
  couponList: CouponPOM[] = [];
  specificationItems: SpecificationPOM[] = [];
  specificationMap: { [key: string]: number } = {};
  skuList: ProductSkuPOM[] = [];
  quantity = 1;
  wishListItems: any;
  stockCountList: number[] = [];

  loading = {
    detail: false,

    otherInfo: false,
    addToCart: false
  };

  get getReviewTotal() {
    return {
      averageScore: Number(this.reviewTotal.averageScore),
      total: this.reviewTotal.total
    };
  }

  get introductionHTML(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.productInfo?.introduction || '');
  }

  get parameterValues(): Array<{ group: string; entries: Array<{ name: string; value: string }> }> {
    return JSON.parse(this.productInfo?.parameterValues || '[]');
  }

  get canBuy() {
    return this.stockCount > 0;
  }

  get showPrime() {
    return this.userSrv.showPrime;
  }

  get stockCount() {
    return this.selectedSku?.stock || 0;
  }

  get selectedSku() {
    return this.skuList.find(sku =>
      sku.specifications.every(specification => Object.values(this.specificationMap).includes(specification.id))
    );
  }

  get cashbackByDays() {
    return (Number(this.selectedSku?.cashBack) / 45).toFixed(4);
  }

  get specificationSelectable() {
    const selectedSpecIds = Object.values(this.specificationMap);
    if (this.specificationItems.length < 2) {
      return new Set(this.specificationItems[0].entries.map(item => item.id));
    }
    return this.skuList.reduce((list, sku) => {
      const skuSpecIds = sku.specifications.map(spec => spec.id);
      if (!skuSpecIds.some(id => selectedSpecIds.includes(id))) {
        return list;
      }
      selectedSpecIds.forEach(id => {
        skuSpecIds.filter(specId => !Object.is(id, specId)).forEach(specId => list.add(specId));
      });
      return list;
    }, new Set());
  }

  get cover() {
    return getProductCover(this.productInfo?.productImages || '', ProductImageType.THUMBNAIL);
  }

  get actualPrice() {
    if (!this.selectedSku || !this.selectedSku) {
      return null;
    }
    return this.selectedSku?.price - this.selectedSku?.cashBack;
  }

  ngOnInit(): void {
    this.userSrv.updateUserInfo();

    this.wishListItems = this.localStorageService.getItem('wishListItems')! ? this.localStorageService.getItem('wishListItems') : [];
    this.window.addEventListener('scroll', () => {
      const number = this.window.scrollY;
      this.isScrolled = number >= 201;
    });
    this.route.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      this.productId = params.id;
      if (!isNullOrUndefinedOrEmpty(params.id)) {
        this.getProductDetail();
      }
    });
  }

  // @ts-ignore
  ngOnDestroy(): void {
    this.window.removeEventListener('scroll', () => {});
  }

  getProductDetail() {
    this.loading.detail = true;
    const { productId } = this;
    this.productSrv
      .query({ rows: 1, page: 0, productId: [productId] })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          if (res.rows.length > 0) {
            this.productInfo = res.rows[0];
            this.loading.otherInfo = true;
            this.specificationItems = JSON.parse(this.productInfo.specificationItems || '[]').map((item: SpecificationPOM) => ({
              ...item,
              entries: item.entries.filter(entrie => entrie.isSelected)
            }));
            forkJoin([
              this.productSrv.querySkuByProductId(productId),
              this.productSrv.queryReview({ productId, scoreType: ShopScoreType.ShopScoreTypeByAll, page: 0, rows: 3 }),
              this.productSrv.queryConsultation({ productId, page: 0, rows: 3 }),
              this.couponSrv.query({ page: 0, rows: 5, storeId: '1' })
            ])
              .pipe(takeUntil(this.destroyStream$))
              .subscribe(
                ([skuList, reviewList, consultationList, couponList]) => {
                  const defaultSpecificationIdList = JSON.parse(this.productInfo.defaultSku.specificationValues || '[]').map(
                    (item: ProductSpecification) => item.id
                  );
                  this.specificationMap = this.specificationItems.reduce((obj, cur) => {
                    const targetSpecification = cur.entries.find(item => defaultSpecificationIdList.includes(item.id));
                    obj[`specification-${cur.name}`] = targetSpecification ? targetSpecification.id : undefined;
                    return obj;
                  }, {});
                  this.skuList = skuList.map(sku => ({
                    ...sku,
                    specifications: JSON.parse(sku.specificationValues || '[]')
                  }));
                  if (this.skuList.length) {
                    for (let i = 1; i <= this.skuList[0].stock; i++) {
                      this.stockCountList.push(i);
                    }
                  }
                  this.reviewList = reviewList.rows;
                  this.reviewTotal = reviewList.reviewTotal;
                  this.consultationList = consultationList.rows;
                  this.couponList = couponList.rows;
                },
                error => {
                  console.log(error);
                }
              )
              .add(() => {
                this.loading.otherInfo = false;
              });
            return;
          }
          // TODO: goto empty page
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.detail = false;
      });
  }

  customerSupport(val: any) {
    const shareLink = location.href;
    this.customSrv.sendProduct(val, shareLink);
  }

  toggleWishlist(good: any) {
    if (this.wishListItems[good.id]) {
      delete this.wishListItems[good.id];
    } else {
      this.wishListItems[good.id] = {
        id: good.id,
        title: good.name,
        price: good.price,
        cover: getProductCover(good.productImages, ProductImageType.THUMBNAIL)
      };
    }

    this.localStorageService.setItem('wishListItems', { ...this.wishListItems });
  }

  isActive(goodId: number) {
    return this.wishListItems[goodId] !== undefined;
  }

  specificationChange() {
    this.quantity = this.stockCount < 1 ? 0 : Math.min(this.quantity, this.stockCount);
  }

  addToCart() {
    this.cartService.quantity$.next(0);
    this.cartService.quantity$.next(this.quantity);
    const sku = this.selectedSku || this.productInfo.defaultSku;
    this.loading.addToCart = true;
    this.cartService
      .addCart({
        productId: this.productInfo.id,
        productName: this.productInfo.name,
        skuPrice: sku.price,
        priceTotal: sku.price,
        skuId: sku.id,
        skuExchangePoint: sku.exchangePoint,
        exchangePointTotal: sku.exchangePoint,
        quantity: this.quantity,
        cover: this.cover
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.message.success('添加成功');
          this.cartService.getCart().pipe(takeUntil(this.destroyStream$)).subscribe();
        },
        error => {
          this.message.error(error.message);
        }
      )
      .add(() => {
        this.loading.addToCart = false;
      });
  }

  buyNow() {
    if (!this.userSrv.isLogin()) {
      this.userSrv.showConfirmLoginModal();
      return;
    }
    if (!this.selectedSku) return;
    const { quantity, selectedSku, productId, productInfo, cover } = this;
    const data = [
      {
        storeId: productInfo.storeId,
        // storeName: cur.name,
        // isSelfEmployed: cur.isSelfEmployed,
        productOrder: [
          {
            skuId: selectedSku.id,
            quantity,
            productId,
            productName: productInfo.name,
            cover,
            skuSpec:
              selectedSku.specifications && selectedSku.specifications.length > 0
                ? selectedSku.specifications.reduce<string>((str, cur, index) => {
                    return `${str + cur.value}${Object.is(selectedSku.specifications.length - 1, index) ? ']' : ','}`;
                  }, '[')
                : '',
            skuExchangePoint: selectedSku.exchangePoint,
            skuPrice: selectedSku.price,
            exchangePointTotal: selectedSku.exchangePoint * quantity,
            priceTotal: selectedSku.price * quantity,
            skuStock: selectedSku.stock
          }
        ]
      }
    ];
    this.router.navigate(['/order/confirm'], {
      queryParams: {
        o: btoa(encodeURIComponent(JSON.stringify(data)))
      }
    });
  }

  togglePlansList(value?: ProductSkuPOM) {
    this.showList = !this.showList;
    const price = value?.cashBack || 0;
    const noPrimeDay = 365;
    const bronzeDay = 180;
    const silverDay = 90;
    const goldDay = 30;
    this.plansList[0].price = String(Number(price) / noPrimeDay);
    this.plansList[1].price = String(Number(price) / bronzeDay);
    this.plansList[2].price = String(Number(price) / silverDay);
    this.plansList[3].price = String(Number(price) / goldDay);
    // console.log(price, 'this......', this.plansList);
  }

  openPrimeModal() {
    this.openModal(GetPrimeModalComponent)
      ?.pipe(takeUntil(this.destroyStream$))
      .subscribe((data: any) => {
        if (Object.keys(data.prime).length) {
          this.primeData.prime = data.prime;
          this.chosenPlan = this.plansList.find(item => item.value === data.prime)?.image;
        }
      });
  }

  openModal(component: any): Observable<any> | null {
    const ref = this.overlayService.open(
      component,
      { productPage: true },
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }
}
