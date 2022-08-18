import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Params, Router } from '@angular/router';
import { ProductImageType } from '@core/services/shop/product.service';
import { CartItemPOM, CartPOM, UserCartService } from '@core/services/user/cart.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { getProductCover } from '@shared/utils/utils';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shop-basket',
  templateUrl: './shop-basket.component.html',
  styleUrls: ['./shop-basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopBasketComponent extends DestroySubscription implements OnInit {
  @Input() icon: string | null = null;
  cartList: any[] = [];
  priceTotal: number;
  cartTotal: number = 0;

  constructor(
    private cartSrv: SystemCartService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private userCartSrv: UserCartService
  ) {
    super();
  }

  loading = {
    query: false,
    modify: false,
    settlement: false,
    delAllCartItem: false,
    delCartItem: false,
    delCartItemIdsIds: ['']
  };
  console = console;

  getSantizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit(): void {
    this.cartSrv.cardVoucher$.pipe(takeUntil(this.destroyStream$)).subscribe(val => {
      this.priceTotal = 0;
      this.priceTotal = this.cartList.reduce<number>((num, cur) => (num += Number(cur.priceTotal)), 0) + val;
      this.cdr.detectChanges();
    });
    this.getCardList();
    this.cartSrv.cardAction$.pipe(takeUntil(this.destroyStream$)).subscribe(() => this.getCardList());
  }

  nav(link: string[], params?: Params) {
    this.router.navigate(link, { queryParams: params });
  }

  goShopping(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.nav(['/']);
  }
  goCart(e: Event) {
    e.preventDefault();
    e.stopPropagation();
    this.nav(['/', 'cart']);
  }

  private getCardList(): void {
    this.cartSrv
      .getCart()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(data => {
        if (!data) {
          this.cartList = [];
          this.cdr.detectChanges();
          return;
        }
        const cardArray = data.find(item => item.items)?.items;
        if (cardArray?.length) {
          this.cartList = cardArray?.length
            ? cardArray.map(item => ({
                ...item,
                cover: getProductCover(item.productImages, ProductImageType.THUMBNAIL)
              }))
            : [];
        } else {
          this.cartList = data?.length
            ? data.map(item => ({
                ...item,
                // @ts-ignore
                cover: item.cover
              }))
            : [];
        }
        this.console.log(this.cartList);
        this.priceTotal = this.cartList.reduce<number>((num, cur) => (num += Number(cur.priceTotal)), 0);
        this.cartTotal = 0;
        this.cartList.forEach(item => {
          this.cartTotal += item.quantity;
        });
        console.log(this.cartTotal);
        this.cdr.detectChanges();
      });
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
          this.cartSrv.cardAction$.next(true);
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
}
