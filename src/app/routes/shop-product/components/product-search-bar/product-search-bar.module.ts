import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ProductSearchBarComponent } from './product-search-bar.component';

@NgModule({
  declarations: [ProductSearchBarComponent],
  exports: [ProductSearchBarComponent],
  imports: [SharedModule]
})
export class ProductSearchBarModule {}
