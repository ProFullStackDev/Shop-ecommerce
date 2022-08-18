import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { LayoutFooterModule } from '@shared/components/layout/layout-footer/layout-footer.module';
import { LayoutHeaderToolsModule } from '@shared/components/layout/layout-header-tools/layout-header-tools.module';
import { LayoutSideBarModule } from '@shared/components/layout/layout-side-bar/layout-side-bar.module';
import { LayoutTopNavModule } from '@shared/components/layout/layout-top-nav/layout-top-nav.module';
import { ShopAdModule } from '@shared/components/shop-ad/shop-ad.module';
import { SharedModule } from '@shared/shared.module';

import { HomeLayoutComponent } from './home-layout.component';
import {HeaderModule} from "@shared/components/header/header.module";

@NgModule({
  declarations: [HomeLayoutComponent],
    imports: [CommonModule, SharedModule, LayoutFooterModule, LayoutTopNavModule, LayoutHeaderToolsModule, ShopAdModule, LayoutSideBarModule, HeaderModule]
})
export class HomeLayoutModule {
  static forRoot(): ModuleWithProviders<HomeLayoutModule> {
    return {
      ngModule: HomeLayoutModule,
      providers: []
    };
  }
}
