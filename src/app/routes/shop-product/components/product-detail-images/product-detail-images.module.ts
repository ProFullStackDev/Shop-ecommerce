import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SwiperModule } from 'swiper/angular';

import { ProductDetailImagesComponent } from './product-detail-images.component';

@NgModule({
  declarations: [ProductDetailImagesComponent],
  exports: [ProductDetailImagesComponent],
  imports: [SharedModule, SwiperModule, SwiperModule]
})
export class ProductDetailImagesModule {}
