import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService, PayResult, PayStatus } from '@core/services/user/payment.service';
import { DictKey, DictPipe } from '@shared/pipes/dict/dict.pipe';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-pay-cancel',
  templateUrl: './pay-cancel.component.html',
  styleUrls: ['./pay-cancel.component.less'],
  providers: [PaymentService, DictPipe]
})
export class PayCancelComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private location: Location,
    private router: Router,
    private paySrv: PaymentService,
    private dict: DictPipe,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    const params = this.activeRoute.snapshot.params;
    this.orderId = params.id;
    this.queryPaymentOrder();
  }

  orderId!: string;
  payResult!: PayResult;
  loading = {
    queryPaymentOrder: false
  };
  errorTxt = this.dict.transform(PayStatus.CANCEL, DictKey.PAY_STATUS, 'tips');

  queryPaymentOrder() {
    this.loading.queryPaymentOrder = true;
    this.paySrv
      .queryPaymentOrder(this.orderId)
      .subscribe({
        next: res => {
          this.payResult = {
            ...res,
            status: PayStatus.CANCEL
          };
          this.paySrv.cancel({ id: this.orderId }).subscribe();
        },
        error: err => {
          console.error(err);
          this.message.error(err.message);
          this.errorTxt = err.message;
        }
      })
      .add(() => (this.loading.queryPaymentOrder = false));
  }

  gotoHome() {
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  back() {
    this.location.back();
  }
}
