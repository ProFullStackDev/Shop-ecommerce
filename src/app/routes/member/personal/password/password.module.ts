import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicService } from '@core/services/user/basic.service';
import { SharedModule } from '@shared/shared.module';

import { PasswordRoutingModule } from './password-routing.module';
import { PasswordComponent } from './password.component';

@NgModule({
  declarations: [PasswordComponent],
  imports: [CommonModule, PasswordRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [BasicService]
})
export class PasswordModule {}
