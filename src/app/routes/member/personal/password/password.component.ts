import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicService } from '@core/services/user/basic.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomValidators } from '@shared/utils/validators';
import * as md5 from 'md5';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less']
})
export class PasswordComponent extends DestroySubscription implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private basicService: BasicService,
    private message: NzMessageService,
    private userSrv: SystemUserService
  ) {
    super();
  }

  validateForm!: FormGroup;

  loading = {
    submit: false
  };

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [CustomValidators.password]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
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

  submit(): void {
    this.loading.submit = true;
    const params = {
      oldPassword: md5(this.validateForm.value.oldPassword).toString(),
      newPassword: md5(this.validateForm.value.newPassword).toString()
    };
    this.basicService
      .changePassword(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.message.success('修改密码成功');
          this.userSrv.logout();
        },
        error => {
          this.message.error(error.message);
        }
      )
      .add(() => (this.loading.submit = false));
  }
}
