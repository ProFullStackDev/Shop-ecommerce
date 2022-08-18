import { NgModule } from '@angular/core';
import { PhoneControlModule } from '@shared/controls/phone-control/phone-control.module';
import { SharedModule } from '@shared/shared.module';

import { Step1Component } from '../../shared/components/forgot-password/step1/step1.component';
import { Step2Component } from '../../shared/components/forgot-password/step2/step2.component';
import { Step3Component } from '../../shared/components/forgot-password/step3/step3.component';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [ForgotPasswordComponent, Step1Component, Step2Component, Step3Component],
  imports: [ForgotPasswordRoutingModule, SharedModule, PhoneControlModule]
})
export class ForgotPasswordModule {}
