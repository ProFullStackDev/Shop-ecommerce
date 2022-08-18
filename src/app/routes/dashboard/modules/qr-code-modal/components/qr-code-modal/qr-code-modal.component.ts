import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { environment } from '@environments/environment';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { InviteFriendsComponent } from '@routes/dashboard/modules/invite-friends/components/invite-friends/invite-friends.component';
import { SharedModalComponent } from '@routes/dashboard/modules/shared-modal/components/shared-modal/shared-modal.component';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image';
// declare var QRCode: any;

@Component({
  selector: 'app-qr-code-modal',
  templateUrl: './qr-code-modal.component.html',
  styleUrls: ['./qr-code-modal.component.css']
})
export class QrCodeModalComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  public isScrollable = false;
  public prime = false;
  readonly domainName = location.origin;
  readonly userId = this.userInfo.id;
  readonly shareLink = `${this.domainName}/invite?recommenderId=${this.userId}`;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: any,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly user: SystemUserService,
    private readonly overlayService: OverlayService
  ) {}

  ngOnInit(): void {}

  // ngAfterViewInit(): void {
  //   new QRCode(document.getElementById('userQrcode'), {
  //     width: 150,
  //     height: 150
  //   }).makeCode(this.shareLink);
  // }
  get userInfo() {
    return this.user.userInfo;
  }

  public onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public closeModal(): void {
    this.close();
  }

  public openInviteModal(): CustomOverlayRef<boolean> | null {
    this.closeModal();
    return this.overlayService.open(
      this.modalData.isSharedModal ? SharedModalComponent : InviteFriendsComponent,
      {},
      {
        panelClass: ['modal']
      }
    );
  }

  public downloadQr(): void {
    const node = document.getElementById('qr');

    if (node) {
      htmlToImage
        .toPng(node)
        .then(dataUrl => {
          const img = new Image();
          img.src = dataUrl;
          img.style.maxWidth = '100%';
          img.style.maxHeight = '100%';

          const arr = dataUrl.split(',');
          const bstr = atob(arr[1]);
          let n = bstr.length;
          const u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          saveAs(new File([u8arr], 'Dashboard.png', { type: 'png' }));
        })
        .catch(error => {
          console.error('oops, something went wrong!', error);
        });
    }
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
