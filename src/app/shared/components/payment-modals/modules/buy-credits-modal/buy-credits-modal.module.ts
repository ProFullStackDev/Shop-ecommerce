import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

import { BuyCreditsModalComponent } from './components/buy-credits-modal/buy-credits-modal.component';

@NgModule({
  declarations: [BuyCreditsModalComponent],
  imports: [SharedModule, TranslateModule, ReactiveFormsModule]
})
export class BuyCreditsModalModule {}
