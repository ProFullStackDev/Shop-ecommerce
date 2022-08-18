import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, AfterViewInit, Output } from '@angular/core';
import { UserMissionsPOM, UserMissionsService } from '@core/services/game/missions.service';

@Component({
  selector: 'app-challenge-card',
  templateUrl: './challenge-card.component.html',
  styleUrls: ['./challenge-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChallengeCardComponent implements OnInit, AfterViewInit {
  @Output() openModalTrim = new EventEmitter();
  public missionsList: UserMissionsPOM[] = [];
  public completed = 0;
  constructor(private readonly missonSev: UserMissionsService) {
    this.getMissonList();
  }

  ngOnInit(): void {}
  ngAfterViewInit() {}

  public getMissonList(): void {
    this.missonSev
      .queryAll()
      .subscribe(
        res => {
          if (!res) {
            return;
          }
          const arr: any = res;
          for (let item of arr) {
            item.progress = `${(item.currentProgress / item.totalProgress) * 100}%`;
            if (item.progress !== '100%') {
              item.completed = false;
            } else {
              item.completed = true;
            }
          }
          this.missionsList = arr;
          this.missionsList.forEach(item => {
            if (item.completed) {
              this.completed++;
            }
          });
          // console.log('查看任务配置1', this.completed);
        },
        error => {
          console.error(error);
        }
      )
      .add();
  }
  openMissions(): void {
    this.openModalTrim.emit();
  }
}
