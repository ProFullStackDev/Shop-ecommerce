import { NgModule } from '@angular/core';
import { ProductItemComponent } from '@routes/shop-product/components/product-item/product-item.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [ProductItemComponent],
  exports: [ProductItemComponent],
  imports: [SharedModule]
})
export class ProductItemModule {}
