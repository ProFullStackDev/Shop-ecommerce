import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NavBarModule } from '@shared/components/header/modules/nav-bar/nav-bar.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';

import { MobileMenuComponent } from './components/mobile-menu.component';

@NgModule({
  declarations: [MobileMenuComponent],
  imports: [CommonModule, TyqoonIconsModule, RouterModule, TranslateModule, NavBarModule, SharedModule]
})
export class MobileMenuModule {}
