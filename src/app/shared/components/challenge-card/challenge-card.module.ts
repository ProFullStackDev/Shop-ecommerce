import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { ChallengeCardComponent } from './components/challenge-card/challenge-card.component';

@NgModule({
  declarations: [ChallengeCardComponent],
  exports: [ChallengeCardComponent],
  imports: [CommonModule, TranslateModule]
})
export class ChallengeCardModule {}
