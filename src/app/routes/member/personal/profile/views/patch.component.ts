import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BasicService } from '@core/services/user/basic.service';
import * as md5 from 'md5';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-patch',
  templateUrl: './patch.component.html',
  styleUrls: ['./patch.component.less']
})
export class ProfileComponent implements OnInit {
  constructor(private fb: FormBuilder, private router: Router, private basicService: BasicService, private message: NzMessageService) {}

  validateForm!: FormGroup;
  fileList: any = [];
  memberInfo: any = {};

  // fileList: NzUploadFile[] = [
  //   {
  //     uid: '-1',
  //     name: 'xxx.png',
  //     status: 'done',
  //     url: 'http://www.baidu.com/xxx.png'
  //   }
  // ];
  submitForm(): void {
    if (this.validateForm.valid) {
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
  ngOnInit(): void {
    const data = localStorage.getItem('memberInfo') || '{}';
    this.memberInfo = JSON.parse(`${data}`);
    this.memberInfo.username = this.getName(this.memberInfo.username);
    this.memberInfo.mobile = this.geTel(this.memberInfo.mobile);
    this.memberInfo.email = this.getEmail(this.memberInfo.email);
    this.validateForm = this.fb.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]]
    });
  }
  // 隐藏姓名
  getName(name: string) {
    let newStr;
    if (name.length === 2) {
      newStr = name.substr(0, 1) + '*';
    } else if (name.length > 2) {
      let char = '';
      for (let i = 0, len = name.length - 2; i < len; i++) {
        char += '*';
      }
      newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    } else {
      newStr = name;
    }
    return newStr;
  }
  // 隐藏手机号
  geTel(tel: string) {
    return tel.substring(0, 3) + '****' + tel.substr(tel.length - 4);
  }
  // 隐藏邮件
  getEmail(email: string) {
    if (String(email).indexOf('@') > 0) {
      let newEmail,
        str = email.split('@'),
        _s = '';

      if (str[0].length > 4) {
        _s = str[0].substr(0, 4);
        for (let i = 0; i < str[0].length - 4; i++) {
          _s += '*';
        }
      } else {
        _s = str[0].substr(0, 1);
        for (let i = 0; i < str[0].length - 1; i++) {
          _s += '*';
        }
      }
      newEmail = _s + '@' + str[1];
      return newEmail;
    } else {
      return email;
    }
  }
  confirm(): void {
    console.log('confirm');
  }
  tabsName(): void {
    console.log('tabsName');
  }
  // handleChange(info: NzUploadChangeParam): void {
  //   let fileList = [...info.fileList];

  //   fileList = fileList.slice(-2);

  //   fileList = fileList.map(file => {
  //     if (file.response) {
  //       file.url = file.response.url;
  //     }
  //     return file;
  //   });

  //   this.fileList = fileList;
  // }
}
