import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'confirm', loadChildren: () => import('@routes/shop-order/confirm/confirm.module').then(m => m.ConfirmModule) },
  { path: 'pay', loadChildren: () => import('@routes/shop-order/pay/shop-order-pay.module').then(m => m.ShopOrderPayModule) },
  { path: 'success', loadChildren: () => import('@routes/shop-order/order-success/order-success.module').then(m => m.OrderSuccessModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopOrderRoutingModule {}
