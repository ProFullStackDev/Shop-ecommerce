import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { AddressService } from '@core/services/user/address.service';

import { AddressDetailRoutingModule } from './address-detail-routing.module';
import { AddressDetailComponent } from './address-detail.component';
import { AddressFormModule } from '@shared/components/address-form/address-form.module';

@NgModule({
  declarations: [AddressDetailComponent],
  imports: [CommonModule, AddressDetailRoutingModule, SharedModule, ReactiveFormsModule, AddressFormModule],
  providers: [AddressService]
})
export class AddressDetailModule {}
