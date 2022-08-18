import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AddressService } from '@core/services/user/address.service';

import { AddressSelectComponent } from './address-select.component';

@NgModule({
  declarations: [AddressSelectComponent],
  exports: [AddressSelectComponent],
  imports: [CommonModule, SharedModule],
  providers: [AddressService]
})
export class AddressSelectModule {}
