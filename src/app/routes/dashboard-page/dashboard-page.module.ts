import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardPageRoutingModule } from '@routes/dashboard-page/dashboard-routing.module';
import { ChartsModule } from '@routes/dashboard-page/modules/charts/charts.module';
import { FeaturesModule } from '@routes/dashboard-page/modules/features/features.module';
import { InvitesModule } from '@routes/dashboard-page/modules/invites/invites.module';
import { SidebarModule } from '@routes/dashboard-page/modules/sidebar/sidebar.module';
import { LayoutFooterModule } from '@shared/components/layout/layout-footer/layout-footer.module';
import { PaymentModalsModule } from '@shared/components/payment-modals/payment-modals.module';
import { PlatformTotalModule } from '@shared/components/platform-total/platform-total.module';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';
import { CountUpModule } from 'ngx-countup';

import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [DashboardPageComponent],
  imports: [
    CommonModule,
    InvitesModule,
    ChartsModule,
    FeaturesModule,
    TyqoonIconsModule,
    CopyingModule,
    SidebarModule,
    DashboardPageRoutingModule,
    LayoutFooterModule,
    TranslateModule,
    SharedModule,
    PaymentModalsModule,
    CountUpModule,
    PlatformTotalModule
  ]
})
export class DashboardPageModule {}
