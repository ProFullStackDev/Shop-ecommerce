import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CouponService } from '@core/services/member/coupon.service';
import { BasicService } from '@core/services/user/basic.service';

import { CouponExchangeRoutingModule } from './coupon-exchange-routing.module';

@NgModule({
  imports: [CommonModule, CouponExchangeRoutingModule],
  providers: [BasicService, CouponService]
})
export class CouponExchangeModule {}
