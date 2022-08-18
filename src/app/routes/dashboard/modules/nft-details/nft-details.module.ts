import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';

import { NftDetailsComponent } from './components/nft-details/nft-details.component';

@NgModule({
  declarations: [NftDetailsComponent],
  imports: [CommonModule, TyqoonIconsModule, TranslateModule]
})
export class NftDetailsModule {}
