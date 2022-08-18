import { NgModule } from '@angular/core';
import { PayContentModule } from '@routes/pay/pay-content/pay-content.module';
import { SharedModule } from '@shared/shared.module';

import { PayResultRoutingModule } from './pay-result-routing.module';
import { PayResultComponent } from './pay-result.component';

@NgModule({
  declarations: [PayResultComponent],
  imports: [SharedModule, PayResultRoutingModule, PayContentModule]
})
export class PayResultModule {}
