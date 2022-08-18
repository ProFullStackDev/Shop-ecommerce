import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AddressService } from '@core/services/user/address.service';

import { AddressFormComponent } from './address-form.component';

@NgModule({
  declarations: [AddressFormComponent],
  exports: [AddressFormComponent],
  imports: [CommonModule, SharedModule],
  providers: [AddressService]
})
export class AddressFormModule {}
