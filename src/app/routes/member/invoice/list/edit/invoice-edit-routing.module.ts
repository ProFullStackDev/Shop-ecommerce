import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InvoiceEditComponent } from './invoice-edit.component';

const routes: Routes = [{ path: '', component: InvoiceEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceEditRoutingModule {}
