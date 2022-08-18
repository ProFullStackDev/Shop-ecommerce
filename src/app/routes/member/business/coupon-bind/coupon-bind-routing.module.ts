import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CouponBindComponent } from './coupon-bind.component';

const routes: Routes = [{ path: '', component: CouponBindComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponBindRoutingModule {}
