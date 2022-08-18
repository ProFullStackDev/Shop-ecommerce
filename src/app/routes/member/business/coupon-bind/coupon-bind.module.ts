import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicService } from '@core/services/user/basic.service';
import { SharedModule } from '@shared/shared.module';

import { CouponBindRoutingModule } from './coupon-bind-routing.module';
import { CouponBindComponent } from './coupon-bind.component';

@NgModule({
  // declarations: [CouponBindComponent],
  imports: [CommonModule, CouponBindRoutingModule, SharedModule],
  providers: [BasicService]
})
export class CouponBindModule {}
