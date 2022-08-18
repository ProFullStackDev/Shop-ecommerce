import { NgModule } from '@angular/core';
import { PayContentModule } from '@routes/pay/pay-content/pay-content.module';
import { SharedModule } from '@shared/shared.module';

import { PayCancelRoutingModule } from './pay-cancel-routing.module';
import { PayCancelComponent } from './pay-cancel.component';

@NgModule({
  declarations: [PayCancelComponent],
  imports: [SharedModule, PayCancelRoutingModule, PayContentModule]
})
export class PayCancelModule {}
