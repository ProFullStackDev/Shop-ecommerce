import { Component } from '@angular/core';
import { AdPositionEnum } from '@core/services/common.service';

@Component({
  selector: 'app-theme-layout',
  template: `
    <div class="container">
      <app-shop-ad [positionName]="couponAdPositionName"></app-shop-ad>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class ThemeLayoutComponent {
  couponAdPositionName = AdPositionEnum.COUPON_AD;
  constructor() {}
}
