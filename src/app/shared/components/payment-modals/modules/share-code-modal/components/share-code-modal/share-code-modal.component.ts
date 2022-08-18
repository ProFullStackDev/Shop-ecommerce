import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { INVITE_TEXT_HARDCODE } from '@shared/statics/socials/socials.static';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-share-code-modal',
  templateUrl: './share-code-modal.component.html',
  styleUrls: ['./share-code-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShareCodeModalComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  readonly currentLink = location.href;

  inviteText = '';
  isScrollable = false;
  successTitle = 'shop-product-page-share-modal';
  giftId = '';

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
    this.giftId = this.modalData.giftId;
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

  closeModal(): void {
    this.close();
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }

  get currentLinkWithCode() {
    return `${this.currentLink}?code=${this.giftId}`
  }
}
