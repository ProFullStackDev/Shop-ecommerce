import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ReviewListComponent } from './review-list.component';

const routes: Routes = [{ path: '', component: ReviewListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewListRoutingModule {}
