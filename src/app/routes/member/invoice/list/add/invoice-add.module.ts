import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddressService } from '@core/services/user/address.service';
import { AddressSelectModule } from '@shared/components/address-select/address-select.module';
import { SharedModule } from '@shared/shared.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { InvoiceAddRoutingModule } from './invoice-add-routing.module';
import { InvoiceAddComponent } from './invoice-add.component';

@NgModule({
  declarations: [InvoiceAddComponent],
  imports: [CommonModule, InvoiceAddRoutingModule, SharedModule, NzStepsModule, AddressSelectModule],
  providers: [AddressService]
})
export class InvoiceAddModule {}
