import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';

import { PaymentConfirmationModalComponent } from './components/payment-confirmation-modal/payment-confirmation-modal.component';

@NgModule({
  declarations: [PaymentConfirmationModalComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, TyqoonIconsModule, SharedModule]
})
export class PaymentConfirmationModalModule {}
