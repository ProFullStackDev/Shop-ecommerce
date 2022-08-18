import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasicService } from '@core/services/user/basic.service';
import { PayBusinessType } from '@core/services/user/payment.service';
import { SystemUserService } from '@core/system/system-user.service';
import { PaymentComponent, PlatformChangeData } from '@shared/components/payment/payment.component';
import { MAX_VALUE_LENGTH, MIN_VALUE_LENGTH } from '@shared/statics/payments-statics/payment-statics';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.less']
})
export class RechargeComponent implements OnInit {
  minAmount = MIN_VALUE_LENGTH;
  maxAmount = MAX_VALUE_LENGTH;

  constructor(
    private memberSrv: SystemUserService,
    private basicSrv: BasicService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  @ViewChild('paymentComponent') paymentComponent: PaymentComponent;

  ngOnInit() {
    this.validateForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(this.minAmount), Validators.max(this.maxAmount)]]
    });
  }

  validateForm!: FormGroup;

  loading = {
    recharge: false
  };

  get memberInfo() {
    return this.memberSrv.userInfo;
  }

  selectedPaymentCode: string;

  validate() {
    if (this.validateForm.valid) {
      this.confirm();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirm() {
    const { amount } = this.validateForm.value;
    this.loading.recharge = true;
    this.basicSrv.recharge({ actualAmountPaid: amount }).subscribe({
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

  platformChange(platformChangeData: PlatformChangeData) {
    this.selectedPaymentCode = platformChangeData.platformCode || '';
  }

  paySuccess() {
    this.memberSrv.updateUserInfo();
    this.message.success('充值成功');
  }
}
