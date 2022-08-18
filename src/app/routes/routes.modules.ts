import { NgModule, Type } from '@angular/core';
import { ErrorComponent } from '@routes/error/error.component';
import { SharedModule } from '@shared/shared.module';
import { NzModalService } from 'ng-zorro-antd/modal';

import { RouteRoutingModule } from './routes-routing.module';

const COMPONENTS: Array<Type<null>> = [];

@NgModule({
  imports: [RouteRoutingModule, SharedModule],
  declarations: [...COMPONENTS, ErrorComponent],
  providers: [NzModalService]
})
export class RoutesModule {}
