import { NgModule } from '@angular/core';
import { DashboardModule } from '@routes/dashboard/dashboard.module';
import { PaymentModalsModule } from '@shared/components/payment-modals/payment-modals.module';
import { PlatformTotalModule } from '@shared/components/platform-total/platform-total.module';
import { SharedModule } from '@shared/shared.module';

import { HoldUpComponent } from './components/hold-up/hold-up.component';
import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';

@NgModule({
  declarations: [ShoppingCartComponent, HoldUpComponent],
  exports: [ShoppingCartComponent],
  imports: [SharedModule, ShoppingCartRoutingModule, PaymentModalsModule, DashboardModule, PlatformTotalModule]
})
export class ShoppingCartModule {}
