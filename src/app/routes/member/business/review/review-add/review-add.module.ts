import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { ReviewAddRoutingModule } from './review-add-routing.module';
import { ReviewAddComponent } from './review-add.component';

@NgModule({
  declarations: [ReviewAddComponent],
  imports: [CommonModule, ReviewAddRoutingModule, SharedModule]
})
export class ReviewAddModule {}
