import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductImageType, ProductType } from '@core/services/shop/product.service';
import { OrdersPOM, OrderStatus } from '@core/services/user/order.service';
import { EmService } from '@core/system/customerService/em.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateService } from '@ngx-translate/core';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { DictKey } from '@shared/pipes/dict/dict.pipe';
import { getProductCover } from '@shared/utils/utils';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-list-item',
  template: `
    <div class="order">
      <nz-space class="text-sm order-header" [nzSize]="24">
        <div class="order-header-left">
          <span>{{ order.createdDate | date: 'YYYY-MM-dd HH:mm:ss' }}</span>
          <span>#{{ order.sn }}</span>
          <button
            appCopying="{{ order.sn }}"
            type="button"
            class="btn-primary btn-primary-copy copy-button-for-dark"
            (copied)="copied($event)"
          >
            <app-tyqoon-icon name="copyIcon"></app-tyqoon-icon>
          </button>
          <button
            nzTooltipTitle="联系客服"
            style="margin-left: 15px"
            nzTooltipPlacement="top"
            nz-tooltip
            (click)="contactSupport(productType)"
          >
            <img width="30px" height="30px" src="/assets/images/contactSupport.png" alt="" />
          </button>
          <span>{{ order.shopName }} <nz-tag *ngIf="order.shopType === 1" nzColor="orange">自营</nz-tag> </span>
        </div>
        <span class="order-header-right text-primary" *ngIf="order.amount > 0">{{ order.amount | currency }}</span>
      </nz-space>
      <nz-row class="order-body">
        <nz-col [nzSpan]="tableSpan.detail">
          <div *ngFor="let orderItem of order.orderItems" class="detail">
            <nz-row nzAlign="middle" nzJustify="space-between">
              <nz-col [nzSpan]="3">
                <nz-avatar nzIcon="picture" [nzSrc]="orderItem.thumbnail" [nzSize]="50" nzShape="square"></nz-avatar>
              </nz-col>
              <nz-col [nzSpan]="21">
                <span class="mobile-order-info">{{ order.createdDate | date: 'YYYY-MM-dd HH:mm:ss' }}</span>
                <p class="name text-overflow">
                  <a routerLink="/product/detail" [queryParams]="{ id: orderItem.productId }" [title]="orderItem.productName">
                    {{ orderItem.productName }}
                  </a>
                </p>
                <p
                  *ngIf="orderItem.specifications !== '[]'"
                  class="specifications text-gray text-overflow"
                  [title]="orderItem.specifications"
                >
                  {{ orderItem.specifications }}
                </p>
                <p *ngIf="orderItem.type === productType.ShopProductTypeByCoupon && orderItem.exchangeCode">
                  兑换码：{{ orderItem.exchangeCode }}
                </p>
                <span class="order-header-right text-primary mobile-order-info" *ngIf="order.amount > 0">{{
                  order.amount | currency
                }}</span>
              </nz-col>
            </nz-row>
          </div>
        </nz-col>
        <nz-col class="price" [nzSpan]="tableSpan.price">
          <span *ngIf="order.exchangePoint > 0">{{ order.exchangePoint }}积分</span>
          <span class="symbol-plus" *ngIf="order.exchangePoint > 0 && order.amount > 0">+</span>
        </nz-col>
        <nz-col class="status" [nzSpan]="tableSpan.orderStatus">
          <div class="status-add-to-card-buttons">
            <ng-container *ngIf="isPaymentBtn; else addBtn">
              <button [ngClass]="!hasExpired ? 'active' : 'unactive'" class="payment-button" (click)="payment(order.id)"
                >Make Payment</button
              >
            </ng-container>
            <ng-template #addBtn>
              <button class="add-to-cart" (click)="addToCard()">Add to cart</button>
            </ng-template>
          </div>
          <!--TODO Temporary hided-->
          <span [style.color]="order.status | dict: DictKey.ORDER_STATUS_DICT:'color'">
            {{ order.status | dict: DictKey.ORDER_STATUS_DICT:'label' | translate }}
          </span>
          <span class="text-gray waiting-payment" *ngIf="waitingPayment">{{ countdown }}</span>
          <span class="text-gray has-expired" *ngIf="hasExpired">{{ 'my-orders-status-expired' | translate }}</span>
          <button nz-button nzType="link" nzBlock>
            <a routerLink="/member/order/detail" [queryParams]="{ id: order.id }">
              <i nz-icon nzType="search" nzTheme="outline"></i>
              {{ 'my-orders-see-details' | translate }}
            </a>
          </button>
        </nz-col>
        <!-- <nz-col class="operation" [nzSpan]="tableSpan.operation"> -->

        <!-- <button *ngIf="showBillBtn" nz-button nzType="text" nzBlock>
            <a routerLink="/member/invoice/add" [queryParams]="{ orderId: order.id, storeId: order.storeId }">
              <i nz-icon nzType="plus" nzTheme="outline"></i>
              申请发票
            </a>
          </button> -->
        <button *ngIf="order.fapiao" nz-button nzType="text" nzBlock>
          <a routerLink="/member/invoice/views" [queryParams]="{ id: order.fapiao.id }">
            <i nz-icon nzIconfont="tgicon-sousuo_o"></i>
            查看发票
          </a>
        </button>
        <button *ngIf="showAfterSalesBtn" nz-button nzType="text" nzBlock>
          <a routerLink="/member/aftersales/apply" [queryParams]="{ orderId: order.id, orderSn: order.sn }">
            <i nz-icon nzType="plus" nzTheme="outline"></i>
            申请售后</a
          >
        </button>
        <!-- </nz-col> -->
      </nz-row>
    </div>
  `,
  // <button *ngIf="showBillBtn" nz-button nzType="text" nzBlock>
  // <a routerLink="/member/invoice/add" [queryParams]="{ orderId: order.id, storeId: order.storeId }">
  //   <i nz-icon nzType="plus" nzTheme="outline"></i>
  // 申请发票
  // </a>
  // </button>
  // <button *ngIf="order.fapiao" nz-button nzType="text" nzBlock>
  // <a routerLink="/member/invoice/views" [queryParams]="{ id: order.fapiao.id }">
  //   <i nz-icon nzIconfont="tgicon-sousuo_o"></i>
  // 查看发票
  // </a>
  // </button>
  styleUrls: ['./order-list-item.component.less']
})
export class OrderListItemComponent extends DestroySubscription {
  constructor(
    private customSrv: EmService,
    private message: NzMessageService,
    private router: Router,
    private cartService: SystemCartService
  ) {
    super();
  }

