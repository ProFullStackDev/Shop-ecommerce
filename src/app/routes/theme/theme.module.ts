import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThemeLayoutComponent } from '@routes/theme/theme-layout/theme-layout.component';
import { ShopAdModule } from '@shared/components/shop-ad/shop-ad.module';
import { SharedModule } from '@shared/shared.module';

import { ThemeRoutingModule } from './theme-routing.module';

@NgModule({
  declarations: [ThemeLayoutComponent],
  imports: [CommonModule, ThemeRoutingModule, ShopAdModule, SharedModule]
})
export class ThemeModule {}
