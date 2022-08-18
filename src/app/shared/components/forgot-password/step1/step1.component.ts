import { Component, Input, Output, OnDestroy, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { countryCode } from '@assets/contrycode';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { BasicService, SmsMethod } from '@core/services/user/basic.service';
import { CacheService } from '@delon/cache';
import { CustomValidators } from '@shared/utils/validators';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.less']
})
export class Step1Component implements OnInit, OnDestroy {
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
      mobile: [null, [Validators.required, CustomValidators.number]]
    });
    const smsTime = this.cacheSrv.getNone(LocalStorageEnum.FORGOT_PASSWORD_MOBILE_SMS_TIME);
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
  params = {
    current: 0,
    mobileArea: '+86',
    mobile: '',
    smsCode: ''
  };
  @Input()
  get paramsValue() {
    return this.params;
  }
  set paramsValue(val) {
    this.params = val;
    this.paramsValueChange.emit(this.paramsValue);
  }

  @Output()
  readonly paramsValueChange: EventEmitter<any> = new EventEmitter<any>();

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
    this.loading.sms = true;
    const { mobile, mobileArea } = this.validateForm.value;
    this.basicSrv
      .queryMobileSms({ method: SmsMethod.ResetPassword, mobileArea: mobileArea, mobile: mobile.toString() })
      .subscribe(
        () => {
          const { mobile, mobileArea } = this.validateForm.value;
          this.modal.confirm({
            nzTitle: '发送成功',
            nzContent: `验证码已发送到${mobileArea}${mobile}上\n请注意查收`,
            nzIconType: 'check-circle'
          });
          this.cacheSrv.set(LocalStorageEnum.FORGOT_PASSWORD_MOBILE_SMS_TIME, Date.now() + 60 * 1000);
          //this.smsTimeRemaining = 60;
          // this.startTimeInterval();
          this.params = {
            ...this.validateForm.value,
            current: 1
          };
          this.paramsValueChange.emit(this.params);
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

  validate() {
    if (this.validateForm.valid) {
      if (this.smsTimeRemaining > 0) {
        this.params = {
          ...this.validateForm.value,
          current: 1
        };
        this.paramsValueChange.emit(this.params);
      } else {
        this.getSmsCode();
      }
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
