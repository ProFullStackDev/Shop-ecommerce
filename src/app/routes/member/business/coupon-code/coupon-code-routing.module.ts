import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CouponCodeComponent } from './coupon-code.component';

const routes: Routes = [{ path: '', component: CouponCodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponCodeRoutingModule {}
