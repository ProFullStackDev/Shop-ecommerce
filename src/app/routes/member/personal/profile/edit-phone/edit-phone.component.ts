import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { countryCode } from '@assets/contrycode';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { BasicService } from '@core/services/user/basic.service';
import { CacheService } from '@delon/cache';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomValidators } from '@shared/utils/validators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-phone',
  templateUrl: './edit-phone.component.html',
  providers: [BasicService]
})
export class EditPhoneComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private basicSrv: BasicService,
    private message: NzMessageService,
    private modal: NzModalService,
    private cacheSrv: CacheService
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
      this.startTimeInterval();
    }
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

  get smsCodeText() {
    return this.smsTimeRemaining > 0 ? `${this.smsTimeRemaining} s` : '获取验证码';
  }

  startTimeInterval() {
    this.timeInterval = setInterval(() => {
      this.smsTimeRemaining -= 1;
      if (this.smsTimeRemaining < 1) {
        clearInterval(this.timeInterval);
      }
    }, 1000);
  }

  getSmsCode() {
    const mobileForm = this.validateForm.get('mobile');
    if (!mobileForm) return;
    if (mobileForm.valid) {
      this.loading.sms = true;
      const { mobile, mobileArea } = this.validateForm.value;
      this.basicSrv
        .sendChangeMobileSms({ mobile: mobile.toString(), mobileArea })
        .subscribe(
          () => {
            const { mobile, mobileArea } = this.validateForm.value;
            this.modal.confirm({
              nzTitle: '发送成功',
              nzContent: `验证码已发送到${mobileArea}${mobile}上\n请注意查收`,
              nzIconType: 'check-circle'
            });
            this.cacheSrv.set(LocalStorageEnum.UPDATE_MOBILE_SMS_TIME, Date.now() + 60 * 1000);
            this.smsTimeRemaining = 60;
            this.startTimeInterval();
          },
          error => {
            this.message.error(error.message);
            console.error(error);
          }
        )
        .add(() => {
          this.loading.sms = false;
        });
      return;
    }
    mobileForm.markAsDirty();
    mobileForm.updateValueAndValidity({ onlySelf: true });
  }

  validate() {
    return new Observable(observable => {
      if (this.validateForm.valid) {
        const { mobileArea, mobile, smsCode } = this.validateForm.value;
        this.basicSrv.changeMobile({ mobileArea, mobile: mobile.toString(), smsCode }).subscribe(
          () => {
            this.message.success('修改成功');
            observable.next();
            observable.complete();
          },
          error => {
            console.error(error);
            observable.error(error);
            this.message.error(error.message);
          }
        );
      } else {
        observable.error();
        Object.values(this.validateForm.controls).forEach(control => {
          if (control.invalid) {
            control.markAsDirty();
            control.updateValueAndValidity({ onlySelf: true });
          }
        });
      }
    });
  }
}
