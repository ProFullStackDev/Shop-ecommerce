import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AftersalesDetailComponent } from './aftersales-detail.component';

const routes: Routes = [{ path: '', component: AftersalesDetailComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AftersalesDetailRoutingModule {}
