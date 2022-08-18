import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateModule } from '@ngx-translate/core';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';

import { NftShopComponent } from './components/nft-shop/nft-shop.component';

@NgModule({
  declarations: [NftShopComponent],
  imports: [CommonModule, TyqoonIconsModule, TranslateModule]
})
export class NftShopModule {}
