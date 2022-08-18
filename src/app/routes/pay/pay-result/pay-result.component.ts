import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService, PayResult, PayStatus } from '@core/services/user/payment.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { DictKey, DictPipe } from '@shared/pipes/dict/dict.pipe';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pay-result',
  templateUrl: './pay-result.component.html',
  styleUrls: ['./pay-result.component.less'],
  providers: [PaymentService, DictPipe]
})
export class PayResultComponent extends DestroySubscription implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private paySrv: PaymentService,
    private message: NzMessageService,
    private location: Location,
    private dict: DictPipe,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    this.orderId = params.id;
    this.queryPaymentOrder();
  }

  override ngOnDestroy(): void {
    this.destroy();
    clearInterval(this.payResultSetTimeout);
  }

  DictKey = DictKey;
  payResultSetTimeout: any;
  orderId!: string;
  payResult!: PayResult;
  loading = {
    queryPaymentOrder: false
  };
  errorTxt: string;

  get bussinessType() {
    return this.dict.transform(this.payResult.businessType, this.DictKey.PAY_BUSINESS_TYPE);
  }

  get isPending() {
    return Object.is(this.payResult.status, PayStatus.PENDING);
  }

  get primaryBtnText() {
    if (this.isPending) {
      return '立即支付';
    }
    return this.bussinessType.primaryBtnText;
  }

  queryPaymentOrder(noLoading?: boolean) {
    if (!noLoading) {
      this.loading.queryPaymentOrder = true;
    }
    this.paySrv
      .queryPaymentOrder(this.orderId)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: res => {
          this.payResult = { ...res, expiredTime: res.expiredTime * 1000 };
          if (Object.is(this.payResult.status, PayStatus.PENDING)) {
            this.payResultSetTimeout = setTimeout(() => this.queryPaymentOrder(true), 2000);
          }
        },
        error: err => {
          console.error(err);
          this.message.error(err.message);
        }
      })
      .add(() => (this.loading.queryPaymentOrder = false));
  }

  primaryBtnClick(): void {
    if (this.isPending) {
      this.router.navigateByUrl(`/pay?id=${this.payResult.id}`);
      return;
    }
    this.router.navigateByUrl(this.bussinessType.link, { replaceUrl: true });
  }

  back() {
    this.location.back();
  }

  cancelPayment() {
    this.paySrv.cancel({ id: this.orderId }).pipe(takeUntil(this.destroyStream$)).subscribe();
  }
}
