import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';

import { SharedModalComponent } from './components/shared-modal/shared-modal.component';

@NgModule({
  declarations: [SharedModalComponent],
  imports: [CommonModule, TranslateModule, TyqoonIconsModule, CopyingModule]
})
export class SharedModalModule {}
