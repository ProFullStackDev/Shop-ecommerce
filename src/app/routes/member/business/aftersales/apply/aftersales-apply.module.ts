import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddressSelectModule } from '@shared/components/address-select/address-select.module';
import { SharedModule } from '@shared/shared.module';

import { AftersalesApplyRoutingModule } from './aftersales-apply-routing.module';
import { AftersalesApplyComponent } from './aftersales-apply.component';

@NgModule({
  declarations: [AftersalesApplyComponent],
  imports: [CommonModule, AftersalesApplyRoutingModule, SharedModule, AddressSelectModule]
})
export class AftersalesApplyModule {}
