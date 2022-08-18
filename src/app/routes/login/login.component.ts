import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { countryCode } from '@assets/contrycode';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { BasicService, VerifyCodeType, SmsMethod } from '@core/services/user/basic.service';
import { EmService } from '@core/system/customerService/em.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { CacheService } from '@delon/cache';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { CustomValidators } from '@shared/utils/validators';
import * as md5 from 'md5';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent extends DestroySubscription implements OnInit {
  validateForm = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
    captchaId: [null, [Validators.required]],
    captchaCode: [null, [Validators.required]],
    remember: [true]
  });

  verifyCodeImg!: string;

  loginType = 0; // 0: account+password 1: verifyCode

  validateMobileForm = this.fb.group({
    mobileArea: ['+86', Validators.required],
    mobile: [null, [Validators.required]],
    smsCode: [null, [Validators.required]]
  });

  countryCode = countryCode.map(item => `+${item.code}`);

  smsTimeRemaining = 0;

  timeInterval: any;
  loginInfo: any;
  loading = {
    verifyCode: false,
    submit: false,
    sms: false
  };

  mobileControl = new FormControl(null, [Validators.required]);

  ngOnInit(): void {
    this.getVerifyCode();
    this.customSrv.getScript();
    this.customSrv.load(this.systemUserService.userInfo);
    const smsTime = this.cacheSrv.getNone(LocalStorageEnum.LOGIN_MOBILE_SMS_TIME);
    const timeRemaining = Math.max((Number(smsTime) - Date.now()) / 1000, 0);
    if (timeRemaining > 0) {
      this.smsTimeRemaining = Math.floor(timeRemaining);
      this.startTimeInterval();
    }
    this.loginInfo = this.localStorageService.getItem('loginInfo');
    if (this.loginInfo) {
      this.loginInfo = JSON.parse(atob(this.loginInfo));
      this.validateForm.controls.username.setValue(this.loginInfo.username);
    }
  }

  constructor(
    private modal: NzModalService,
    private apiService: BasicService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private systemUserService: SystemUserService,
    private cartSrv: SystemCartService,
    private readonly localStorageService: LocalStorageService,
    private cacheSrv: CacheService,
    private customSrv: EmService
  ) {
    super();
    let loginInfo = {};
    this.validateForm.valueChanges.subscribe((form: any) => {
      if (form.remember) {
        loginInfo = { username: form.username };
        this.localStorageService.setItem('loginInfo', btoa(JSON.stringify(loginInfo)));
      } else {
        this.localStorageService.removeItem('loginInfo');
      }
    });
  }

  setMobileFormValue(formData: any): void {
    this.validateMobileForm.get('mobileArea')?.patchValue(formData.dialCode);
    this.validateMobileForm.get('mobile')?.patchValue(formData.number.replace(' ', ''));
  }

  validate(): void {
    console.log(this.validateForm.value);
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

  getVerifyCode(): void {
    this.loading.verifyCode = true;
    this.apiService
      .getVerifyCode(VerifyCodeType.Login)
      .subscribe(
        res => {
          this.validateForm.patchValue({ captchaId: res.captchaId });
          this.verifyCodeImg = res.picture;
        },
        error => {
          console.error(error);
          this.message.error(error.message);
        }
      )
      .add(() => {
        this.loading.verifyCode = false;
      });
  }

  submit(): void {
    this.loading.submit = true;
    const formData = this.validateForm.value;
    this.apiService
      .login({
        ...formData,
        password: md5(formData.password).toString()
      })
      .subscribe(
        () => {
          this.message.success('登录成功');
          this.apiService.getUserInfo().subscribe(userRes => {
            this.systemUserService.setUserInfo(userRes);
            setTimeout(() => {
              this.cartSrv.getCart().subscribe(() => {
                this.cartSrv.addStorageCartToDb().subscribe(() => this.systemUserService.login(userRes));
                this.router.navigate(['/']);
              });
            }, 500);
          });
        },
        error => {
          console.error(error);
          this.getVerifyCode();
          this.message.error(error.message);
        }
      )
      .add(() => {
        this.loading.submit = false;
      });
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
    if (!this.validateMobileForm.controls.mobileArea.valid) {
      this.validateMobileForm.controls.mobileArea.markAsDirty();
      this.validateMobileForm.controls.mobileArea.updateValueAndValidity({ onlySelf: true });
      return;
    }
    if (!this.validateMobileForm.controls.mobile.valid) {
      this.validateMobileForm.controls.mobile.markAsDirty();
      this.validateMobileForm.controls.mobile.updateValueAndValidity({ onlySelf: true });
      return;
    }
    this.loading.sms = true;
    const { mobile, mobileArea } = this.validateMobileForm.value;
    this.apiService
      .queryMobileSms({ method: SmsMethod.LoginByMobilePhone, mobileArea: mobileArea, mobile: mobile.toString() })
      .subscribe(
        () => {
          const { mobile, mobileArea } = this.validateMobileForm.value;
          this.modal.confirm({
            nzTitle: '发送成功',
            nzContent: `验证码已发送到${mobileArea}${mobile}上\n请注意查收`,
            nzIconType: 'check-circle'
          });
          this.cacheSrv.set(LocalStorageEnum.LOGIN_MOBILE_SMS_TIME, Date.now() + 60 * 1000);
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

  validateMobile(): void {
    if (this.validateMobileForm.valid) {
      this.submitMobile();
    } else {
      Object.values(this.validateMobileForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  submitMobile() {
    this.loading.submit = true;
    const formData = this.validateMobileForm.value;
    this.apiService
      .loginByMobilePhone({
        ...formData,
        mobile: formData.mobile.toString()
      })
      .subscribe(
        () => {
          this.message.success('登录成功');
          this.apiService.getUserInfo().subscribe(userRes => {
            this.systemUserService.setUserInfo(userRes);
            setTimeout(() => {
              this.cartSrv.getCart().subscribe(() => {
                this.cartSrv.addStorageCartToDb().subscribe(() => this.systemUserService.login(userRes));
              });
            }, 500);
          });
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
}
