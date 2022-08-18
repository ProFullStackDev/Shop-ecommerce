import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { TyqoonIconRegistryService } from '@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import { logoFooterIcon } from '@shared/modules/tyqoon-icons/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';

import { LayoutFooterComponent } from './layout-footer.component';

@NgModule({
  declarations: [LayoutFooterComponent],
  imports: [CommonModule, SharedModule, TranslateModule, TyqoonIconsModule],
  exports: [LayoutFooterComponent]
})
export class LayoutFooterModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([logoFooterIcon]);
  }
}
