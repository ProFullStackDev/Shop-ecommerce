import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LayoutTopNavComponent } from './layout-top-nav.component';

@NgModule({
  declarations: [LayoutTopNavComponent],
  imports: [CommonModule, SharedModule],
  exports: [LayoutTopNavComponent]
})
export class LayoutTopNavModule {}
