import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentComponent } from './payment.component';

@NgModule({
  declarations: [PaymentComponent],
  exports: [PaymentComponent],
  imports: [SharedModule, PaymentRoutingModule]
})
export class PaymentModule {}
