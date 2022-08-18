import { Component, Input } from '@angular/core';
import { CouponPOM } from '@core/services/shop/coupon.service';

@Component({
  selector: 'app-home-coupon',
  template: `<a routerLink="/theme/coupon"  class="media">
    <div class="media-left media-middle">
      <div class="image">
        <img [src]="item.displayImage" alt="9 折" />
      </div>
    </div>
    <div class="media-body media-middle">
      <h5 class="text-overflow text-xl" [title]="item.name">{{ item.name }}</h5>
      <p class="description text-left text-sm">{{ item.description }}</p>
      <p class="text-overflow text-left">
        <span>指定商品可用</span>
      </p>
    </div>
    <div class="media-right media-middle">
      <div class="link">
        <i nz-icon nzType="right" nzTheme="outline"></i>
      </div>
    </div>
  </a>`,
  styleUrls: ['./home-coupon.component.less']
})
export class HomeCouponComponent {
  @Input() item!: CouponPOM;
  constructor() {}
}
