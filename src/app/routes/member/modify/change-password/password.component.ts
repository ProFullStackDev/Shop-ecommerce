import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicService } from '@core/services/user/basic.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomValidators } from '@shared/utils/validators';
import * as md5 from 'md5';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.less']
})
export class PasswordComponent extends DestroySubscription implements OnInit {
  private currentCompleted: string;
  private newCompleted: string;
  private confirmCompleted: string;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private basicService: BasicService,
    private message: NzMessageService,
    private userSrv: SystemUserService,
    private basicSrv: BasicService
  ) {
    super();
  }

  validateForm!: FormGroup;

  form = {
    currentForm: false,
    newForm: false,
    confirmForm: false,
    diffForm: false
  };

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

  ngOnInit(): void {}

  validate() {
    return new Observable(observable => {
      if (!this.currentCompleted) {
        this.form.currentForm = true;
      }
      if (!this.newCompleted) {
        this.form.newForm = true;
      }
      if (!this.confirmCompleted) {
        this.form.confirmForm = true;
        this.form.diffForm = false;
        observable.error();
        return;
      }
      this.basicSrv.setupPassword({ oldPinCode: this.currentCompleted, newPinCode: this.newCompleted }).subscribe(
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
    });
  }

  // this called only if user entered full code
  currentComplete(code: string) {
    this.currentCompleted = code;
  }

  newComplete(code: string) {
    this.newCompleted = code;
  }

  confirmComplete(code: string) {
    this.confirmCompleted = code;
  }

  // this called every time when user changed the code
  currentChanged(code: string) {
    if (!code) {
      this.form.currentForm = true;
      return;
    } else {
      this.form.currentForm = false;
      return;
    }
  }

  // this called every time when user changed the code
  newChanged(code: string) {
    if (!code) {
      this.form.newForm = true;
      return;
    } else {
      this.form.newForm = false;
      return;
    }
  }

  // this called every time when user changed the code
  confirmChanged(code: string) {
    if (!code) {
      this.form.confirmForm = true;
      this.form.diffForm = false;
      return;
    }
    if (code !== this.newCompleted) {
      this.form.confirmForm = false;
      this.form.diffForm = true;
      return;
    } else {
      this.form.confirmForm = false;
      this.form.diffForm = false;
      return;
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
