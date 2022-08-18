import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasicService } from '@core/services/user/basic.service';
import { UserOrderService } from '@core/services/user/order.service';
import { PayBusinessType } from '@core/services/user/payment.service';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { BuyGiftModalComponent } from '@shared/components/payment-modals/modules/buy-gift-modal/components/buy-gift-modal/buy-gift-modal.component';
import { PaymentModalsService } from '@shared/components/payment-modals/services/payment-modals.service';
import { PaymentComponent } from '@shared/components/payment/payment.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-payment-confirmation-modal',
  templateUrl: './payment-confirmation-modal.component.html',
  styleUrls: ['./payment-confirmation-modal.component.less'],
  providers: [UserOrderService]
})
export class PaymentConfirmationModalComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;
  @ViewChild('paymentComponent') paymentComponent: PaymentComponent;

  isScrollable = false;
  amountOfCredits = new FormControl({ value: null, disabled: true }, [Validators.required]);
  numOfCodes = new FormControl({ value: null, disabled: true }, [Validators.required]);

  amountMinError: string | null;
  amountMaxError: string | null;

  loading = {
    recharge: false
  };

  get totalAmount(): number {
    return this.amountOfCredits.value * this.numOfCodes.value;
  }

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: any,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private translate: TranslateService,
    private orderSrv: UserOrderService,
    private paymentModalsService: PaymentModalsService,
    private user: SystemUserService,
    private basicSrv: BasicService,
    private message: NzMessageService,
    private readonly overlayService: OverlayService
  ) {
    super();
  }

  ngOnInit() {
    this.amountOfCredits.patchValue(this.modalData.amountOfCredits);
    this.amountOfCredits.touched;
    this.numOfCodes.patchValue(this.modalData.numOfCodes);
    this.numOfCodes.touched;
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  paymentPlatformChange(data: any, fromBalance: boolean = false) {
    if ((!this.modalData.amountOfCredits && !this.modalData.numOfCodes) || this.loading.recharge) return;
    this.loading.recharge = false;

    const actualValue = this.modalData;

    if (!fromBalance && Number(this.modalData.amountOfCredits) >= 0 && Number(this.modalData.numOfCodes) >= 0) {
      if (actualValue < Number(data.minAmount)) {
        return;
      }

      if (actualValue > Number(data.maxAmount)) {
        return;
      }
    }

    this.basicSrv.recharge({ actualAmountPaid: this.amountOfCredits.value * this.numOfCodes.value }).subscribe({
      next: result => {
        if (fromBalance) {
          this.orderSrv
            .buyGiftCode({
              panelValue: this.amountOfCredits.value,
              num: this.numOfCodes.value,
              useBalance: fromBalance
            })
            .subscribe({
              next: res => {
                this.message.success('兑换成功');
                this.paySuccess();
              },
              error: err => {
                console.error(err);
                this.message.error(err.message);
              }
            })
            .add(() => {
              this.loading.recharge = false;
            });
        } else {
          this.paymentComponent
            .confirm({
              businessType: PayBusinessType.BALANCE,
              businessId: result.id
            })
            .subscribe()
            .add(() => {
              this.loading.recharge = false;
            });
        }
      },
      error: err => {
        if (!err || !err.message) return;
        this.message.error(err.message);
      }
    });
  }

  closeModal(): void {
    this.close();
  }

  buyGiftCodes() {
    this.closeModal();

    const priceData = {
      amountOfCredits: this.amountOfCredits.value ? this.amountOfCredits.value : 0,
      numOfCodes: this.numOfCodes.value ? this.numOfCodes.value : 0
    };
    const ref = this.overlayService.open(BuyGiftModalComponent, priceData, {
      panelClass: ['modal']
    });

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  paySuccess() {
    this.closeModal();
    this.user.updateUserInfo();
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }

  get userInfo() {
    return this.user.userInfo;
  }
}
