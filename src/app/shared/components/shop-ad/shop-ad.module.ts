import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommonService } from '@core/services/common.service';
import { SwiperModule } from 'swiper/angular';

import { ShopAdComponent } from './shop-ad.component';

@NgModule({
  declarations: [ShopAdComponent],
  imports: [CommonModule, SwiperModule],
  exports: [ShopAdComponent],
  providers: [CommonService]
})
export class ShopAdModule {}
