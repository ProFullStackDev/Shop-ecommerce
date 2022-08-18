import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicService } from '@core/services/user/basic.service';
import { PhoneControlModule } from '@shared/controls/phone-control/phone-control.module';
import { SharedModule } from '@shared/shared.module';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, SharedModule, PhoneControlModule],
  providers: [BasicService]
})
export class RegisterModule {}
