import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ReviewListRoutingModule } from './review-list-routing.module';
import { ReviewListComponent } from './review-list.component';

@NgModule({
  declarations: [ReviewListComponent],
  imports: [CommonModule, ReviewListRoutingModule, SharedModule]
})
export class ReviewListModule {}
