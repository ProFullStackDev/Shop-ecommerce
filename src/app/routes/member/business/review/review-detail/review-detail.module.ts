import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ReviewDetailRoutingModule } from './review-detail-routing.module';
import { ReviewDetailComponent } from './review-detail.component';

@NgModule({
  declarations: [ReviewDetailComponent],
  imports: [CommonModule, ReviewDetailRoutingModule, SharedModule]
})
export class ReviewDetailModule {}
