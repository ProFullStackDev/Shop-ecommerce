import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CouponExchangeComponent } from './coupon-exchange.component';

const routes: Routes = [{ path: '', component: CouponExchangeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CouponExchangeRoutingModule {}
