import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasicService } from '@core/services/user/basic.service';
import { PayBusinessType } from '@core/services/user/payment.service';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { ButtonType } from '@shared/components/payment-modals/models/payment-modals.model';
import { PaymentModalsService } from '@shared/components/payment-modals/services/payment-modals.service';
import { PaymentComponent } from '@shared/components/payment/payment.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { MAX_VALUE_LENGTH, MIN_VALUE_LENGTH } from '@shared/statics/payments-statics/payment-statics';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-buy-credits-modal',
  templateUrl: './buy-credits-modal.component.html',
  styleUrls: ['./buy-credits-modal.component.css']
})
export class BuyCreditsModalComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;
  @ViewChild('paymentComponent') paymentComponent: PaymentComponent;

  minAmount = MIN_VALUE_LENGTH;
  maxAmount = MAX_VALUE_LENGTH;

  isScrollable = false;
  amountOfCredits = new FormControl(null, [Validators.required]);
  amountMinError: string | null;
  amountMaxError: string | null;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: ModalDto,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private translate: TranslateService,
    private paymentModalsService: PaymentModalsService,
    private user: SystemUserService,
    private basicSrv: BasicService,
    private message: NzMessageService
  ) {
    super();
  }

  loading = {
    recharge: false
  };

  ngOnInit() {}

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  closeModal(): void {
    this.close();
  }

  sendData(type: string): void {
    if (!this.amountOfCredits.valid) {
      return;
    }
    const actionType = Object.values(ButtonType).find(item => item === type);

    if (actionType) {
      const data = {
        amount: this.amountOfCredits.value,
        type: actionType
      };

      this.paymentModalsService.buyCreditsData(data);
    }

    this.closeModal();
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }

  paymentPlatformChange(data: any) {
    this.amountMinError = null;
    this.amountMaxError = null;

    if (Number(data.minAmount) >= 0 && Number(data.maxAmount) >= 0) {
      if (this.amountOfCredits.value < Number(data.minAmount)) {
        this.amountMinError = data.minAmount;
        return;
      }

      if (this.amountOfCredits.value > Number(data.maxAmount)) {
        this.amountMaxError = data.maxAmount;
        return;
      }
    }

    if (!this.amountOfCredits.valid || this.loading.recharge) return;
    this.loading.recharge = false;

    this.basicSrv.recharge({ actualAmountPaid: this.amountOfCredits.value }).subscribe({
      next: res => {
        this.paymentComponent
          .confirm({
            businessType: PayBusinessType.BALANCE,
            businessId: res.id
          })
          .subscribe()
          .add(() => {
            this.loading.recharge = false;
          });
      },
      error: err => {
        if (!err || !err.message) return;
        this.message.error(err.message);
      }
    });
  }

  paySuccess() {
    this.closeModal();
    this.user.updateUserInfo();
  }
}
