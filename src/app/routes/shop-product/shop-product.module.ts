import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShopCategoryService } from '@core/services/shop/category.service';
import { ShopProductService } from '@core/services/shop/product.service';
import { SharedModule } from '@shared/shared.module';

import { ShopProductRoutingModule } from './shop-product-routing.module';

@NgModule({
  imports: [CommonModule, ShopProductRoutingModule, SharedModule],
  providers: [ShopCategoryService, ShopProductService]
})
export class ShopProductModule {}
