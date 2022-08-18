import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { countryCode } from '@assets/contrycode';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { BasicService, VerifyCodeType, SmsMethod } from '@core/services/user/basic.service';
import { CacheService } from '@delon/cache';
import { TranslateService } from '@ngx-translate/core';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomValidators } from '@shared/utils/validators';
import * as md5 from 'md5';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent extends DestroySubscription implements AfterViewInit, OnInit {
  type: string;
  constructor(
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder,
    private service: BasicService,
    private cacheSrv: CacheService,
    private translate: TranslateService
  ) {
    super();
  }

  lang = '';
  registrationTitle = '';
  registrationAgree = '';
  registrationCancel = '';
  registrationLinks = [
    {
      link: 'https://about.tyqoon.co/terms-conditions',
      text: 'register-page-agreement'
    },
    {
      link: 'https://about.tyqoon.co/privacy-policy',
      text: 'register-page-policy'
    }
  ];

  @ViewChild('modalContent') modalContent: TemplateRef<any> | undefined;

  validateForm!: FormGroup;

  verifyCodeImg!: string;

  smsTimeRemaining = 0;

  timeInterval: any;

  countryCode = countryCode.map(item => `+${item.code}`);

  loading = {
    verifyCode: false,
    submit: false,
    sms: false
  };

  ngOnInit(): void {
    this.translate
      .get('register-page-agreement')
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(t => (this.registrationTitle = t));
    this.translate
      .get('register-page-decline')
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(t => (this.registrationCancel = t));
    this.translate
      .get('register-page-agree')
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(t => (this.registrationAgree = t));
    const params = this.activeRoute.snapshot.queryParams;
    this.validateForm = this.fb.group({
      username: [null, [CustomValidators.userName]],
      password: [null, [CustomValidators.password]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]],
      // email: [null, [Validators.required, Validators.email]],
      mobileArea: ['+86'],
      mobile: [null, [CustomValidators.number]],
      email: [null, CustomValidators.email],
      verifyCode: [null, [Validators.required]],
      // mobile: [null, [Validators.required, CustomValidators.phone]],
      captchaCode: [null, [Validators.required]],
      recommenderId: [params.recommenderId || null],
      captchaId: [null]
    });
    this.getVerifyCode();
    const smsTime = this.cacheSrv.getNone(LocalStorageEnum.REGISTER_MOBILE_SMS_TIME);
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
    if (!this.validateForm.controls.mobileArea.valid) {
      this.validateForm.controls.mobileArea.markAsDirty();
      this.validateForm.controls.mobileArea.updateValueAndValidity({ onlySelf: true });
      return;
    }
    if (!this.validateForm.controls.mobile.valid) {
      this.validateForm.controls.mobile.markAsDirty();
      this.validateForm.controls.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.loading.sms = true;
    const { mobile, mobileArea } = this.validateForm.value;
    this.service
      .queryMobileSms({ method: SmsMethod.Register, mobileArea: mobileArea, mobile: mobile.toString() })
      .subscribe(
        () => {
          // no
          const { mobile, mobileArea } = this.validateForm.value;
          this.modal.confirm({
            nzTitle: '发送成功',
            nzContent: `验证码已发送到 ${mobileArea}${mobile} 上\n请注意查收`,
            nzIconType: 'check-circle'
          });
          this.cacheSrv.set(LocalStorageEnum.REGISTER_MOBILE_SMS_TIME, Date.now() + 60 * 1000);
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
    this.type = 'sms';
    return;
  }

  getEmailCode() {
    if (!this.validateForm.controls.email.valid) {
      this.validateForm.controls.email.markAsDirty();
      this.validateForm.controls.email.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.service.SendEmailVerifyCodeParam({ email: this.validateForm.value.email, type: 'register' }).subscribe(
      () => {
        const { email } = this.validateForm.value;
        this.modal.confirm({
          nzTitle: this.translate.instant('register-alert-email-header'),
          nzContent: `${this.translate.instant('register-alert-email-body')} ${email}\n${this.translate.instant(
            'register-alert-email-body2'
          )}`,
          nzIconType: 'check-circle'
        });
        this.cacheSrv.set(LocalStorageEnum.REGISTER_EMAIL_TIME, Date.now() + 60 * 1000);
        this.smsTimeRemaining = 60;
        this.startTimeInterval();
      },
      error => {
        this.message.error(error.message);
        console.error(error);
      }
    );
    this.type = 'email';
    return;
  }

  ngAfterViewInit(): void {
    const currentLang = localStorage.getItem('current-lang');
    if (currentLang === 'cn-TR' || currentLang === 'zh-CN') {
      this.lang = 'zh-hans';
    } else {
      this.lang = 'en';
    }

    this.modal.create({
      nzTitle: this.registrationTitle,
      nzContent: this.modalContent,
      nzClosable: false,
      nzMaskClosable: false,
      nzCancelText: this.registrationCancel,
      nzOkText: this.registrationAgree,
      nzOnCancel: () => {
        this.router.navigateByUrl('/');
      }
    });
  }

  getVerifyCode(): void {
    this.loading.verifyCode = true;
    this.service
      .getVerifyCode(VerifyCodeType.Register)
      .subscribe(
        res => {
          this.validateForm.patchValue({ captchaId: res.captchaId });
          this.verifyCodeImg = res.picture;
        },
        error => {
          // console.error(error);
          // this.message.error(error.message);
        }
      )
      .add(() => {
        this.loading.verifyCode = false;
      });
  }

  validate(): void {
    if (this.validateForm.valid) {
      this.submit();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submit() {
    this.loading.submit = true;
    const formData = { ...this.validateForm.value, type: this.type };
    this.service
      .registerV2({
        ...formData,
        mobile: formData.mobile ? formData.mobile.toString() : null,
        email: formData.email ? formData.email : null,
        password: md5(formData.password).toString()
      })
      .subscribe(
        () => {
          this.message.success('注册成功！请登录');
          this.router.navigateByUrl('/login');
        },
        error => {
          console.error(error);
          this.message.error(error.message);
          this.getVerifyCode();
        }
      )
      .add(() => {
        this.loading.submit = false;
      });
  }

  confirmationValidator = (control: FormControl): ValidationErrors => {
    if (!control.value) {
      return { required: true };
    } else if (!Object.is(control.value, this.validateForm.controls.password.value)) {
      return { confirm: true, error: true };
    }
    return {};
  };
}
