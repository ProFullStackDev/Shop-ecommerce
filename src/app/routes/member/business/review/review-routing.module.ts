import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', loadChildren: () => import('./review-list/review-list.module').then(m => m.ReviewListModule) },
  { path: 'add', loadChildren: () => import('./review-add/review-add.module').then(m => m.ReviewAddModule) },
  { path: 'detail', loadChildren: () => import('./review-detail/review-detail.module').then(m => m.ReviewDetailModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule {}
