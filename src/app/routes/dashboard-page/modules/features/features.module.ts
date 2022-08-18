import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PlatformTotalModule } from '@shared/components/platform-total/platform-total.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { TyqoonIconRegistryService } from '@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import { checkIcon } from '@shared/modules/tyqoon-icons/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';
import SwiperCore, { Autoplay, Navigation } from 'swiper';
import { SwiperModule } from 'swiper/angular';

import { FeaturesComponent } from './components/features/features.component';

SwiperCore.use([Navigation, Autoplay]);

@NgModule({
  declarations: [FeaturesComponent],
  exports: [FeaturesComponent],
  imports: [CommonModule, TyqoonIconsModule, SwiperModule, TranslateModule, SharedModule, PlatformTotalModule]
})
export class FeaturesModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([checkIcon]);
  }
}
