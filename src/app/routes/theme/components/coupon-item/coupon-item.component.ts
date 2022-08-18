import { DecimalPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CouponPOM } from '@core/services/shop/coupon.service';
import * as moment from 'moment';

@Component({
  selector: 'app-coupon-item',
  template: `
    <div class="coupon" [class]="status">
      <div class="coupon-cover">
        <img class="coupon-display-image" [src]="_coupon.displayImage" />
      </div>
      <div class="coupon-content">
        <div *ngIf="received" class="coupon-received"></div>
        <div class="coupon-category-limit">
          限品类: <span [title]="categoryLimitText">{{ categoryLimitText }}</span>
        </div>
        <div class="coupon-date-range">{{ dateRange }}</div>
        <nz-progress
          *ngIf="!outOfStock"
          class="progress"
          [nzPercent]="progress"
          [nzFormat]="progressFormat"
          nzStrokeColor="#fb8811"
        ></nz-progress>
      </div>
      <div class="coupon-info">
        <div *ngIf="isNew" class="coupon-new">新到</div>
        <div class="coupon-name text-overflow text-2xl" [title]="_coupon.name">{{ _coupon.name }}</div>
        <div class="coupon-description text-overflow" [title]="_coupon.description">{{ _coupon.description }}</div>
        <button class="btn" nz-button nzSize="small" nzShape="round" [nzLoading]="btnLoading" [disabled]="outOfStock" (click)="btn()">{{
          btnText
        }}</button>
      </div>
    </div>
  `,
  styleUrls: ['./coupon-item.component.less'],
  providers: [DecimalPipe]
})
export class CouponItemComponent {
  constructor(private _decimalPipe: DecimalPipe) {}

  @Input() btnLoading: boolean = false;
  @Input() received: boolean = false;
  @Input()
  set coupon(value: CouponPOM) {
    this._coupon = {
      ...value,
      displayImage: value.displayImage || this.defaultCover
    };
  }
  @Output() readonly btnClick = new EventEmitter();

  defaultCover = 'src/assets/images/theme/default_coupon_icon.png';
  _coupon!: CouponPOM;

  get isNew() {
    return moment().isBefore(moment(this._coupon.createdDate).add(10, 'days'));
  }

  get categoryLimitText() {
    const productRestriction = this._coupon.productRestriction;
    if (Object.is(productRestriction, 'PRODUCT_AVAILABLE')) {
      return '指定商品可用';
    }
    if (Object.is(productRestriction, 'PRODUCT_CATEGORY_AVAILABLE')) {
      return (this._coupon.productCategories || [])
        .map(item => {
          return item.name;
        })
        .join('、');
    }
    return '全品类可用';
  }

  get dateRange() {
    const { beginDate, endDate } = this._coupon;
    if (beginDate && endDate) {
      return `${moment(beginDate).format('YYYY.MM.DD')}~${moment(endDate).format('YYYY.MM.DD')}`;
    }
    return '无使用期限限制';
  }

  get progress() {
    return Number(this._decimalPipe.transform(((this._coupon.couponCodeQuantity || 0) / this._coupon.totalCount) * 100, '1.1-1'));
  }

  get outOfStock() {
    return this.progress >= 100;
  }

  get status() {
    if (this.isNew) return 'is-new';
    if (this.outOfStock) return 'out-of-stock';
    return '';
  }

  get btnText() {
    return this.received ? '立即使用' : this.outOfStock ? '已领完' : '立即领取';
  }

  progressFormat(percent: number) {
    return `已抢${percent}%`;
  }

  btn() {
    this.btnClick.emit(this._coupon.id);
  }
}
