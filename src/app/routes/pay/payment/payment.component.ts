import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentPlatformEnum, PaymentService, PayResult, PayStatus } from '@core/services/user/payment.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { loadStripe } from '@stripe/stripe-js';
import { Stripe } from '@stripe/stripe-js/types/stripe-js';
import { StripeElements } from '@stripe/stripe-js/types/stripe-js/elements-group';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less'],
  providers: [PaymentService]
})
export class PaymentComponent extends DestroySubscription implements OnInit {
  constructor(private paySrv: PaymentService, private activatedRoute: ActivatedRoute, private router: Router) {
    super();
  }

  PaymentPlatformEnum = PaymentPlatformEnum;

  loading = {
    getData: false,
    platform: false,
    pay: false
  };

  payResult: PayResult;
  stripe: Stripe;
  stripeElements: StripeElements;
  successCallbackUri: string;

  get showPayBtn() {
    return Object.is(this.payResult?.platformCode, PaymentPlatformEnum.STRIPE);
  }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.queryParams;
    this.loading.getData = true;
    this.loading.platform = true;
    this.paySrv
      .queryPaymentOrder(id)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: res => {
          this.payResult = res;
          if (!Object.is(this.payResult.status, PayStatus.PENDING)) {
            this.router.navigateByUrl(`/pay/result/${this.payResult.id}`, { replaceUrl: true });
            return;
          }
          switch (res.platformCode) {
            case PaymentPlatformEnum.STRIPE:
              this.loadStripe();
              break;
            case PaymentPlatformEnum.TRIPLE:
              this.loadTriple();
              break;
          }
        },
        error: err => {
          console.error(err);
        }
      })
      .add(() => (this.loading.getData = false));
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
    } finally {
      this.loading.platform = false;
    }
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

  async pay() {
    const { platformCode } = this.payResult;
    switch (platformCode) {
      case PaymentPlatformEnum.STRIPE:
        this.stripePay();
        break;
    }
  }

  async stripePay() {
    this.loading.pay = true;
    try {
      const { error } = await this.stripe.confirmPayment({
        elements: this.stripeElements,
        confirmParams: {
          return_url: this.successCallbackUri
        }
      });
      console.log(error);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading.pay = false;
    }
  }
}
