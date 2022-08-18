import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule) },
  { path: 'cancel/:id', loadChildren: () => import('./pay-cancel/pay-cancel.module').then(m => m.PayCancelModule) },
  { path: 'result/:id', loadChildren: () => import('./pay-result/pay-result.module').then(m => m.PayResultModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayRoutingModule {}
