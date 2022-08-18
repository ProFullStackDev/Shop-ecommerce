import { NgModule } from '@angular/core';
import { ShopProductService } from '@core/services/shop/product.service';
import { SharedModule } from '@shared/shared.module';
import { SwiperModule } from 'swiper/angular';

import { ProductItemModule } from '../product-item/product-item.module';
import { ProductDetailSameComponent } from './product-detail-same.component';

@NgModule({
  declarations: [ProductDetailSameComponent],
  exports: [ProductDetailSameComponent],
  imports: [SharedModule, ProductItemModule, SwiperModule],
  providers: [ShopProductService]
})
export class ProductDetailSameModule {}
