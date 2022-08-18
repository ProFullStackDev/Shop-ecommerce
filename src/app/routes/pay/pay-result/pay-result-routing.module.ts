import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PayResultComponent } from './pay-result.component';

const routes: Routes = [{ path: '', component: PayResultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayResultRoutingModule {}
