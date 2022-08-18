import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicService } from '@core/services/user/basic.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomValidators } from '@shared/utils/validators';
import * as md5 from 'md5';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.less']
})
export class forgetStep2Component extends DestroySubscription implements OnInit {
  private newCompleted: string;
  private confirmCompleted: string;
  constructor(private fb: FormBuilder, private basicService: BasicService, private message: NzMessageService) {
    super();
  }

  params = {
    current: 1,
    mobileArea: '',
    mobile: '',
    smsCode: ''
  };

  form = {
    newForm: false,
    confirmForm: false,
    diffForm: false
  };

  @Input()
  get paramsValue() {
    return this.params;
  }
  set paramsValue(val) {
    this.params = val;
    //console.log('step2', this.params);
    this.paramsValueChange.emit(this.paramsValue);
  }

  newComplete(code: string) {
    this.newCompleted = code;
  }

  confirmComplete(code: string) {
    this.confirmCompleted = code;
  }

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

  @Output()
  readonly paramsValueChange: EventEmitter<any> = new EventEmitter<any>();

  pre(): void {
    this.params.current = 0;
    this.paramsValueChange.emit(this.params);
  }

  next(): void {
    this.params.current = 2;
    this.paramsValueChange.emit(this.params);
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
      newPassword: [null, [CustomValidators.password]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      smsCode: [null, Validators.required]
    });
  }

  validate(): void {
    this.submit();
    // if (this.validateForm.valid) {
    //   this.submit();
    // } else {
    //   Object.values(this.validateForm.controls).forEach(control => {
    //     if (control.invalid) {
    //       control.markAsDirty();
    //       control.updateValueAndValidity({ onlySelf: true });
    //     }
    //   });
    // }
  }

  submit(): void {
    this.loading.submit = true;
    if (!this.newCompleted) {
      this.form.newForm = true;
    }
    if (!this.confirmCompleted) {
      this.form.confirmForm = true;
      this.form.diffForm = false;
      return;
    }
    this.basicService
      .setupPassword({ smsCode: this.validateForm.value.smsCode, newPinCode: this.newCompleted })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.next();
        },
        error => {
          this.message.error(error.message);
        }
      )
      .add(() => (this.loading.submit = false));
  }
}
