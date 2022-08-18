import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { PayRoutingModule } from './pay-routing.module';

@NgModule({
  imports: [SharedModule, PayRoutingModule]
})
export class PayModule {}
