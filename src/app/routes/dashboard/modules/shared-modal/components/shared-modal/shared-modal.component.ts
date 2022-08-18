import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { QrCodeModalComponent } from '@routes/dashboard/modules/qr-code-modal/components/qr-code-modal/qr-code-modal.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { Socials } from '@shared/models/socials.model';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { INVITE_TEXT_HARDCODE, SOCIALS } from '@shared/statics/socials/socials.static';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedModalComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  readonly socials: Socials[] = SOCIALS;
  readonly domainName = 'TYQOON.co';
  readonly accountName = 'joebob123';
  readonly shareLink = `https://${this.domainName}/${this.accountName}`;
  readonly currentLink = location.href;
  sharedLink: string | null;

  inviteText = '';
  isScrollable = false;
  successTitle = 'shop-product-page-share-modal';

  private readonly inviteTextKey = 'other-meta-title';

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: any,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private translate: TranslateService
  ) {
    super();
  }

  ngOnInit() {
    this.sharedLink = this.modalData.link ? this.modalData.link : null;
    this.translate
      .get(this.inviteTextKey)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(t => {
        this.inviteText = t;

        if (t === this.inviteTextKey || !t) {
          this.inviteText = INVITE_TEXT_HARDCODE;
        }
      });
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  copied(text: string): void {
    const temp = this.successTitle;
    this.successTitle = text;

    setTimeout(() => (this.successTitle = temp), 2000);
  }

  openQrCodeModal(): CustomOverlayRef<boolean> | null {
    this.closeModal();
    return this.overlayService.open(
      QrCodeModalComponent,
      { isSharedModal: true },
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
    const messageAndLink = encodeURIComponent(`${this.inviteText} ${this.shareLink}`);
    switch (type) {
      case 'fb':
        return `https://www.facebook.com/sharer/sharer.php?u=${this.shareLink}`;
      case 'telegram':
        return `https://t.me/share/url?url=${this.shareLink}&text=${message}`;
      case 'twitter':
        return `https://twitter.com/share?text=${message}&url=${this.shareLink}`;
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
