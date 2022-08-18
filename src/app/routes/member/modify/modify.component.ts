import { Component, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateService } from '@ngx-translate/core';
import { PasswordComponent } from '@routes/member/modify/change-password/password.component';
import { ForgetPaymentPasswordComponent } from '@routes/member/modify/forget-payment-password/forget-payment-password.component';
import { setPasswordComponent } from '@routes/member/modify/setup-password/setup-password.component';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';
import { NzModalRef } from 'ng-zorro-antd/modal/modal-ref';

@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.less']
})
export class ModifyComponent implements OnInit {
  constructor(private readonly user: SystemUserService, private modal: NzModalService, private translate: TranslateService) {}

  ngOnInit(): void {
    console.log('显示用户信息userInfo', this.isSettingPaymentKey);
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get isSettingPaymentKey() {
    return this.user.userInfo.isSettingPaymentKey;
  }

  createEditModal(modalConfig: ModalOptions): NzModalRef {
    const modal = this.modal.create({
      nzMaskClosable: false,
      nzOnCancel: () => {
        modal.close();
      },
      nzOnOk: content => {
        modal.updateConfig({
          nzOkLoading: true,
          nzCancelDisabled: true
        });
        content
          .validate()
          .subscribe(() => {
            modal.destroy();
            this.user.updateUserInfo();
          })
          .add(() => {
            modal.updateConfig({ nzOkLoading: false, nzCancelDisabled: false });
          });
        return false;
      },
      ...modalConfig
    });
    return modal;
  }

  public createPayment(): void {
    this.createEditModal({
      nzTitle: this.translate.instant('order-payment-set-password'),
      nzContent: setPasswordComponent
    });
  }

  public changePayment(): void {
    this.createEditModal({
      nzTitle: '修改支付密码',
      nzContent: PasswordComponent
    });
  }

  public forgetPayment(): void {
    this.createEditModal({
      nzTitle: '找回支付密码',
      nzFooter: null,
      nzContent: ForgetPaymentPasswordComponent,
      nzWidth: 850
    });
    console.log('2222222');
  }
}
