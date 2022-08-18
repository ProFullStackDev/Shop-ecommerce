import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserOrderService } from '@core/services/user/order.service';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { ButtonType } from '@shared/components/payment-modals/models/payment-modals.model';
import { PaymentModalsService } from '@shared/components/payment-modals/services/payment-modals.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { isNullOrUndefinedOrEmpty } from '@shared/utils/utils';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { debounceTime, fromEvent } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-redeem-code-modal',
  templateUrl: './redeem-code-modal.component.html',
  styleUrls: ['./redeem-code-modal.component.less'],
  providers: [UserOrderService]
})
export class RedeemCodeModalComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;
  @ViewChild('redeemCodeInput', { static: true }) redeemCodeInput: ElementRef;

  isScrollable = false;
  code = new FormControl('', [Validators.required]);
  amount: number = 0;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: any,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private translate: TranslateService,
    private paymentModalsService: PaymentModalsService,
    private orderSrv: UserOrderService,
    private user: SystemUserService,
    private message: NzMessageService,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

  loading = {
    exchangeCode: false
  };

  ngOnInit() {
    if (!isNullOrUndefinedOrEmpty(this.modalData.data.code)) {
      this.code.setValue(this.modalData.data.code);
      this.code.disable({ onlySelf: true });
    }
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      console.log(params);
      if (!params) {
        return;
      }
      this.orderSrv
        .queryExchangeCodeAmount(params.code)
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(amount => {
          this.amount = amount;
        });
    });
    this.getRedeemCodeAmount();
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  closeModal(): void {
    this.close();
  }

  getRedeemCodeAmount(): void {
    fromEvent(this.redeemCodeInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        filter(res => res.length > 2 || res.length === 0),
        debounceTime(1000),
        distinctUntilChanged(),
        takeUntil(this.destroyStream$)
      )
      .subscribe(code => {
        this.orderSrv
          .queryExchangeCodeAmount(code)
          .pipe(takeUntil(this.destroyStream$))
          .subscribe(amount => {
            this.amount = amount;
          });
      });
  }

  sendData(): void {
    if (!this.code.valid || this.loading.exchangeCode) {
      return;
    }

    const data = {
      code: this.code.value
    };

    this.loading.exchangeCode = true;

    this.orderSrv
      .exchangeCode({
        code: this.code.value
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: () => {
          this.user.updateUserInfo();
          this.message.success('兑换成功'); // For successful`
          this.paymentModalsService.redeemCodeData(data);
          this.closeModal();
        },
        error: err => {
          console.error(err);
          this.message.error(err.message);
        }
      })
      .add(() => (this.loading.exchangeCode = false));
  }

  private close(data: any | null = null): void {
    this.overlayRef.close({ t: 'hello' });
  }
}
