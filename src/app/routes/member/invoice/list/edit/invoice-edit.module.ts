import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddressService } from '@core/services/user/address.service';
import { AddressSelectModule } from '@shared/components/address-select/address-select.module';
import { SharedModule } from '@shared/shared.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { InvoiceEditRoutingModule } from './invoice-edit-routing.module';
import { InvoiceEditComponent } from './invoice-edit.component';

@NgModule({
  declarations: [InvoiceEditComponent],
  imports: [CommonModule, InvoiceEditRoutingModule, SharedModule, NzStepsModule, AddressSelectModule],
  providers: [AddressService]
})
export class InvoiceEditModule {}
