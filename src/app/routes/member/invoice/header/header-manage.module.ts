import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BillService } from '@core/services/user/bill.service';

import { HeaderManageRoutingModule } from './header-manage-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, HeaderManageRoutingModule, SharedModule],
  providers: [BillService]
})
export class HeaderManageModule {}
