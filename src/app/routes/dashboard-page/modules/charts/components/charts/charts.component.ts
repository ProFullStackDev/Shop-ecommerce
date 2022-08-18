import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { StatisticsService } from '@core/services/user/statistics.service';
import { InviteFriendsComponent } from '@routes/dashboard/modules/invite-friends/components/invite-friends/invite-friends.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartsComponent extends DestroySubscription implements OnInit {
  @Output() openInviteModal = new EventEmitter();

  userPoint: string;
  userPointToFixed: string;
  userPointPercentage: any;
  performance: string;
  total: any;

  constructor(private readonly statisticsService: StatisticsService, private readonly localStorageService: LocalStorageService) {
    super();
  }

  userPoints$: Observable<any>;
  userPerformance$: Observable<any>;

  ngOnInit(): void {
    this.getWalletKLine();
    this.getShareKLine();
    if (this.localStorageService.getItem('_user_info')) {
      const userInfo = this.localStorageService.getItem('_user_info') as any;
      this.userPoint = Number(userInfo.point).toFixed(2);
      this.userPointToFixed = Number(userInfo.point * 7).toFixed(2);
      this.performance = Number(userInfo.amount).toFixed(2);
    }
  }

  openModalInvite(): void {
    this.openInviteModal.emit(InviteFriendsComponent);
  }

  getWalletKLine(): void {
    const params = {
      lineSize: 30
    };
    this.userPoints$ = this.statisticsService.getWalletKLineStatistics(params).pipe(
      map((data: any) => {
        this.userPointPercentage = ((Number(data[data.length - 1].point) * 100) / Number(data[0].point)).toFixed(2);
        return data;
      }),
      catchError(() => {
        this.userPointPercentage = 0;
        return of([]);
      })
    );
  }

  getShareKLine(): void {
    this.userPerformance$ = this.statisticsService.getShareKLineStatistics({ type: 'All' }).pipe(
      map((data: any) => {
        this.total = data.total;
        return data;
      }),
      catchError(() => {
        return of(null);
      })
    );
  }

  setCurrentPerformance(val: any): void {
    if (!val) {
      if (this.localStorageService.getItem('_user_info')) {
        const userInfo = this.localStorageService.getItem('_user_info') as any;
        this.performance = userInfo.amount;
      }
      return;
    }
    this.performance = val;
  }
}
