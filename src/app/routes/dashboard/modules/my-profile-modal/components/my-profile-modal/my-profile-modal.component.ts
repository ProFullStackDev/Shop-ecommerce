import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { GetPrimeModalComponent } from '@routes/dashboard/modules/get-prime-modal/components/get-prime-modal.component';
import { InviteFriendsComponent } from '@routes/dashboard/modules/invite-friends/components/invite-friends/invite-friends.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, EMPTY } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-profile-modal',
  templateUrl: './my-profile-modal.component.html',
  styleUrls: ['./my-profile-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyProfileModalComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  public isScrollable = false;
  public prime = false;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: ModalDto,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly user: SystemUserService,
    private readonly overlayService: OverlayService,
    private readonly cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    // if (Object.keys(this.modalData).length) {
    //   this.prime = true;
    // }
    this.user.updateUserInfo();
    this.prime = this.showPrime;
    // console.log('showPrime', this.getProgress);
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get levelConfig() {
    return this.user.levelConfig;
  }

  get showPrime() {
    return this.user.showPrime;
  }

  get getProgress() {
    return this.user.inviteProgress;
  }

  public onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  openPrimeModal(): Observable<boolean> | null {
    this.closeModal();
    const ref = this.overlayService.open(
      GetPrimeModalComponent,
      {},
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  public closeModal(): void {
    this.close();
  }

  public openInviteModal(): CustomOverlayRef<boolean> | null {
    this.closeModal();
    return this.overlayService.open(
      InviteFriendsComponent,
      {},
      {
        panelClass: ['modal']
      }
    );
  }

  private close(data: ModalDto | null = null): void {
    console.log('我是11111111111111', data);
    this.overlayRef.close(data);
  }
}
