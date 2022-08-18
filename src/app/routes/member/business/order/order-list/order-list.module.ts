import { NgModule } from '@angular/core';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';

import { OrderListItemComponent } from './order-list-item/order-list-item.component';
import { OrderListRoutingModule } from './order-list-routing.module';
import { OrderListComponent } from './order-list.component';

@NgModule({
  declarations: [OrderListComponent, OrderListItemComponent],
  imports: [SharedModule, OrderListRoutingModule, CopyingModule, TyqoonIconsModule]
})
export class OrderListModule {}
