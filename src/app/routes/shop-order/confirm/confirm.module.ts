import { NgModule } from '@angular/core';
import { AddressFormModule } from '@shared/components/address-form/address-form.module';
import { PaymentModalsModule } from '@shared/components/payment-modals/payment-modals.module';
import { SharedModule } from '@shared/shared.module';

import { AddressChangeComponent } from './components/address-change/address-change.component';
import { PaymentMethodsBalanceComponent } from './components/payment-methods-balance/payment-methods-balance.component';
import { PaymentMethodsCardComponent } from './components/payment-methods-card/payment-methods-card.component';
import { PaymentMethodsCryptoComponent } from './components/payment-methods-crypto/payment-methods-crypto.component';
import { ConfirmRoutingModule } from './confirm-routing.module';
import { ConfirmComponent } from './confirm.component';
import { ConfirmYourOrderComponent } from './components/confirm-your-order/confirm-your-order.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    PaymentMethodsBalanceComponent,
    PaymentMethodsCryptoComponent,
    PaymentMethodsCardComponent,
    AddressChangeComponent,
    ConfirmYourOrderComponent
  ],
  imports: [SharedModule, ConfirmRoutingModule, AddressFormModule, PaymentModalsModule]
})
export class ConfirmModule {}
