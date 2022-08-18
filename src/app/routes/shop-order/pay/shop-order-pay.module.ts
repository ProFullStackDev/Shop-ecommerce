import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ShopOrderPayRoutingModule } from './shop-order-pay-routing.module';
import { ShopOrderPayComponent } from './shop-order-pay.component';

@NgModule({
  declarations: [ShopOrderPayComponent],
  imports: [SharedModule, ShopOrderPayRoutingModule]
})
export class ShopOrderPayModule {}