  @Input() order!: OrdersPOM;
  @Input() tableSpan!: { [key: string]: number };
  DictKey = DictKey;
  allChecked = false;
  productType = ProductType;

  payment(id: string | number): void {
    this.router.navigate(['/', 'order', 'pay'], { queryParams: { orderId: id } });
  }

  addToCard() {
    const sum = this.order.orderItems.reduce((accumulator, current) => accumulator + current.quantity, 0);
    return this.order.orderItems.map((item, i) => {
      this.cartService
        .addCart({
          productId: item.productId,
          productName: item.productName,
          skuPrice: item.price,
          priceTotal: item.price,
          skuId: item.sku.id,
          skuExchangePoint: item.sku.exchangePoint,
          exchangePointTotal: item.sku.exchangePoint,
          quantity: item.quantity,
          cover: getProductCover(item.productImages || '', ProductImageType.THUMBNAIL)
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
        );
    });
  }

  copied(text: string): void {
    if (text) {
      this.message.success(text);
    }
  }

  contactSupport(val: any) {
    this.customSrv.orderDetail(val);
  }

  convertToDecimal(number: any) {
    if (number < 10) {
      number = 0 + number.toString();
    }
    return number;
  }

  get showBillBtn() {
    return (
      !this.order.fapiao &&
      (Object.is(OrderStatus.PendingReview, this.order.status) ||
        Object.is(OrderStatus.PendingShipment, this.order.status) ||
        Object.is(OrderStatus.Shipped, this.order.status) ||
        Object.is(OrderStatus.Received, this.order.status) ||
        Object.is(OrderStatus.Completed, this.order.status))
    );
  }

  get showAfterSalesBtn() {
    return this.order.isAllowAfterSale;
  }

  get isPaymentBtn() {
    return !(
      (this.order.expire && moment(this.order.expire).isBefore(moment()) && Object.is(this.order.status, OrderStatus.PendingPayment)) ||
      Object.is(this.order.status, OrderStatus.Completed) ||
      Object.is(this.order.status, OrderStatus.Failed) ||
      Object.is(this.order.status, OrderStatus.Canceled) ||
      Object.is(this.order.status, OrderStatus.Denied) ||
      Object.is(this.order.status, OrderStatus.Received)
    );
  }

  get hasExpired() {
    return this.order.expire && moment(this.order.expire).isBefore(moment()) && Object.is(this.order.status, OrderStatus.PendingPayment);
  }

  get waitingPayment() {
    return this.order.expire && !moment(this.order.expire).isBefore(moment()) && Object.is(this.order.status, OrderStatus.PendingPayment);
  }

  get countdown() {
    const diffTime = moment(this.order.expire).unix() - moment().unix();
    const hours = this.convertToDecimal(moment.duration(diffTime, 'seconds').hours());
    const minutes = this.convertToDecimal(moment.duration(diffTime, 'seconds').minutes());
    const seconds = this.convertToDecimal(moment.duration(diffTime, 'seconds').seconds());
    return `${hours} : ${minutes} : ${seconds}`;
  }
}
