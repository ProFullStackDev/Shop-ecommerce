import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [SharedModule, ListRoutingModule]
})
export class ListModule {}
