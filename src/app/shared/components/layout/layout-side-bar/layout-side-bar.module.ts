import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LayoutSideBarComponent } from './layout-side-bar.component';
import { LayoutSideBarService } from './layout-side-bar.service';

@NgModule({
  declarations: [LayoutSideBarComponent],
  imports: [SharedModule],
  exports: [LayoutSideBarComponent],
  providers: [LayoutSideBarService]
})
export class LayoutSideBarModule {}
