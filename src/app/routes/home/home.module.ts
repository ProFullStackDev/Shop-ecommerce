import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShopBrandService } from '@core/services/shop/brand.service';
import { ShopCategoryService } from '@core/services/shop/category.service';
import { ShopCouponService } from '@core/services/shop/coupon.service';
import { ShopProductService } from '@core/services/shop/product.service';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryModule } from '@routes/shop-product/category/category.module';
import { ProductCategoriesModule } from '@shared/components/nav-panel/modules/product-categories/product-categories.module';
import { PlatformTotalModule } from '@shared/components/platform-total/platform-total.module';
import { ShopAdModule } from '@shared/components/shop-ad/shop-ad.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { TyqoonIconRegistryService } from '@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import { checkIcon, crownIcon, filledStarIcon, stokedStarIcon } from '@shared/modules/tyqoon-icons/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { SwiperModule } from 'swiper/angular';

import { HomeCouponComponent } from './components/home-coupon/home-coupon.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LimitTimeComponent } from './limit-time/limit-time.component';

@NgModule({
  declarations: [HomeComponent, LimitTimeComponent, HomeCouponComponent],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    SwiperModule,
    NzCarouselModule,
    NzIconModule,
    NzAnchorModule,
    NzGridModule,
    NzProgressModule,
    ShopAdModule,
    ProductCategoriesModule,
    CategoryModule,
    TranslateModule,
    TyqoonIconsModule,
    SharedModule,
    PlatformTotalModule
  ],
  providers: [ShopCategoryService, ShopBrandService, ShopProductService, ShopCouponService]
})
export class HomeModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([stokedStarIcon, filledStarIcon, crownIcon, checkIcon]);
  }
}
