import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {
  PayBusinessType,
  PaymentPlatform,
  PaymentPlatformEnum,
  PaymentService,
  PaymentType,
  PayResult
} from '@core/services/user/payment.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from '@stripe/stripe-js/types/stripe-js';
import { StripeElements } from '@stripe/stripe-js/types/stripe-js/elements-group';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-payment-methods-card',
  templateUrl: './payment-methods-card.component.html',
  styleUrls: ['./payment-methods-card.component.less'],
  providers: [PaymentService]
})
export class PaymentMethodsCardComponent extends DestroySubscription implements OnInit {
  @Input('amount') amount?: number;
  @Output() readonly select = new EventEmitter();
  constructor(private paymentService: PaymentService, private message: NzMessageService) {
    super();
  }

  paymentPlatform = PaymentPlatformEnum.STRIPE;

  payWayList: PaymentPlatform[];

  selectedPlatformCode: string;
  successCallbackUri: string;

  loading = {
    createPayOrder: false,
    pay: false
  };

  payResult: PayResult;
  stripe: Stripe;
  stripeElements: StripeElements;

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
          this.loadStripe();
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

  async loadStripe() {
    try {
      const clientJson = JSON.parse(this.payResult.clientJson);
      const { clientSecret, pubKey, successUri } = clientJson;
      const stripe = await loadStripe(pubKey);
      this.successCallbackUri = successUri;
      if (!stripe) return;
      this.stripe = stripe;
      this.stripeElements = stripe.elements({ appearance: { theme: 'stripe' }, clientSecret });

      const paymentElement = this.stripeElements.create('payment');
      paymentElement.mount('#payment-element');
    } catch (e) {
      console.error(e);
    }
  }

  async pay() {
    this.loading.pay = true;
    try {
      const { error } = await this.stripe.confirmPayment({
        elements: this.stripeElements,
        confirmParams: {
          return_url: this.successCallbackUri
        }
      });
      console.error(error);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading.pay = false;
    }
  }
}
