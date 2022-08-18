import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Router } from '@angular/router';

import { BlanceRoutingModule } from './blance-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, BlanceRoutingModule, SharedModule],
  providers: []
})
export class BlanceModule {}
