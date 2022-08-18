import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared/shared.module';

import { TyqoonIconsModule } from '../../../../modules/tyqoon-icons';
import { ProductCategoriesComponent } from './components/product-categories/product-categories.component';

@NgModule({
  declarations: [ProductCategoriesComponent],
  exports: [ProductCategoriesComponent],
  imports: [CommonModule, SharedModule, TyqoonIconsModule, TranslateModule]
})
export class ProductCategoriesModule {}
