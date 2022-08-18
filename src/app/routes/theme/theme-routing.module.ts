import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ThemeLayoutComponent } from './theme-layout/theme-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ThemeLayoutComponent,
    children: [{ path: 'coupon', loadChildren: () => import('./coupon/coupon.module').then(m => m.CouponModule) }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
