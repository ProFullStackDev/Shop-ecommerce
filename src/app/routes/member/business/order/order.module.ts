import { NgModule } from '@angular/core';
import { BasicService } from '@core/services/user/basic.service';
import { TyqoonIconRegistryService } from '@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import { copyIcon } from '@shared/modules/tyqoon-icons/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';

import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, OrderRoutingModule],
  providers: [BasicService]
})
export class OrderModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([copyIcon]);
  }
}
