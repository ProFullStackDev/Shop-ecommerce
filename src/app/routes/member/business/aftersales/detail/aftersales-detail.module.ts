import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AftersalesService } from '@core/services/user/aftersales.service';
import { SharedModule } from '@shared/shared.module';

import { AftersalesDetailRoutingModule } from './aftersales-detail-routing.module';
import { AftersalesDetailComponent } from './aftersales-detail.component';

@NgModule({
  declarations: [AftersalesDetailComponent],
  imports: [CommonModule, AftersalesDetailRoutingModule, SharedModule],
  providers: [AftersalesService]
})
export class AftersalesDetailModule {}
