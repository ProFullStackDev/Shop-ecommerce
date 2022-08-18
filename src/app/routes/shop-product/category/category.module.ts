import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CategoryProductComponent } from '@routes/shop-product/components/category-product/category-product.component';
import { SharedModule } from '@shared/shared.module';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent, CategoryProductComponent],
  imports: [CommonModule, CategoryRoutingModule, SharedModule]
})
export class CategoryModule {}
