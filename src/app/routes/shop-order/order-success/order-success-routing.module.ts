import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderSuccessComponent } from '@routes/shop-order/order-success/components/order-success/order-success.component';

const routes: Routes = [
  {
    path: '',
    component: OrderSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderSuccessRoutingModule {}
