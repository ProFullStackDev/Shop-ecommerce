import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { TyqoonIconRegistryService } from '@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import { filledStarIcon, stokedStarIcon } from '@shared/modules/tyqoon-icons/tyqoon-icons';

import { ReviewScoreComponent } from './review-score.component';

@NgModule({
  declarations: [ReviewScoreComponent],
  exports: [ReviewScoreComponent],
  imports: [CommonModule, TyqoonIconsModule]
})
export class ReviewScoreModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([stokedStarIcon, filledStarIcon]);
  }
}
