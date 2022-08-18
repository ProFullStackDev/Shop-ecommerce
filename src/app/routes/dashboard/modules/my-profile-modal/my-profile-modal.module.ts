import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateModule } from '@ngx-translate/core';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { SharedModule } from '@shared/shared.module';

import { MyProfileModalComponent } from './components/my-profile-modal/my-profile-modal.component';

@NgModule({
  declarations: [MyProfileModalComponent],
  imports: [CommonModule, TyqoonIconsModule, TranslateModule, SharedModule]
})
export class MyProfileModalModule {}
