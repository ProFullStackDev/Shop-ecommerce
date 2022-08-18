import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareCodeModalComponent } from './components/share-code-modal/share-code-modal.component';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [ShareCodeModalComponent],
	imports: [CommonModule, CopyingModule, TranslateModule]
})
export class ShareCodeModalModule {}
