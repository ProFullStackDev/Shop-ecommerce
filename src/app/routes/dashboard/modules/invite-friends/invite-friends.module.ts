import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { TranslateModule } from '@ngx-translate/core';
import { CopyingModule } from '@shared/directive/copying/copying.module';
import { DownloadModule } from '@shared/directive/download/download.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';

import { InviteFriendsComponent } from './components/invite-friends/invite-friends.component';

@NgModule({
  declarations: [InviteFriendsComponent],
  imports: [CommonModule, TyqoonIconsModule, CopyingModule, DownloadModule, TranslateModule, ClipboardModule]
})
export class InviteFriendsModule {}
