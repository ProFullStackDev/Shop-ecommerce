import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ReviewRoutingModule } from './review-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, ReviewRoutingModule, SharedModule]
})
export class ReviewModule {}
