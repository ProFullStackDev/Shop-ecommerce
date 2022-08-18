import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BasicService } from '@core/services/user/basic.service';
import { SharedModule } from '@shared/shared.module';

import { PatchRoutingModule } from './patch-routing.module';
import { PatchComponent } from './patch.component';

@NgModule({
  declarations: [PatchComponent],
  imports: [CommonModule, PatchRoutingModule, SharedModule, ReactiveFormsModule],
  providers: [BasicService]
})
export class PatchModule {}
