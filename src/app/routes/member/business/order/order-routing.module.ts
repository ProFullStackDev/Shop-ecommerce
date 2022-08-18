import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', loadChildren: () => import('./order-list/order-list.module').then(m => m.OrderListModule) },
  { path: 'detail', loadChildren: () => import('./order-detail/order-detail.module').then(m => m.OrderDetailModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {}
