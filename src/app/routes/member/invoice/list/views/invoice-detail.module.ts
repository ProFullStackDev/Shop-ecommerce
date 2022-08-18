import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AftersalesService } from '@core/services/user/aftersales.service';
import { SharedModule } from '@shared/shared.module';

import { InvoiceDetailRoutingModule } from './invoice-detail-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, InvoiceDetailRoutingModule, SharedModule],
  providers: [AftersalesService]
})
export class InvoiceDetailModule {}
