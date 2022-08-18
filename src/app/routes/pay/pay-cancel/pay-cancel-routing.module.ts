import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayCancelComponent } from './pay-cancel.component';

const routes: Routes = [{ path: '', component: PayCancelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayCancelRoutingModule {}
