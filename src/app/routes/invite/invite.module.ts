import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { InviteRoutingModule } from './invite-routing.module';
import { InviteComponent } from './invite.component';

@NgModule({
  declarations: [InviteComponent],
  imports: [SharedModule, InviteRoutingModule]
})
export class InviteModule {}
