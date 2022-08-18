import { NgModule } from '@angular/core';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { SharedModule } from '@shared/shared.module';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';

import { OrderDetailItemComponent } from './order-detail-item/order-detail-item.component';
import { OrderDetailRoutingModule } from './order-detail-routing.module';
import { OrderDetailComponent } from './order-detail.component';

@NgModule({
  declarations: [OrderDetailComponent, OrderDetailItemComponent],
  imports: [SharedModule, OrderDetailRoutingModule, CopyingModule, NzTimelineModule, NzImageModule]
})
export class OrderDetailModule {}
