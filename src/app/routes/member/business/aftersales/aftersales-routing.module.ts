import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', loadChildren: () => import('./list/aftersales-list.module').then(m => m.AftersalesListModule) },
  { path: 'apply', loadChildren: () => import('./apply/aftersales-apply.module').then(m => m.AftersalesApplyModule) },
  { path: 'detail', loadChildren: () => import('./detail/aftersales-detail.module').then(m => m.AftersalesDetailModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AftersalesRoutingModule {}
