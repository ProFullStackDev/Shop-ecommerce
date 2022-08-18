import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forgetStep1Component } from '@shared/components/forgot-payment-password/step1/step1.component';
import { forgetStep2Component } from '@shared/components/forgot-payment-password/step2/step2.component';
import { forgetStep3Component } from '@shared/components/forgot-payment-password/step3/step3.component';
import { PhoneControlModule } from '@shared/controls/phone-control/phone-control.module';
import { SharedModule } from '@shared/shared.module';
import { CodeInputModule } from 'angular-code-input';

import { PasswordComponent } from './change-password/password.component';
import { ForgetPaymentPasswordComponent } from './forget-payment-password/forget-payment-password.component';
import { ModifyRoutingModule } from './modify-routing.module';
import { ModifyComponent } from './modify.component';
import { setPasswordComponent } from './setup-password/setup-password.component';

@NgModule({
  declarations: [
    ModifyComponent,
    setPasswordComponent,
    PasswordComponent,
    ForgetPaymentPasswordComponent,
    forgetStep1Component,
    forgetStep2Component,
    forgetStep3Component
  ],
  imports: [ModifyRoutingModule, CodeInputModule, SharedModule, PhoneControlModule]
})
export class ModifyModule {}
