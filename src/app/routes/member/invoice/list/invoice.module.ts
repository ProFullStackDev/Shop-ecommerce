import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BillService } from '@core/services/user/bill.service';
import { SharedModule } from '@shared/shared.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { InvoiceRoutingModule } from './invoice-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, InvoiceRoutingModule, SharedModule, NzStepsModule],
  providers: [BillService]
})
export class InvoiceModule {}
