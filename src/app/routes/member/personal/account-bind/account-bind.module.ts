import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BasicService } from '@core/services/user/basic.service';
import { SharedModule } from '@shared/shared.module';

import { AccountBindRoutingModule } from './account-bind-routing.module';
import { AccountBindComponent } from './account-bind.component';

@NgModule({
  declarations: [AccountBindComponent],
  imports: [CommonModule, AccountBindRoutingModule, SharedModule],
  providers: [BasicService]
})
export class AccoutBindModule {}
