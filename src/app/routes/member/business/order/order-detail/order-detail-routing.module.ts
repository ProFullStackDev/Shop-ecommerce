import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { OrderDetailComponent } from './order-detail.component';

const routes: Routes = [{ path: '', component: OrderDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), NzModalModule],
  exports: [RouterModule]
})
export class OrderDetailRoutingModule {}
