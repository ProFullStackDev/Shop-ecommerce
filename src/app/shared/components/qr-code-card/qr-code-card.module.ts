import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { DownloadModule } from '@shared/directive/download/download.module';
import { QRCodeModule } from 'angular2-qrcode';

import { TyqoonIconsModule } from '../../modules/tyqoon-icons';
import { TyqoonIconRegistryService } from '../../modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import { qrCodeIcon } from '../../modules/tyqoon-icons/tyqoon-icons';
import { QrCodeCardComponent } from './components/qr-code-card/qr-code-card.component';

@NgModule({
  declarations: [QrCodeCardComponent],
  exports: [QrCodeCardComponent],
  imports: [QRCodeModule, CommonModule, DownloadModule, CopyingModule, TyqoonIconsModule, TranslateModule]
})
export class QrCodeCardModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([qrCodeIcon]);
  }
}
