import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ProductItemModule } from '../product-item/product-item.module';
import { ProductRecommendComponent } from './product-recommend.component';
import {SwiperModule} from "swiper/angular";

@NgModule({
  declarations: [ProductRecommendComponent],
  exports: [ProductRecommendComponent],
    imports: [ProductItemModule, SharedModule, SwiperModule]
})
export class ProductRecommendModule {}
