import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { AddressService } from '@core/services/user/address.service';

import { HeaderDetailRoutingModule } from './header-detail-routing.module';
import { HeaderDetailComponent } from './header-detail.component';

@NgModule({
  declarations: [HeaderDetailComponent],
  imports: [CommonModule, HeaderDetailRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [AddressService]
})
export class HeaderDetailModule {}
