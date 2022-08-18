import { NgModule } from '@angular/core';
import { BasicService } from '@core/services/user/basic.service';
import { SharedModule } from '@shared/shared.module';

import { WishlistRoutingModule } from './wishlist-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, WishlistRoutingModule],
  providers: [BasicService]
})
export class WishlistModule {}
