import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShopProductModule } from '@routes/shop-product/shop-product.module';
import { SharedModule } from '@shared/shared.module';
import { SwiperModule } from 'swiper/angular';

import { ProductConsultationItemModule } from '../components/product-consultation-item/product-consultation-item.module';
import { ProductDetailImagesModule } from '../components/product-detail-images/product-detail-images.module';
import { ProductDetailSameModule } from '../components/product-detail-same/product-detail-same.module';
import { ProductRecommendModule } from '../components/product-recommend/product-recommend.module';
import { ProductReviewItemModule } from '../components/product-review-item/product-review-item.module';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import {TranslateModule} from "@ngx-translate/core";
import {TyqoonIconsModule} from "@shared/modules/tyqoon-icons";
import {TyqoonIconRegistryService} from "@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service";
import {filledStarIcon, stokedStarIcon} from "@shared/modules/tyqoon-icons/tyqoon-icons";
import {arrowDownIconNew} from "@shared/modules/tyqoon-icons/tyqoon-icons";

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    SharedModule,
    SwiperModule,
    ShopProductModule,
    ProductDetailSameModule,
    ProductDetailImagesModule,
    ProductRecommendModule,
    ProductReviewItemModule,
    ProductConsultationItemModule,
    TranslateModule,
    TyqoonIconsModule
  ]
})
export class DetailModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([stokedStarIcon, filledStarIcon, arrowDownIconNew])
  }
}
