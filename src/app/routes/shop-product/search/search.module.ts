import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ProductItemModule } from '../components/product-item/product-item.module';
import { ProductRecommendModule } from '../components/product-recommend/product-recommend.module';
import { ProductSearchBarModule } from '../components/product-search-bar/product-search-bar.module';
import { SearchRoutingModule } from './search-routing.module';
import { ShopProductSearchComponent } from './search.component';

@NgModule({
  declarations: [ShopProductSearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    ProductRecommendModule,
    ProductRecommendModule,
    ProductItemModule,
    ProductSearchBarModule
  ]
})
export class SearchModule {}
