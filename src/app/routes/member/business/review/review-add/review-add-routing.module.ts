import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewAddComponent } from './review-add.component';

const routes: Routes = [{ path: '', component: ReviewAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewAddRoutingModule { }
