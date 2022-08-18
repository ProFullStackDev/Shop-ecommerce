import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { RedeemCodeModalComponent } from './components/redeem-code-modal/redeem-code-modal.component';

@NgModule({
  declarations: [RedeemCodeModalComponent],
  imports: [CommonModule, ReactiveFormsModule, TranslateModule]
})
export class RedeemCodeModalModule {}
