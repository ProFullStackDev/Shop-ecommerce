import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LayoutSilderComponent } from './layout-silder.component';

@NgModule({
  declarations: [LayoutSilderComponent],
  imports: [CommonModule, SharedModule],
  exports: [LayoutSilderComponent]
})
export class LayoutFooterModule {}
