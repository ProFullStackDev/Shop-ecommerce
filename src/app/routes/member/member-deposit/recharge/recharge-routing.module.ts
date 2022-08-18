import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RechargeComponent } from './recharge.component';

const routes: Routes = [{ path: '', component: RechargeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RechargeRoutingModule {}
