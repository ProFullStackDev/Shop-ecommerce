import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AftersalesService } from '@core/services/user/aftersales.service';
import { SharedModule } from '@shared/shared.module';

import { AftersalesListRoutingModule } from './aftersales-list-routing.module';
import { AftersalesListComponent } from './aftersales-list.component';

@NgModule({
  declarations: [AftersalesListComponent],
  imports: [CommonModule, AftersalesListRoutingModule, SharedModule],
  providers: [AftersalesService]
})
export class AftersalesListModule {}
