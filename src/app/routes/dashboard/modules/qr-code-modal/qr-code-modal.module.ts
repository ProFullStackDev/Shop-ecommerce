import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DownloadModule } from '@shared/directive/download/download.module';
import { QRCodeModule } from 'angular2-qrcode';

import { QrCodeModalComponent } from './components/qr-code-modal/qr-code-modal.component';

@NgModule({
  declarations: [QrCodeModalComponent],
  imports: [QRCodeModule, CommonModule, DownloadModule]
})
export class QrCodeModalModule {}
