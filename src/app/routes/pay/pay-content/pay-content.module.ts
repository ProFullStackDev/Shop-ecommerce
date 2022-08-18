import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { PayContentComponent } from './pay-content.component';

@NgModule({
  imports: [SharedModule],
  exports: [PayContentComponent],
  declarations: [PayContentComponent]
})
export class PayContentModule {}
