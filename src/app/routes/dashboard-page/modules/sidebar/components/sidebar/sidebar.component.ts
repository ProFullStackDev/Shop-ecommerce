import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { InviteFriendsComponent } from '@routes/dashboard/modules/invite-friends/components/invite-friends/invite-friends.component';
import { MissionsComponent } from '@routes/dashboard/modules/missions/components/missions/missions.component';
import { ChallengeCardComponent } from '@shared/components/challenge-card/components/challenge-card/challenge-card.component';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  @Output() openModalTrim = new EventEmitter();

  missionsModal = MissionsComponent;
  challengeCardComponent = ChallengeCardComponent;
  inviteFriendsModal = InviteFriendsComponent;

  constructor(private readonly overlayService: OverlayService, @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef) {}

  ngOnInit(): void {}

  public openModal(component: any): void {
    this.openModalTrim.emit(component);
    // return this.overlayService.open(
    //   ChallengeCardComponent,
    //   {
    //     backdropClass: ['challenge-card-modal-overlay'],
    //     panelClass: ['modal', 'challenge-card-modal'],
    //   },
    // );
  }
}
