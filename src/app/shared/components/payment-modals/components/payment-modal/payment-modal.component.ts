import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SystemUserService } from '@core/system/system-user.service';
import { TyqoonDollarsComponent } from '@routes/dashboard/modules/tyqoon-dollars/components/tyqoon-dollars/tyqoon-dollars.component';
import { BuyCreditsModalComponent } from '@shared/components/payment-modals/modules/buy-credits-modal/components/buy-credits-modal/buy-credits-modal.component';
import { BuyGiftModalComponent } from '@shared/components/payment-modals/modules/buy-gift-modal/components/buy-gift-modal/buy-gift-modal.component';
import { RedeemCodeModalComponent } from '@shared/components/payment-modals/modules/redeem-code-modal/components/redeem-code-modal/redeem-code-modal.component';
import { SendCreditsModalComponent } from '@shared/components/payment-modals/modules/send-credits-modal/components/send-credits-modal/send-credits-modal.component';
import { ShareCodeModalComponent } from '@shared/components/payment-modals/modules/share-code-modal/components/share-code-modal/share-code-modal.component';
import { TooltipGiftCodeModalComponent } from '@shared/components/payment-modals/modules/tooltip-gift-code-modal/components/tooltip-gift-code-modal/tooltip-gift-code-modal.component';
import { PaymentModalsService } from '@shared/components/payment-modals/services/payment-modals.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { isNullOrUndefinedOrEmpty } from '@shared/utils/utils';
import { Observable, EMPTY } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.less']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentModalComponent extends DestroySubscription implements OnInit {
  earnDollarsModal = TyqoonDollarsComponent;
  buyCreditsModal = BuyCreditsModalComponent;
  buyGiftModal = BuyGiftModalComponent;
  redeemCodeModal = RedeemCodeModalComponent;
  sendCreditsModal = SendCreditsModalComponent;
  shareModal = ShareCodeModalComponent;
  tooltipGiftCodeModal = TooltipGiftCodeModalComponent;
  giftCode: string = '';

  constructor(
    private route: ActivatedRoute,
    private readonly overlayService: OverlayService,
    private readonly paymentModalsService: PaymentModalsService,
    private readonly user: SystemUserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      this.giftCode = params.code;
      if (!isNullOrUndefinedOrEmpty(params.code)) {
        this.openRedeemCodeModal({ code: this.giftCode });
      }
    });
  }

  get pointStatistics() {
    return this.user.cashBackData;
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get cashback() {
    return this.user.cashBackData;
  }

  public openRedeemCodeModal(data: object = {}) {
    this.openModal(RedeemCodeModalComponent, data);
  }

  public openModal(component: any, data: object = {}): Observable<boolean> | null {
    const ref = this.overlayService.open(
      component,
      { data },
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }
}
