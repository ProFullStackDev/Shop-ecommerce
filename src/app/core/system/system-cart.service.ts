import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { ProductImageType, ProductSkuPOM } from '@core/services/shop/product.service';
import { CartItemPOM, CartPOM, UserCartService } from '@core/services/user/cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { CacheService } from '@delon/cache';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { getProductCover } from '@shared/utils/utils';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SystemCartService extends DestroySubscription {
  quantity$ = new BehaviorSubject(1);

  public cardAction$ = new Subject();
  public cardVoucher$ = new BehaviorSubject(0);
  constructor(
    private userCart: UserCartService,
    private router: Router,
    private modal: NzModalService,
    private user: SystemUserService,
    private cacheSrv: CacheService
  ) {
    super();
    this.getCart().pipe(takeUntil(this.destroyStream$)).subscribe();
  }

  dbCartList: CartItemPOM[] = [];
  storageCartList: CartItemPOM[] = [];

  _loading = {
    query: false,
    modify: false
  };

  get cartList() {
    return this.user.isLogin() ? this.dbCartList : this.storageCartList;
  }

  get cartCount() {
    return this.cartList.length;
  }

  get loadingCart() {
    return this._loading.query;
  }

  get modifyingCart() {
    return this._loading.modify;
  }

  addCart(cart: Partial<CartItemPOM>): Observable<any> {
    return this.user.isLogin() ? this.addToDb(cart) : this.addToStorage(cart);
  }

  getCart(): Observable<CartPOM[]> {
    return this.user.isLogin() ? this.getCartFromDb() : this.getCartFromStorage();
  }

  private getCartFromStorage() {
    return new Observable<CartPOM[]>(observable => {
      const list = this.cacheSrv.getNone(LocalStorageEnum.USERCART) || [];
      this.storageCartList = list as CartItemPOM[];
      observable.next(list as CartPOM[]);
      observable.complete();
    });
  }

  getCartFromDb() {
    return new Observable<CartPOM[]>(observable => {
      this._loading.query = true;
      this.userCart
        .queryCart()
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(
          res => {
            this.dbCartList = (res || []).reduce<CartItemPOM[]>((arr, cur) => {
              arr.push(
                ...cur.items.map(item => ({
                  ...item,
                  cover: getProductCover(item.productImages, ProductImageType.THUMBNAIL)
                }))
              );
              return arr;
            }, []);
            observable.next(res);
            observable.complete();
          },
          error => {
            console.error(error);
            observable.error();
          }
        )
        .add(() => {
          this._loading.query = false;
        });
    });
  }

  public addToStorage(cart: any) {
    if (!cart.skuId) {
      return new Observable(observable => {
        this.cacheSrv.set(LocalStorageEnum.USERCART, cart);
        this.cardAction$.next(true);
        observable.next();
        observable.complete();
      });
    }

    return new Observable(observable => {
      const cartList = this.cartList;
      const targetCart = cartList.find(item => Object.is(item.skuId, cart.skuId));
      if (targetCart) {
        targetCart.quantity += cart.quantity || 1;
        targetCart.exchangePointTotal = targetCart.skuExchangePoint * targetCart.quantity;
        targetCart.priceTotal = targetCart.skuPrice * targetCart.quantity;
      } else {
        cartList.push(cart as CartItemPOM);
      }
      this.cacheSrv.set(LocalStorageEnum.USERCART, cartList);
      this.cardAction$.next(true);
      observable.next();
      observable.complete();
    });
  }

  public addToDb(cart: any) {
    if (!cart.skuId) {
      return new Observable(observable => {
        this.userCart
          .cartItemModify(cart)
          .pipe(takeUntil(this.destroyStream$))
          .subscribe(
            () => {
              this.cardAction$.next(true);
              observable.next();
              observable.complete();
            },
            error => {
              observable.error();
            }
          );
      });
    }

    return new Observable(observable => {
      const targetCart = this.dbCartList.find(item => Object.is(item.skuId, cart.skuId));
      const quantity = targetCart ? targetCart.quantity + 1 : this.quantity$.value;
      this.userCart
        .cartItemModify({ skuId: (cart.skuId || 0).toString(), quantity })
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(
          () => {
            this.cardAction$.next(true);
            observable.next();
            observable.complete();
          },
          error => {
            observable.error();
          }
        );
    });
  }

  addStorageCartToDb() {
    const addCartList = this.storageCartList.map(cart => {
      const targetCart = this.dbCartList.find(item => {
        return Object.is(item.skuId.toString(), cart.skuId.toString());
      });
      if (targetCart) {
        return {
          ...targetCart,
          quantity: targetCart.quantity + cart.quantity
        };
      }
      return cart;
    });
    return new Observable(observable => {
      if (addCartList.length < 1) {
        observable.next();
        observable.complete();
      }
      forkJoin(addCartList.map(cart => this.addToDb(cart)))
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(
          () => {
            this.cacheSrv.remove(LocalStorageEnum.USERCART);
            this.storageCartList = [];
            this.getCart().subscribe(() => {
              observable.next();
              observable.complete();
            });
          },
          error => {
            console.error(error);
            observable.error();
          }
        );
    });
  }
}
