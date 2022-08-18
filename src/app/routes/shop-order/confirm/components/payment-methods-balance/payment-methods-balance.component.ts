import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-payment-methods-balance',
  templateUrl: './payment-methods-balance.component.html',
  styleUrls: ['./payment-methods-balance.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class PaymentMethodsBalanceComponent {
  @Input('amount') amount?: number;
  @Input('orderId') orderId: string;
  @Output() readonly confirm = new EventEmitter();
  constructor(private user: SystemUserService, private message: NzMessageService) {}

  get userInfo() {
    return this.user.userInfo;
  }

  get balance() {
    return this.userInfo.balance;
  }

  get remaining() {
    return (this.balance || 0) - (this.amount || 0);
  }

  get cannotPay() {
    return this.remaining < 0;
  }

  loading = {
    pay: false
  };

  pay() {
    if (this.cannotPay) return;
    this.confirm.emit();
    this.loading.pay = true;
  }
}
