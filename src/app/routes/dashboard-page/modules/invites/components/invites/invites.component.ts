import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { InviteFriendsComponent } from '@routes/dashboard/modules/invite-friends/components/invite-friends/invite-friends.component';

@Component({
  selector: 'app-invites',
  templateUrl: './invites.component.html',
  styleUrls: ['./invites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvitesComponent implements OnInit {
  @Output() openInviteModal = new EventEmitter();

  constructor(private readonly user: SystemUserService) {}

  ngOnInit(): void {}

  get userInfo() {
    return this.user.userInfo;
  }

  get level() {
    return this.user.levelConfig.needPeople;
  }

  get rewardPeople() {
    return this.user.rewardPeople;
  }

  get progress() {
    let barNumber = parseInt(String((this.userInfo.recommendPeople / this.level) * 100));
    return `${barNumber}%`;
  }

  openModalInvite(): void {
    this.openInviteModal.emit(InviteFriendsComponent);
  }
}
