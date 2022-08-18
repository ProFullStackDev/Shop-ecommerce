import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { WalletService } from '@core/services/user/wallet.service';
import { TranslateModule } from '@ngx-translate/core';
import { CouponRoutingModule } from '@routes/theme/coupon/coupon-routing.module';
import { BuyCreditsModalModule } from '@shared/components/payment-modals/modules/buy-credits-modal/buy-credits-modal.module';
import { BuyGiftModalModule } from '@shared/components/payment-modals/modules/buy-gift-modal/buy-gift-modal.module';
import { RedeemCodeModalModule } from '@shared/components/payment-modals/modules/redeem-code-modal/redeem-code-modal.module';
import { SendCreditsModalModule } from '@shared/components/payment-modals/modules/send-credits-modal/send-credits-modal.module';
import { ShareCodeModalModule } from '@shared/components/payment-modals/modules/share-code-modal/share-code-modal.module';
import { TooltipGiftCodeModalModule } from '@shared/components/payment-modals/modules/tooltip-gift-code-modal/tooltip-gift-code-modal.module';
import { PaymentModalsService } from '@shared/components/payment-modals/services/payment-modals.service';
import { PlatformTotalModule } from '@shared/components/platform-total/platform-total.module';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { CountUpModule } from 'ngx-countup';

import { BuyCreditsButtonComponent } from './buy-credits-button/buy-credits-button.component';
import { BuyRebateCreditsButtonComponent } from './buy-rebate-credits-button/buy-rebate-credits-button.component';
import { BuyVoucherComponent } from './buy-voucher/buy-voucher.component';
import { PaymentModalComponent } from './components/payment-modal/payment-modal.component';
import { CovertDollarsButtonComponent } from './covert-dollars-button/covert-dollars-button.component';
import { DepositStoreCreditComponent } from './deposit-store-credit/deposit-store-credit.component';
import { GiftcodeComponent } from './giftcode/giftcode.component';
import { MakeGiftCodeButtonComponent } from './make-gift-code-button/make-gift-code-button.component';
import { NewConvertDollarsModalComponent } from './new-convert-dollars-modal/new-convert-dollars-modal.component';
import { RebateCreditsComponent } from './rebate-credits/rebate-credits.component';
import { RedeemCodeButtonComponent } from './redeem-code-button/redeem-code-button.component';
import { StoreCreditComponent } from './store-credit/store-credit.component';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { TotalSavingsComponent } from './total-savings/total-savings.component';
import { TyqoonDollarsComponent } from './tyqoon-dollars/tyqoon-dollars.component';

@NgModule({
  declarations: [
    PaymentModalComponent,
    StoreCreditComponent,
    GiftcodeComponent,
    TyqoonDollarsComponent,
    RebateCreditsComponent,
    BuyCreditsButtonComponent,
    RedeemCodeButtonComponent,
    MakeGiftCodeButtonComponent,
    CovertDollarsButtonComponent,
    BuyRebateCreditsButtonComponent,
    BuyVoucherComponent,
    TotalSavingsComponent,
    SuccessModalComponent,
    DepositStoreCreditComponent,
    NewConvertDollarsModalComponent
  ],
  exports: [PaymentModalComponent, TotalSavingsComponent, TyqoonDollarsComponent, RebateCreditsComponent, StoreCreditComponent],
  imports: [
    CommonModule,
    CopyingModule,
    TranslateModule,
    BuyCreditsModalModule,
    BuyGiftModalModule,
    RedeemCodeModalModule,
    SendCreditsModalModule,
    ShareCodeModalModule,
    CouponRoutingModule,
    TooltipGiftCodeModalModule,
    MatSliderModule,
    CountUpModule,
    PlatformTotalModule
  ]
})
export class PaymentModalsModule {}
