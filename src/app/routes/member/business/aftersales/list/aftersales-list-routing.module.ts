import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AftersalesListComponent } from './aftersales-list.component';

const routes: Routes = [{ path: '', component: AftersalesListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AftersalesListRoutingModule {}
