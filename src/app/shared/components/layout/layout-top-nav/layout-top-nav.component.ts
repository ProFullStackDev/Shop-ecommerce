import { Component } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';

@Component({
  selector: 'app-layout-top-nav',
  templateUrl: './layout-top-nav.component.html',
  styleUrls: ['./layout-top-nav.component.less']
})
export class LayoutTopNavComponent {
  constructor(private userService: SystemUserService) {}

  get userInfo() {
    return this.userService.userInfo;
  }

  mobileLink = [
    {
      name: '微信公众号',
      qrcode: 'src/assets/images/qrcode-wechat.jpg'
    },
    {
      name: '微信小程序',
      qrcode: 'src/assets/images/qrcode-applet.jpg'
    },
    {
      name: '下载APP',
      qrcode: 'src/assets/images/qrcode-app.jpg'
    }
  ];

  get isLogin(): boolean {
    return !!this.userInfo && Object.keys(this.userInfo).length > 0;
  }

  logOut(): void {
    this.userService.logout();
  }
}
