import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddressDetailComponent } from './address-detail.component';

const routes: Routes = [
  { path: 'add', component: AddressDetailComponent },
  { path: 'edit', component: AddressDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressDetailRoutingModule {}
