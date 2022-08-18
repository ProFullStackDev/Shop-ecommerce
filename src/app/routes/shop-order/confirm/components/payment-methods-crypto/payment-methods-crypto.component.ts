import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import {
  PayBusinessType,
  PaymentPlatform,
  PaymentPlatformEnum,
  PaymentService,
  PaymentType,
  PayResult
} from '@core/services/user/payment.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-payment-methods-crypto',
  templateUrl: './payment-methods-crypto.component.html',
  styleUrls: ['./payment-methods-crypto.component.less'],
  providers: [PaymentService]
})
export class PaymentMethodsCryptoComponent extends DestroySubscription implements OnInit {
  @Input('amount') amount?: number;
  @Output() readonly select = new EventEmitter();

  constructor(private paymentService: PaymentService, private message: NzMessageService) {
    super();
  }

  paymentPlatform = PaymentPlatformEnum.TRIPLE;

  payWayList: PaymentPlatform[];

  selectedPlatformCode: string;

  loading = {
    createPayOrder: false,
    pay: false
  };

  payResult: PayResult;

  ngOnInit(): void {
    this.queryPlatformList();
  }

  queryPlatformList() {
    this.paymentService
      .queryPlatformList()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: res => {
          this.payWayList = res.filter(
            platform => Object.is(platform.platformGroup, this.paymentPlatform) && !Object.is(platform.platformCode, this.paymentPlatform)
          );
        }
      });
  }

  selectPayWay(platformCode: string) {
    this.select.emit();
    this.selectedPlatformCode = platformCode;
  }

  confirm(orderId: string, businessType: PayBusinessType) {
    this.loading.createPayOrder = true;
    this.paymentService
      .payV2({
        platformCode: this.selectedPlatformCode,
        paymentType: PaymentType.client,
        businessId: orderId,
        businessType
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: res => {
          this.payResult = res;
          this.loadTriple();
        },
        error: err => {
          console.error(err);
          this.message.error(err.message);
        }
      })
      .add(() => {
        this.loading.createPayOrder = false;
      });
  }

  loadTriple() {
    const clientJson = JSON.parse(this.payResult.clientJson);
    const paymentElement = document.querySelector('#payment-element');
    if (!paymentElement) return;
    paymentElement.innerHTML = `
  <triplea-ecommerce-payment-v1
  id="payment"
  payment-reference="${clientJson.paymentReference}"
  access-token="${clientJson.accessToken}"
>
</triplea-ecommerce-payment-v1>
  `;
  }
}
