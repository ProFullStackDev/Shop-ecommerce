import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CouponItemComponent } from '@routes/theme/components/coupon-item/coupon-item.component';
import { SharedModule } from '@shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { CouponRoutingModule } from './coupon-routing.module';
import { CouponComponent } from './coupon.component';

@NgModule({
  declarations: [CouponComponent, CouponItemComponent],
  imports: [CommonModule, CouponRoutingModule, InfiniteScrollModule, SharedModule]
})
export class CouponModule {}
