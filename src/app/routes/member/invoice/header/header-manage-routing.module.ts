import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderManageComponent } from './header-manage.component';

const routes: Routes = [{ path: '', component: HeaderManageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderManageRoutingModule {}
