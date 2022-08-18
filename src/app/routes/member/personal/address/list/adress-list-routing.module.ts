import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddressListComponent } from './address-list.component';

const routes: Routes = [{ path: '', component: AddressListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressListRoutingModule {}
