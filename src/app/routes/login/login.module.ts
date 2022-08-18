import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicService } from '@core/services/user/basic.service';
import { PhoneControlModule } from '@shared/controls/phone-control/phone-control.module';
import { SharedModule } from '@shared/shared.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule, NgxIntlTelInputModule, PhoneControlModule],
  providers: [BasicService]
})
export class LoginModule {}
