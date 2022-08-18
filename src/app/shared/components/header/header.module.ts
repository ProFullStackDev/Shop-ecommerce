import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MobileMenuModule } from '@shared/components/header/modules/mobile-menu/mobile-menu.module';
import { NavBarModule } from '@shared/components/header/modules/nav-bar/nav-bar.module';
import { LayoutHeaderToolsModule } from '@shared/components/layout/layout-header-tools/layout-header-tools.module';
import { DownloadModule } from '@shared/directive/download/download.module';
import { SharedModule } from '@shared/shared.module';

import { TyqoonIconsModule } from '../../modules/tyqoon-icons';
import { AppSelectModule } from '../app-select/app-select.module';
import { PagesNavModule } from '../nav-panel/modules/pages-nav/pages-nav.module';
import { NavPanelModule } from '../nav-panel/nav-panel.module';
import { HeaderComponent } from './components/header/header.component';
import { HeaderNavModule } from './modules/header-nav/header-nav.module';
import { HeaderSearchModule } from './modules/header-search/header-search.module';
import { ShopBasketModule } from './modules/shop-basket/shop-basket.module';
import { HeaderService } from './services/header.service';
import {AccountMenuModule} from "@shared/components/header/modules/account-menu/account-menu.module";
import { PaymentModalsModule } from '../payment-modals/payment-modals.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    SharedModule,
    HeaderNavModule,
    AppSelectModule,
    HeaderSearchModule,
    ShopBasketModule,
    TyqoonIconsModule,
    PagesNavModule,
    DownloadModule,
    NavPanelModule,
    LayoutHeaderToolsModule,
    RouterModule,
    TranslateModule,
    MobileMenuModule,
    NavBarModule,
    AccountMenuModule,
    PaymentModalsModule
  ],
  exports: [HeaderComponent],
  providers: [HeaderService]
})
export class HeaderModule {}
