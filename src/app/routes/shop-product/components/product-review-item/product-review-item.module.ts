import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ProductReviewItemComponent } from './product-review-item.component';

@NgModule({
  declarations: [ProductReviewItemComponent],
  imports: [SharedModule],
  exports: [ProductReviewItemComponent]
})
export class ProductReviewItemModule {}
