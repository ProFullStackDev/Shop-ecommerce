import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { DataLoadingStatusComponent } from '@shared/components/data-loading-status/data-loading-status.component';
import { PaymentComponent } from '@shared/components/payment/payment.component';
import { ProfitComponent } from '@shared/components/profit/profit.component';
import { RecommendedForYouComponent } from '@shared/components/recommended-for-you/recommended-for-you.component';
import { DictPipe } from '@shared/pipes/dict/dict.pipe';
import { SHARED_ZORRO_MODULES } from '@shared/shared-zorro.module';

import { ProductCollectionModule } from './components/product-collection/product-collection.module';
import { ReviewScoreModule } from './components/review-score/review-score.module';
import { FlyingCartDirective } from './directive/flying-cart.directive';
import { UserAvatarComponent } from "@shared/components/user-avatar/user-avatar.component";
import { CountUpModule } from 'ngx-countup';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule, ...SHARED_ZORRO_MODULES, TranslateModule, CountUpModule],
  declarations: [DataLoadingStatusComponent, DictPipe, FlyingCartDirective, PaymentComponent, ProfitComponent, RecommendedForYouComponent, UserAvatarComponent],
  providers: [DatePipe, CurrencyPipe],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ...SHARED_ZORRO_MODULES,
    DataLoadingStatusComponent,
    DictPipe,
    FlyingCartDirective,
    TranslateModule,
    PaymentComponent,
    ProfitComponent,
    ProductCollectionModule,
    RecommendedForYouComponent,
    ReviewScoreModule,
    UserAvatarComponent,
  ]
})
export class SharedModule {}
