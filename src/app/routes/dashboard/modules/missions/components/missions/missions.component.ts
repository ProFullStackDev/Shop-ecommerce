import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { UserMissionsPOM, UserMissionsService } from '@core/services/game/missions.service';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { MissionsListDto } from '@shared/models/missions-modal.model';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { MISSIONS_LIST } from '@shared/statics/missions-modal/missions.static';

@Component({
  selector: 'app-missions',
  templateUrl: './missions.component.html',
  styleUrls: ['./missions.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissionsComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  // public readonly missionsList: MissionsListDto[] = MISSIONS_LIST;
  public missionsList: UserMissionsPOM[] = [];

  public isScrollable = false;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: ModalDto,
    private readonly missonSev: UserMissionsService,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef
  ) {
    this.getMissonList();
  }

  ngOnInit(): void {}

  public getMissonList(): void {
    this.missonSev
      .queryAll()
      .subscribe(
        res => {
          const arr: any = res;
          for (let item of arr) {
            item.progress = `${(item.currentProgress / item.totalProgress) * 100}%`;
          }
          this.missionsList = arr;
          // console.log('查看任务配置', this.missionsList);
        },
        error => {
          console.error(error);
        }
      )
      .add();
  }

  public onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public closeModal(value: any): void {
    if (value.currentProgress != value.totalProgress) {
      return;
    } else {
      this.missonSev
        .complete({ missionsId: value.missionsId })
        .subscribe(
          res => {
            console.log('完成任务', res);
          },
          error => {
            console.error(error);
          }
        )
        .add();
    }
    this.close();
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
