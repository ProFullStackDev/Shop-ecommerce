import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardRoutingModule } from '@routes/dashboard/dashboard-routing.module';
import { GetPrimeModalModule } from '@routes/dashboard/modules/get-prime-modal/get-prime-modal.module';
import { InviteFriendsModule } from '@routes/dashboard/modules/invite-friends/invite-friends.module';
import { LanguageModalModule } from '@routes/dashboard/modules/language-modal/language-modal.module';
import { MessagesModule } from '@routes/dashboard/modules/messages/messages.module';
import { MissionsModule } from '@routes/dashboard/modules/missions/missions.module';
import { MyProfileModalModule } from '@routes/dashboard/modules/my-profile-modal/my-profile-modal.module';
import { NftDetailsModule } from '@routes/dashboard/modules/nft-details/nft-details.module';
import { NftShopModule } from '@routes/dashboard/modules/nft-shop/nft-shop.module';
import { QrCodeModalModule } from '@routes/dashboard/modules/qr-code-modal/qr-code-modal.module';
import { SharedModalModule } from '@routes/dashboard/modules/shared-modal/shared-modal.module';
import { TokensModule } from '@routes/dashboard/modules/tokens/tokens.module';
import { TyqoonDollarsModule } from '@routes/dashboard/modules/tyqoon-dollars/tyqoon-dollars.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { SafeHtml } from '@shared/pipes/SafeHtml.pipe';
import { CountUpModule } from 'ngx-countup';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NtfBuildingComponent } from './modules/ntf-building/ntf-building.component';

@NgModule({
  declarations: [DashboardComponent, SafeHtml, NtfBuildingComponent],
  imports: [
    CommonModule,
    MyProfileModalModule,
    InviteFriendsModule,
    TokensModule,
    MissionsModule,
    NftDetailsModule,
    NftShopModule,
    MessagesModule,
    GetPrimeModalModule,
    QrCodeModalModule,
    TyqoonIconsModule,
    DashboardRoutingModule,
    LanguageModalModule,
    TyqoonDollarsModule,
    SharedModalModule,
    TranslateModule,
    CountUpModule
  ],
  exports: [DashboardComponent, SafeHtml]
})
export class DashboardModule {}
