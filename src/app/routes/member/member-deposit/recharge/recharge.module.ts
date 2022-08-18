import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CouponService } from '@core/services/member/coupon.service';
import { BasicService } from '@core/services/user/basic.service';
import { SharedModule } from '@shared/shared.module';

import { RechargeRoutingModule } from './recharge-routing.module';
import { RechargeComponent } from './recharge.component';

@NgModule({
  declarations: [RechargeComponent],
  imports: [CommonModule, RechargeRoutingModule, SharedModule],
  providers: [BasicService, CouponService]
})
export class RechargeModule {}
