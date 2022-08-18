import { Component } from '@angular/core';
import { SystemCartService } from '@core/system/system-cart.service';

@Component({
  selector: 'app-shopping-cart',
  template: `
    <nz-badge [nzCount]="cartCount">
      <nz-button-group nz-popover [nzPopoverContent]="cartListTpl" nzPopoverPlacement="bottomRight">
        <button class="header-shopping-cart" nz-button nzType="primary">
          <i nz-icon nzType="shopping-cart" nzTheme="outline"></i>
        </button>
        <button nz-button>购物车</button>
      </nz-button-group>
    </nz-badge>
    <ng-template #cartListTpl>
      <div class="cart-list" #cartTpl>
        <nz-skeleton *ngIf="cartCount < 1 && cartLoading"></nz-skeleton>
        <nz-empty *ngIf="cartCount < 1 && !cartLoading" nzNotFoundContent="您的购物车是空的，请去挑选您的商品！"></nz-empty>
        <nz-row class="cart-item" *ngFor="let cart of cartList" nzJustify="space-between" nzAlign="middle">
          <nz-col [nzSpan]="4">
            <nz-avatar nzIcon="picture" nzShape="square" [nzSrc]="cart.cover" [nzSize]="50"></nz-avatar>
          </nz-col>
          <nz-col [nzSpan]="20">
            <div class="product-name text-overflow" [title]="cart.productName">
              <a routerLink="/product/detail" [queryParams]="{ id: cart.productId }">{{ cart.productName }}</a>
            </div>
            <div class="price text-gray-dark">
              <span class="sku-exchange-point" *ngIf="cart.exchangePointTotal > 0">{{ cart.exchangePointTotal }}积分</span>
              <span class="add-symbol" *ngIf="cart.exchangePointTotal > 0 && cart.priceTotal > 0"> + </span>
              <span class="sku-price" *ngIf="cart.priceTotal > 0">{{ cart.priceTotal | currency }}</span>
              <span class="plus-symbol">×</span>
              <span class="quantity">{{ cart.quantity }}</span>
            </div>
          </nz-col>
        </nz-row>
        <nz-affix *ngIf="cartList.length > 0" [nzTarget]="cartTpl" [nzOffsetBottom]="0">
          <nz-row class="footer" nzJustify="space-between" nzAlign="middle">
            <nz-col>
              <span class="text-gray">共计:</span>
              <span class="sku-exchange-point" *ngIf="exchangePointTotal > 0">{{ exchangePointTotal }}积分</span>
              <span class="add-symbol" *ngIf="exchangePointTotal > 0 && priceTotal > 0"> + </span>
              <span class="sku-price text-primary" *ngIf="priceTotal > 0">{{ priceTotal | currency }}</span>
            </nz-col>
            <nz-col>
              <button nz-button nzType="primary" routerLink="/cart"> 商品结算 </button>
            </nz-col>
          </nz-row>
        </nz-affix>
      </div>
    </ng-template>
  `,
  styleUrls: ['./shopping-cart.component.less']
})
export class ShoppingCartComponent {
  constructor(private cartSrv: SystemCartService) {}

  get cartCount() {
    return this.cartSrv.cartCount;
  }

  get cartLoading() {
    return this.cartSrv.loadingCart;
  }

  get cartList() {
    return this.cartSrv.cartList;
  }

  get priceTotal() {
    return this.cartList.reduce<number>((num, cur) => (num += Number(cur.priceTotal)), 0);
  }

  get exchangePointTotal() {
    return this.cartList.reduce<number>((num, cur) => (num += Number(cur.exchangePointTotal)), 0);
  }
}
