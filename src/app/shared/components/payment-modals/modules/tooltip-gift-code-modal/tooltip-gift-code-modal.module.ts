import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CopyingModule } from '@shared/directive/copying/copying.module';

import { TooltipGiftCodeModalComponent } from './components/tooltip-gift-code-modal/tooltip-gift-code-modal.component';

@NgModule({
  declarations: [TooltipGiftCodeModalComponent],
  imports: [CommonModule, CopyingModule, TranslateModule]
})
export class TooltipGiftCodeModalModule {}
