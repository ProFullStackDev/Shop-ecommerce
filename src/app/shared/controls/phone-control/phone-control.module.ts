import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

import { PhoneControlComponent } from './components/phone-control/phone-control.component';

@NgModule({
  declarations: [PhoneControlComponent],
  exports: [PhoneControlComponent],
  imports: [CommonModule, NgxIntlTelInputModule, SharedModule],
  providers: [NzModalService]
})
export class PhoneControlModule {}
