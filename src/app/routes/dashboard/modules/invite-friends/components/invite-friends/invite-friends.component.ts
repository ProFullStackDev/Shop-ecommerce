import { Clipboard } from '@angular/cdk/clipboard';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { environment } from '@environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { QrCodeModalComponent } from '@routes/dashboard/modules/qr-code-modal/components/qr-code-modal/qr-code-modal.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { Socials } from '@shared/models/socials.model';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { SOCIALS, INVITE_TEXT_HARDCODE } from '@shared/statics/socials/socials.static';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-invite-friends',
  templateUrl: './invite-friends.component.html',
  styleUrls: ['./invite-friends.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteFriendsComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  readonly socials: Socials[] = SOCIALS;
  readonly domainName = location.origin;
  readonly userId = this.userInfo.id;
  // readonly accountName = 'joebob123';
  readonly shareLinkText = `${this.domainName}/invite?recommenderId=${this.userId}`;
  readonly shareLink = `${this.translate.instant('game-invite-friends-copy-text')}\n ${this.domainName}/invite?recommenderId=${
    this.userId
  }`;

  inviteText = '';
  inviteTextFBTW = '';
  isScrollable = false;
  successTitle = 'Share';

  private readonly inviteTextKey = 'other-meta-title';
  private readonly inviteTextKeyFBTW = 'share-meta-content';

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: ModalDto,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private translate: TranslateService,
    private clipboard: Clipboard,
    private readonly user: SystemUserService
  ) {
    super();
  }

  ngOnInit() {
    this.translate
      .get(this.inviteTextKey)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(t => {
        this.inviteText = t;

        if (t === this.inviteTextKey || !t) {
          this.inviteText = INVITE_TEXT_HARDCODE;
        }
      });

    this.translate
      .get(this.inviteTextKeyFBTW)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(t => {
        this.inviteTextFBTW = t;

        if (t === this.inviteTextKeyFBTW || !t) {
          this.inviteTextFBTW = INVITE_TEXT_HARDCODE;
        }
      });
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get levelConfig() {
    return this.user.levelConfig;
  }

  get getProgress() {
    return this.user.inviteProgress;
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  copied(text: string): void {
    const temp = this.successTitle;
    this.successTitle = text;
    this.clipboard.copy(this.shareLink);
    // console.log(temp, '查看缺陷', this.successTitle);
    setTimeout(() => (this.successTitle = temp), 2000);
  }

  openQrCodeModal(): CustomOverlayRef<boolean> | null {
    this.closeModal();
    return this.overlayService.open(
      QrCodeModalComponent,
      {},
      {
        panelClass: ['modal']
      }
    );
  }

  closeModal(): void {
    this.close();
  }

  share(type: string, e: Event): boolean {
    e.preventDefault();

    const shareUrl = this.shareUrlByType(type);

    let modalWindow = window.open(shareUrl, 'share-popup', 'height=350,width=600');
    if (modalWindow?.focus) {
      modalWindow.focus();
    }
    return false;
  }

  private shareUrlByType(type: string): string {
    const message = encodeURIComponent(this.inviteText);
    const messageFBTW = encodeURIComponent(this.inviteTextFBTW);
    const messageFBTWLink = encodeURIComponent(`${this.domainName}/assets/images/social-media-share-image-v2.jpg`);
    const messageAndLink = encodeURIComponent(`${this.inviteText} ${this.shareLink}`);
    switch (type) {
      case 'fb':
        return `https://www.facebook.com/sharer/sharer.php?u=${this.shareLink}&quote=${messageFBTW}&og:image=${messageFBTWLink}`;
      case 'telegram':
        return `https://t.me/share/url?url=${this.shareLink}&text=${message}`;
      case 'twitter':
        return `https://twitter.com/share?text=${messageFBTW}&url=${this.shareLink}`;
      // case 'instagram': todo insta
      //   return `https://www.instagram.com/${this.domainName}`;
      case 'wechat':
        return `https://www.shareaholic.com/share/wechat/?link=${this.shareLink}&notes=${message}`;
      case 'whatsapp':
        return `https://wa.me/?text=${messageAndLink}`;
      case 'sms':
        return `sms:?&body=${messageAndLink}`;
      case 'mail':
        return `mailto:?body=${messageAndLink}&subject=${this.inviteText}`;
      default:
        return '';
    }
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
