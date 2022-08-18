import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceAddComponent } from './invoice-add.component';

const routes: Routes = [{ path: '', component: InvoiceAddComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceAddRoutingModule {}
