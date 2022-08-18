import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { TyqoonIconRegistryService } from '@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import { filledStarIcon, filledStarMobileIcon, stokedStarIcon, stokedStarMobileIcon } from '@shared/modules/tyqoon-icons/tyqoon-icons';

import { ProductCollectionComponent } from './product-collection.component';

@NgModule({
  declarations: [ProductCollectionComponent],
  exports: [ProductCollectionComponent],
  imports: [CommonModule, TyqoonIconsModule, TranslateModule]
})
export class ProductCollectionModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([stokedStarIcon, filledStarIcon, stokedStarMobileIcon, filledStarMobileIcon]);
  }
}
