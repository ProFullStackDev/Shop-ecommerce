import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AddressService } from '@core/services/user/address.service';

import { AddressListRoutingModule } from './adress-list-routing.module';
import { AddressListComponent } from './address-list.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, AddressListRoutingModule, SharedModule],
  providers: [AddressService]
})
export class AddressListModule {}
