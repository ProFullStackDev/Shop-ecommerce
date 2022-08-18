import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ProductImageType, ProductSkuPOM, ShopProductService } from '@core/services/shop/product.service';
import { CartItemPOM, CartPOM, UserCartService } from '@core/services/user/cart.service';
import { OrderCouponsParams } from '@core/services/user/order.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { SystemVoucherService } from '@core/system/system-voucher.service';
import { HoldUpComponent } from '@routes/shopping-cart/components/hold-up/hold-up.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { svgRebateAnimation } from '@shared/helpers/rebate-credits-animation';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { REBATE_SVG } from '@shared/statics/rebate-svg/rebate.static';
import { getProductCover } from '@shared/utils/utils';
import { debounceTime, map, Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

const defaultProductCover = 'src/assets/images/default-product-cover.png';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.less'],
  providers: [UserCartService, ShopProductService]
})
export class ShoppingCartComponent extends DestroySubscription implements OnInit {
  constructor(
    private userCartSrv: UserCartService,
    private sysCartSrv: SystemCartService,
    private router: Router,
    private userService: SystemUserService,
    public voucherService: SystemVoucherService,
    private shopProductService: ShopProductService,
    private overlayService: OverlayService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  cartItemModify$ = new Subject<{ skuId: string; quantity: number }>();

  rebateSvg = ``;
  isDisabledAddCoupon = false;

  ngOnInit(): void {
    this.queryCart();
    this.cartItemModify$
      .asObservable()
      .pipe(debounceTime(500), takeUntil(this.destroyStream$))
      .subscribe(({ skuId, quantity }) => this.cartItemModify(skuId, quantity));
    this.queryVoucher();
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationStart),
        startWith(null),
        takeUntil(this.destroyStream$)
      )
      .subscribe(() => {
        this.sysCartSrv.cardVoucher$.next(0);
      });
  }

  get pointStatistics() {
    return this.userService.cashBackData;
  }

  cartGroup: CartPOM[] = [];

  colSpan = {
    checkbox: 2,
    productInfo: 10,
    price: 4,
    quantity: 3,
    total: 4,
    operation: 1
  };

  loading = {
    query: false,
    modify: false,
    settlement: false,
    delAllCartItem: false,
    delCartItem: false,
    delCartItemIdsIds: ['']
  };

  checkAll = true;

  voucherNum = 0;
  voucherSkuId = this.voucherService.skuId;
  voucherValue = this.voucherService.defaultPrice;

  get userInfo() {
    return this.userService.userInfo;
  }

  get cashBackData() {
    return this.userService.cashBackData;
  }

  get showBuyCreditsTips() {
    return this.cashbackProgress < 100;
  }

  get totalCashback() {
    return this.cartGroup.reduce<number>((num, group) => {
      group.items.filter(items => items.checked).forEach(item => (num += Number(item.cashBack * item.quantity) || 0));
      return num;
    }, 0);
  }

  get realCashback() {
    return Math.min(this.totalCashback, Number(this.cashBackData?.myRebateCredits || 0) + this.voucherNum * this.voucherValue * 10);
  }

  get cashbackProgress() {
    return Math.min((this.realCashback / this.totalCashback) * 100, 100);
  }

  get priceTotal() {
    return (
      this.cartGroup.reduce<number>((num, group) => {
        group.items.filter(items => items.checked).forEach(item => (num += Number(item.priceTotal) || 0));
        return num;
      }, 0) +
      this.voucherNum * this.voucherValue
    );
  }

  get exchangePointTotal() {
    return this.cartGroup.reduce<number>((num, group) => {
      group.items.filter(items => items.checked).forEach(item => (num += Number(item.exchangePointTotal) || 0));
      return num;
    }, 0);
  }

  get canSettlement() {
    return this.cartGroup.some(group => group.items.some(item => item.checked));
  }

  checkAllChange(checked: boolean) {
    this.cartGroup.forEach(group => {
      group.checked = checked;
      group.checkedIndeterminate = false;
      group.items.forEach(item => {
        item.checked = checked;
      });
    });
  }

  shopCheckChange(shopId: number, checked: boolean) {
    const targetGroup = this.cartGroup.find(group => Object.is(group.id, shopId));
    if (targetGroup) {
      targetGroup.checkedIndeterminate = false;
      targetGroup.items.forEach(item => (item.checked = checked));
    }
  }

  cartItemCheckChange(shopId: number) {
    const targetGroup = this.cartGroup.find(group => Object.is(group.id, shopId));
    if (targetGroup) {
      targetGroup.checkedIndeterminate = !targetGroup.items.every(item => item.checked) && !targetGroup.items.every(item => !item.checked);
      targetGroup.checked = targetGroup.items.every(item => item.checked);
    }
  }

  productCoverLoadError(e: Event) {
    e.preventDefault();
    (e.target as HTMLImageElement).src = defaultProductCover;
  }

  clearCart() {
    this.delCartItem(
      this.cartGroup.reduce<string[]>((arr, group) => {
        group.items.forEach(item => {
          arr.push(item.cartItemId);
        });
        return arr;
      }, []),
      true
    );
  }

  delCartItem(cartItemId: string[], delAll: boolean = false) {
    this.loading.delCartItem = !delAll;
    this.loading.delCartItemIdsIds = cartItemId;
    this.loading.delAllCartItem = delAll;
    this.userCartSrv
      .delByIds({ cartItemId })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.queryCart();
          this.sysCartSrv.cardAction$.next(true);
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.delCartItem = false;
        this.loading.delAllCartItem = false;
        this.loading.delCartItemIdsIds = [];
      });
  }

  quantityChange(skuId: string, quantity: number) {
    this.cartItemModify$.next({ skuId, quantity });
  }

  cartItemModify(skuId: string, quantity: number) {
    this.loading.modify = true;
    this.userCartSrv
      .cartItemModify({ skuId, quantity })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.queryCart();
          this.sysCartSrv.cardAction$.next(true);
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.modify = false;
      });
  }

  queryCart() {
    this.loading.query = true;
    this.sysCartSrv
      .getCart()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          const oldData = this.cartGroup;
          this.cartGroup = (res || []).map(item => {
            const targetGroup = oldData.find(group => Object.is(group.id, item.id));
            return {
              ...item,
              checked: targetGroup ? targetGroup.checked : true,
              checkedIndeterminate: targetGroup ? targetGroup.checkedIndeterminate : false,
              items: item.items.map(cartItem => {
                const targetCartItem = targetGroup ? targetGroup.items.find(cart => Object.is(cart.cartItemId, cartItem.cartItemId)) : null;
                return {
                  ...cartItem,
                  checked: targetCartItem ? targetCartItem.checked : true,
                  cover: getProductCover(cartItem.productImages, ProductImageType.THUMBNAIL),
                  skuSpec: JSON.parse(cartItem.skuSpec || '[]')
                    .map((specItem: { id: number; value: string }) => specItem.value)
                    .join(',')
                };
              })
            };
          });
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.query = false;
      });
  }

  checkAvailability(cartItem: CartItemPOM) {
    const unAvailable = cartItem.productEndTime < Date.now();
    if (unAvailable) {
      cartItem.checked = false;
    }
    return unAvailable;
  }

  confirmOrder() {
    const data = this.cartGroup.reduce<OrderCouponsParams[]>((arr, cur) => {
      if (cur.checked || cur.checkedIndeterminate) {
        arr.push({
          storeId: cur.id.toString(),
          // storeName: cur.name,
          // isSelfEmployed: cur.isSelfEmployed,
          productOrder: [
            ...cur.items
              .filter(item => item.checked)
              .map(item => ({
                skuId: item.skuId.toString(),
                quantity: item.quantity,
                productId: cur.id.toString(),
                productName: item.productName,
                cover: item.cover,
                skuSpec: item.skuSpec,
                skuExchangePoint: item.skuExchangePoint,
                skuPrice: item.skuPrice,
                exchangePointTotal: item.exchangePointTotal,
                priceTotal: item.priceTotal,
                skuStock: item.skuStock,
                cashBack: item.cashBack * item.quantity
              })),
            ...(this.voucherNum > 0
              ? [
                  {
                    skuId: this.voucherSkuId,
                    quantity: this.voucherNum,
                    productId: this.voucherService.productId,
                    productName: this.voucherService.productName,
                    cover: this.voucherService.cover,
                    skuSpec: '',
                    skuExchangePoint: 0,
                    skuPrice: this.voucherValue,
                    exchangePointTotal: 0,
                    priceTotal: this.voucherValue * this.voucherNum,
                    skuStock: 9999,
                    cashBack: 0
                  }
                ]
              : [])
          ]
        });
      }
      return arr;
    }, []);
    this.router.navigate(['/order/confirm'], {
      queryParams: {
        o: btoa(encodeURIComponent(JSON.stringify(data)))
      }
    });
  }

  changeVoucherNum(num: number, isPlus?: boolean) {
    this.voucherNum = Math.max(0, this.voucherNum + num);
    this.quantityChange('100', this.voucherNum);
    if (isPlus) {
      this.isDisabledAddCoupon = true;
      this.rebateSvg = ``;
      this.animation();
    }
  }

  animation() {
    this.rebateSvg = REBATE_SVG;
    setTimeout(() => {
      svgRebateAnimation();
    }, 0);
    setTimeout(() => {
      this.rebateSvg = ``;
      this.isDisabledAddCoupon = false;
    }, 3000);
  }

  queryVoucher() {
    this.shopProductService
      .querySkuById(this.voucherSkuId)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: res => {
          if (res.length > 0) {
            this.voucherValue = res[0].price;
          }
        },
        error: err => {
          console.error(err);
        }
      });
  }

  checkCredits() {
    if (this.showBuyCreditsTips) {
      const { realCashback, totalCashback } = this;
      this.overlayService
        .open(
          HoldUpComponent,
          { realCashback, totalCashback },
          {
            panelClass: ['modal']
          },
          {
            disableCloseBtn: true,
            preventBackdropClick: true
          }
        )
        ?.afterClosed$.pipe(map(event => event.data))
        ?.pipe(takeUntil(this.destroyStream$))
        .subscribe((data: 'checkout' | 'getVouchers') => {
          if (Object.is(data, 'checkout')) {
            this.confirmOrder();
          }
        });
      return;
    }
    this.confirmOrder();
  }
}
