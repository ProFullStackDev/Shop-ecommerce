import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PaymentConfirmationModalModule } from '@shared/components/payment-modals/modules/payment-confirmation-modal/payment-confirmation-modal.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { TyqoonIconRegistryService } from '@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import { giftBoxIcon } from '@shared/modules/tyqoon-icons/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';

import { BuyGiftModalComponent } from './components/buy-gift-modal/buy-gift-modal.component';

@NgModule({
  declarations: [BuyGiftModalComponent],
  imports: [CommonModule, TranslateModule, ReactiveFormsModule, TyqoonIconsModule, SharedModule, PaymentConfirmationModalModule]
})
export class BuyGiftModalModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([giftBoxIcon]);
  }
}
