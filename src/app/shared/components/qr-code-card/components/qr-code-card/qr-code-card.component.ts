import { Clipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewChild,
  EventEmitter,
  OnInit,
  AfterViewInit,
  Output,
  ElementRef
} from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-qr-code-card',
  templateUrl: './qr-code-card.component.html',
  styleUrls: ['./qr-code-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrCodeCardComponent implements OnInit, AfterViewInit {
  @Output() openModalTrim = new EventEmitter();

  public readonly copingData = 'TYQOON.io/inv/HQ114';
  public qrCodeImage = '/assets/images/qr-code.png';

  public successTitle = 'shop-product-page-share-modal';

  readonly domainName = location.origin;
  readonly userId = this.userInfo.id;
  readonly shareLink = `${this.domainName}/invite?recommenderId=${this.userId}`;

  constructor(private readonly user: SystemUserService, private el: ElementRef, private clipboard: Clipboard) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.qrCodeImage = this.el.nativeElement.querySelector('.myQrcode').getElementsByTagName('img')[0].src;
  }

  copied(text: string): void {
    const temp = this.successTitle;
    this.successTitle = text;
    this.clipboard.copy(this.shareLink);
    // console.log(temp, '查看缺陷', this.successTitle);
    setTimeout(() => (this.successTitle = temp), 2000);
  }

  get userInfo() {
    return this.user.userInfo;
  }

  openInviteModal(): void {
    this.openModalTrim.emit();
  }
}
