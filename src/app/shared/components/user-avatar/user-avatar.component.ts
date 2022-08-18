import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';

@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.less']
})
export class UserAvatarComponent implements OnInit {
  @Input('avatarWidth') avatarWidth: number = 50;
  @Input('crownWidth') crownWidth: number = 15;

  constructor(private user: SystemUserService) {}

  ngOnInit(): void {}

  crown = '/assets/images/crown.svg';

  get userInfo() {
    return this.user.userInfo;
  }

  get avatar() {
    return this.user.isLogin() ? this.userInfo.avatar : this.user.defaultAvatar;
  }

  get showCrown() {
    return this.user.isLogin() ? this.userInfo.vipLevel > 0 : false;
  }
}
