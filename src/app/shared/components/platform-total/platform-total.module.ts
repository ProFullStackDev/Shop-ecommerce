import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CountUpModule } from 'ngx-countup';

import { MyRebateCreditsComponent } from './components/my-rebate-credits/my-rebate-credits.component';
import { MyTotalSavingsComponent } from './components/my-total-savings/my-total-savings.component';
import { PlatformDistributionComponent } from './components/platform-distribution/platform-distribution.component';
import { PlatformPayoutComponent } from './components/platform-payout/platform-payout.component';
import { PlatformTotalSavingsComponent } from './components/platform-total-savings/platform-total-savings.component';

@NgModule({
  declarations: [
    PlatformTotalSavingsComponent,
    MyTotalSavingsComponent,
    MyRebateCreditsComponent,
    PlatformPayoutComponent,
    PlatformDistributionComponent
  ],
  exports: [
    PlatformTotalSavingsComponent,
    MyTotalSavingsComponent,
    MyRebateCreditsComponent,
    PlatformPayoutComponent,
    PlatformDistributionComponent
  ],
  imports: [CommonModule, CountUpModule, TranslateModule]
})
export class PlatformTotalModule {}
