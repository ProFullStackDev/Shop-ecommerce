import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BasicService } from '@core/services/user/basic.service';
import { UserOrderService } from '@core/services/user/order.service';
import { PayBusinessType } from '@core/services/user/payment.service';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { PaymentConfirmationModalComponent } from '@shared/components/payment-modals/modules/payment-confirmation-modal/components/payment-confirmation-modal/payment-confirmation-modal.component';
import { PaymentModalsService } from '@shared/components/payment-modals/services/payment-modals.service';
import { PaymentComponent } from '@shared/components/payment/payment.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-buy-gift-modal',
  templateUrl: './buy-gift-modal.component.html',
  styleUrls: ['./buy-gift-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UserOrderService]
})
export class BuyGiftModalComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;
  @ViewChild('paymentComponent') paymentComponent: PaymentComponent;

  isScrollable = false;
  amountOfCredits = new FormControl(null, [Validators.required]);
  numOfCodes = new FormControl(null, [Validators.required]);

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
    if (this.modalData.amountOfCredits && this.modalData.amountOfCredits) {
      this.amountOfCredits.patchValue(this.modalData.amountOfCredits);
      this.numOfCodes.patchValue(this.modalData.amountOfCredits);
    }
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  closeModal(): void {
    this.close();
  }

  openConfirmModal(): Observable<boolean> | null {
    this.closeModal();
    this.amountMinError = null;
    this.amountMaxError = null;

    const priceData = {
      amountOfCredits: this.amountOfCredits.value ? this.amountOfCredits.value : 0,
      numOfCodes: this.numOfCodes.value ? this.numOfCodes.value : 0
    };
    const ref = this.overlayService.open(PaymentConfirmationModalComponent, priceData, {
      panelClass: ['modal']
    });

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }

  get userInfo() {
    return this.user.userInfo;
  }
}
