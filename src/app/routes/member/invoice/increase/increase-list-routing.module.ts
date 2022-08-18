import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IncreaseListComponent } from './increase-list.component';

const routes: Routes = [{ path: '', component: IncreaseListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncreaseListRoutingModule {}
