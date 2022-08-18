import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountBindComponent } from './account-bind.component';

const routes: Routes = [{ path: 'profile', component: AccountBindComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccoutBindRoutingModule {}
