import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderDetailComponent } from './header-detail.component';

const routes: Routes = [
  { path: 'add', component: HeaderDetailComponent },
  { path: 'edit', component: HeaderDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderDetailRoutingModule {}
