import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ProductConsultationItemComponent } from './product-consultation-item.component';

@NgModule({
  declarations: [ProductConsultationItemComponent],
  imports: [SharedModule],
  exports: [ProductConsultationItemComponent]
})
export class ProductConsultationItemModule {}
