import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicService } from '@core/services/user/basic.service';
import { PaymentModalsModule } from '@shared/components/payment-modals/payment-modals.module';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { SharedModule } from '@shared/shared.module';

import { PointRoutingModule } from './point-routing.module';
import { PointComponent } from './point.component';



@NgModule({
  declarations: [PointComponent],
  imports: [CommonModule, PointRoutingModule, SharedModule, PaymentModalsModule, CopyingModule],
  providers: [BasicService]
})
export class PointModule {}
