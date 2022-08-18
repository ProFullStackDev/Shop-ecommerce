import { NgModule, Optional, SkipSelf } from '@angular/core';
import { EmService } from '@core/system/em.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { SystemRouterService } from '@core/system/system-router.service';
import { SystemUserService } from '@core/system/system-user.service';
import { SystemVoucherService } from '@core/system/system-voucher.service';

import { throwIfAlreadyLoaded } from './module-import-guard';

@NgModule({
  providers: [SystemUserService, SystemRouterService, SystemCartService, SystemVoucherService, EmService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
