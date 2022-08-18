import { ChangeDetectionStrategy, Component, HostListener, Inject, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { MessagesComponent } from '@routes/dashboard/modules/messages/components/messages/messages.component';
import { HeaderService } from '@shared/components/header/services/header.service';
import { WINDOW } from '@shared/helpers/window';
import { NavigationBar, NavigationBarLinkType } from '@shared/models/navigation-bar.model';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { NAVIGATION_BAR } from '@shared/statics/navigation-bar/navigation-bar.static';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent implements OnInit {
  readonly navigationBar: NavigationBar[] = NAVIGATION_BAR;
  isMobile = false;
  navigationBarLinkType = NavigationBarLinkType;

  constructor(
    public readonly headerService: HeaderService,
    private readonly overlayService: OverlayService,
    @Inject(WINDOW) protected readonly window: Window,
    private readonly user: SystemUserService
  ) {}

  @HostListener('window:resize', [])
  onResize() {
    this.checkWindowWidth();
  }

  ngOnInit(): void {
    this.checkWindowWidth();
  }

  openMessagesModal(link: string | null) {
    if (link) {
      return;
    }

    this.overlayService.open(
      MessagesComponent,
      {},
      {
        panelClass: ['modal']
      }
    );
  }

  openAccountMenu(): void {
    this.headerService.openAccountMenu();
  }

  private checkWindowWidth(): void {
    const accountLink = this.navigationBar.find(item => item.type === this.navigationBarLinkType.Account);
    if (!accountLink) {
      return;
    }

    accountLink.link = null;
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get isLogin(): boolean {
    return !!this.userInfo && Object.keys(this.userInfo).length > 0;
  }

  defaultAvatar = '/assets/images/avatar.jpg';

  get getAvatar() {
    const avatar = this.headerService.userInfo.avatar;
    return avatar ? avatar : this.defaultAvatar;
  }
}
