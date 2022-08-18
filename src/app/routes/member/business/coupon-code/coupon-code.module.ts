import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CouponCodeComponent } from './coupon-code.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [CouponCodeComponent],
  imports: [CommonModule, SharedModule]
})
export class CouponCodeModule {}
