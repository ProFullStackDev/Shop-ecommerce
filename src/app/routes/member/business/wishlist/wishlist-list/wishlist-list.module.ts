import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { WishlistListItemComponent } from './wishlist-list-item/wishlist-list-item.component';
import { WishlistListRoutingModule } from './wishlist-list-routing.module';
import { WishlistListComponent } from './wishlist-list.component';

@NgModule({
  declarations: [WishlistListComponent, WishlistListItemComponent],
  imports: [SharedModule, WishlistListRoutingModule]
})
export class WishlistListModule {}
