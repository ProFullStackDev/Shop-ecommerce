import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { countryCode } from '@assets/contrycode';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { BasicService } from '@core/services/user/basic.service';
import { CacheService } from '@delon/cache';
import { TranslateService } from '@ngx-translate/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './setup-password.html',
  styleUrls: ['./setup-password.component.less'],
  providers: [BasicService]
})
export class setPasswordComponent implements OnInit, OnDestroy {
  private paymentpassword: string;
  private confirmpassword: string;

  constructor(
    private fb: FormBuilder,
    private basicSrv: BasicService,
    private message: NzMessageService,
    private modal: NzModalService,
    private cacheSrv: CacheService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      mobileArea: ['+86', Validators.required],
      mobile: [null],
      smsCode: [null, Validators.required]
    });
    const smsTime = this.cacheSrv.getNone(LocalStorageEnum.UPDATE_MOBILE_SMS_TIME);
    const timeRemaining = Math.max((Number(smsTime) - Date.now()) / 1000, 0);
    if (timeRemaining > 0) {
      this.smsTimeRemaining = Math.floor(timeRemaining);
    }
  }

  // this called every time when user changed the code
  onCodeChanged(code: string) {
    console.log('onCodeChanged', code);
  }

  // this called only if user entered full code
  paymentCompleted(code: string) {
    this.paymentpassword = code;
    console.log('paymentCompleted', code);
  }

  // this called only if user entered full code
  confirmCompleted(code: string) {
    this.confirmpassword = code;
    console.log('confirmCompleted', code);
  }

  setMobileFormValue(formData: any): void {
    this.validateForm.get('mobileArea')?.patchValue(formData.dialCode);
    this.validateForm.get('mobile')?.patchValue(formData.number.replace(' ', ''));
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }

  smsTimeRemaining = 0;

  timeInterval: any;

  countryCode = countryCode.map(item => `+${item.code}`);

  validateForm!: FormGroup;

  loading = {
    sms: false,
    submit: false
  };

  validate() {
    return new Observable(observable => {
      if (this.paymentpassword && this.confirmpassword) {
        if (this.paymentpassword !== this.confirmpassword) {
          this.message.error('两次密码不一致');
          observable.error();
        } else {
          this.basicSrv.setupPassword({ newPinCode: this.paymentpassword.toString() }).subscribe(
            () => {
              this.message.success('设置成功');
              observable.next();
              observable.complete();
            },
            error => {
              console.error(error);
              observable.error(error);
              this.message.error(error.message);
            }
          );
        }
      } else {
        this.message.error(this.translate.instant('order-payment-password-error'));
        observable.error();
      }
    });
  }
}
