import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { BasicService } from '@core/services/user/basic.service';
import { CacheService } from '@delon/cache';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-email',
  templateUrl: './edit-email.component.html',
  providers: [BasicService]
})
export class EditEmailComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private basicSrv: BasicService,
    private message: NzMessageService,
    private modal: NzModalService,
    private cacheSrv: CacheService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      emailCode: [null, Validators.required]
    });
    const smsTime = this.cacheSrv.getNone(LocalStorageEnum.UPDATE_EMAIL_CODE_TIME);
    const timeRemaining = Math.max((Number(smsTime) - Date.now()) / 1000, 0);
    if (timeRemaining > 0) {
      this.emailCodeTimeRemaining = Math.floor(timeRemaining);
      this.startTimeInterval();
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }

  emailCodeTimeRemaining = 0;

  verificationCodeSent = false;

  timeInterval: any;

  validateForm!: FormGroup;

  loading = {
    emailCode: false,
    submit: false
  };

  get emailCodeText() {
    return this.emailCodeTimeRemaining > 0 ? `${this.emailCodeTimeRemaining} s` : '获取验证码';
  }

  startTimeInterval() {
    this.timeInterval = setInterval(() => {
      this.emailCodeTimeRemaining -= 1;
      if (this.emailCodeTimeRemaining < 1) {
        this.verificationCodeSent = true;
        clearInterval(this.timeInterval);
      }
    }, 1000);
  }

  getEmailCode() {
    const emailForm = this.validateForm.get('email');
    if (!emailForm) return;
    if (emailForm.valid) {
      this.loading.emailCode = true;
      const { email } = this.validateForm.value;
      this.basicSrv
        .sendChangeEmailCode({ email })
        .subscribe(
          () => {
            this.verificationCodeSent = true;
            this.modal.confirm({
              nzTitle: '发送成功',
              nzContent: `验证码已发送到${email}上，\n请注意查收`,
              nzIconType: 'check-circle'
            });
            this.cacheSrv.set(LocalStorageEnum.UPDATE_EMAIL_CODE_TIME, Date.now() + 60 * 1000);
            this.emailCodeTimeRemaining = 60;
            this.startTimeInterval();
          },
          error => {
            this.message.error(error.message);
            console.error(error);
          }
        )
        .add(() => {
          this.loading.emailCode = false;
        });
      return;
    }
    emailForm.markAsDirty();
    emailForm.updateValueAndValidity({ onlySelf: true });
  }

  validate() {
    return new Observable(observable => {
      if (this.validateForm.valid) {
        const { emailCode, email } = this.validateForm.value;
        this.basicSrv.changeEmail({ emailCode, email }).subscribe(
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
