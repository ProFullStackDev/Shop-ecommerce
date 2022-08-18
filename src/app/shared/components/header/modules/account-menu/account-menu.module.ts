import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';

import { AccountMenuComponent } from './components/account-menu/account-menu.component';

@NgModule({
  declarations: [AccountMenuComponent],
  imports: [CommonModule, TranslateModule, RouterModule, TyqoonIconsModule]
})
export class AccountMenuModule {}
