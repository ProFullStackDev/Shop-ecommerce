import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AddressService } from '@core/services/user/address.service';

import { IncreaseListRoutingModule } from './increase-list-routing.module';
import { IncreaseListComponent } from './increase-list.component';
import { AddressSelectModule } from '@shared/components/address-select/address-select.module';

@NgModule({
  declarations: [IncreaseListComponent],
  imports: [CommonModule, IncreaseListRoutingModule, SharedModule, AddressSelectModule],
  providers: [AddressService]
})
export class IncreaseListModule {}
