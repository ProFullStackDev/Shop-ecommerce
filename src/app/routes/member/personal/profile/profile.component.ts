import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FileService } from '@core/services/user/file.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { environment } from '@environments/environment';
import { InviteFriendsComponent } from '@routes/dashboard/modules/invite-friends/components/invite-friends/invite-friends.component';
import { SharedModalComponent } from '@routes/dashboard/modules/shared-modal/components/shared-modal/shared-modal.component';
import { AddRecommendComponent } from '@routes/member/personal/profile/add-recommend/add-recommend.component';
import { EditEmailComponent } from '@routes/member/personal/profile/edit-email/edit-email.component';
import { EditPhoneComponent } from '@routes/member/personal/profile/edit-phone/edit-phone.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService, ModalOptions } from 'ng-zorro-antd/modal';
import { NzModalRef } from 'ng-zorro-antd/modal/modal-ref';
import { NzUploadFile, NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent extends DestroySubscription implements OnInit {
  readonly domainName = location.origin;
  readonly userId = this.userInfo.id;

  get userInfo() {
    return this.userSrv.userInfo;
  }

  constructor(
    private userSrv: SystemUserService,
    private modal: NzModalService,
    private fileService: FileService,
    private message: NzMessageService,
    private http: HttpClient,
    private readonly overlayService: OverlayService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService
  ) {
    super();
  }

  imageData: string;

  ngOnInit(): void {
    this.userSrv.updateUserInfo();
  }

  get memberInfo() {
    return this.userSrv.userInfo;
  }

  get displayUsername() {
    const name = this.memberInfo.username;
    return this.encryptText(name, this.showFullUsername);
  }

  get displayEmail() {
    const email = this.memberInfo.email;
    return email ? this.encryptText(email) : '--';
  }

  get displayPhone() {
    const { mobile, mobileArea } = this.memberInfo;
    return mobile ? `${mobileArea} ${this.encryptText(mobile)}` : '--';
  }

  get pid() {
    return this.memberInfo.pid;
  }

  showFullUsername = false;

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  encryptText(text: string, showFull?: boolean) {
    const [first, middle, last] = [text.slice(0, 1), text.slice(1, -1), text.slice(-1)];
    return `${first}${showFull ? middle : '*'.repeat(middle.length)}${last}`;
  }

  editPhone() {
    this.createEditModal({
      nzTitle: '修改手机号',
      nzContent: EditPhoneComponent
    });
  }

  editEmail() {
    this.createEditModal({
      nzTitle: '修改邮箱',
      nzContent: EditEmailComponent
    });
  }

  addRecommend() {
    this.createEditModal({
      nzTitle: '添加邀请人',
      nzContent: AddRecommendComponent
    });
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
            this.userSrv.updateUserInfo();
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

  defaultAvatar = '/assets/images/avatar.jpg';

  get getAvatar() {
    const avatar = this.memberInfo.avatar;
    return avatar ? avatar : this.defaultAvatar;
  }

  get uploadAction() {
    return `${environment.api.baseUrl}/user/oss/avatarUpload`;
  }

  fileList: NzUploadFile[] = [];

  uploadChange(info: NzUploadChangeParam): void {
    if (info.file.status === 'done') {
      this.message.success('上传成功');
      this.userSrv.updateUserInfo();
    } else if (info.file.status === 'error') {
      this.message.error('上传失败');
    }
  }

  delAvatar() {}

  showRemovePopup(): void {
    let popup = document.getElementById('remove-popup');
    popup?.classList.add('remove-popup-show');
  }

  dropRemovePopup(): void {
    let e = document.getElementById('remove-popup');
    e?.classList.remove('remove-popup-show');
  }

  openShareModal(): Observable<boolean> | null {
    const ref = this.overlayService.open(
      SharedModalComponent,
      {
        link: `${this.domainName}/invite?recommenderId=${this.userId}`
      },
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  public openInviteModal(): CustomOverlayRef<boolean> | null {
    return this.overlayService.open(
      InviteFriendsComponent,
      {},
      {
        panelClass: ['modal']
      }
    );
  }
}
