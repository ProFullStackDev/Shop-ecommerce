import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopOrderPayComponent } from './shop-order-pay.component';

const routes: Routes = [{ path: '', component: ShopOrderPayComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopOrderPayRoutingModule {}
