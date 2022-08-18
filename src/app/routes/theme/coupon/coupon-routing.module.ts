import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';

import { CouponComponent } from './coupon.component';

const routes: Routes = [{ path: 'asd', component: CouponComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, SharedModule]
})
export class CouponRoutingModule {}
