import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicService } from '@core/services/user/basic.service';
import { StatisticsService } from '@core/services/user/statistics.service';
import { SharedModule } from '@shared/shared.module';

import { IndexRoutingModule } from './index-routing.module';

@NgModule({
  // declarations: [IndexComponent],
  imports: [CommonModule, IndexRoutingModule, SharedModule],
  providers: [BasicService, StatisticsService]
})
export class IndexModule {}
