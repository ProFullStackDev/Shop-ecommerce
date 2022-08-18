import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SystemCommissionService } from '@core/system/system-commission.service';
import { SystemUserService } from '@core/system/system-user.service';
import { HeaderService } from '@shared/components/header/services/header.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { PlanList } from '@shared/models/get-prime-modal.model';
import { PLAN_LIST } from '@shared/statics/get-prime-modal/get-prime-modal.static';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { catchError, map, takeUntil } from 'rxjs/operators';

import { RecommendedGoodsList } from '../../models/features.model';
import { RECOMMENDED_GOODS_LIST } from '../../statics/features.statics';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent extends DestroySubscription implements OnInit {
  public readonly goodsList: RecommendedGoodsList[] = RECOMMENDED_GOODS_LIST;
  public readonly planList: PlanList[] = PLAN_LIST;
  public myPlan: any;
  public myVIP: string;
  readonly bronze = '/assets/images/get-prime-modal/ticket-bronze.png';
  readonly silver = '/assets/images/get-prime-modal/ticket-silver.png';
  readonly gold = '/assets/images/get-prime-modal/ticket-gold.png';

  timestamp: any;
  totalDevidend$: Observable<any>;
  myTotalDividend$: Observable<any>;

  constructor(
    private readonly user: SystemUserService,
    public readonly headerService: HeaderService,
    private readonly systemCommissionService: SystemCommissionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.selectPlan();
    this.getNextPrizeTimestamp();
    this.totalDevidend$ = this.getTotalDividend();
    this.myTotalDividend$ = this.getMyTotalDividend();
  }

  public selectPlan() {
    const myLevel = this.user.userInfo.vipLevel;
    switch (myLevel) {
      case 0:
        break;
      case 1:
        this.myVIP = this.bronze;
        break;
      case 2:
        this.myVIP = this.silver;
        break;
      case 3:
        this.myVIP = this.gold;
        break;
    }
    console.log(this.planList[myLevel].description, 'myVIP', this.myVIP);
    this.myPlan = this.planList[myLevel].description;
  }

  getNextPrizeTimestamp(): void {
    this.systemCommissionService
      .getNextPrizeTimestamp()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(val => {
        this.timestamp = val * 1000;
      });
  }

  convertToDecimal(number: any) {
    if (number < 10) {
      number = 0 + number.toString();
    }
    return number;
  }

  get countdown() {
    const diffTime = moment(this.timestamp).unix() - moment().unix();
    const hours = this.convertToDecimal(moment.duration(diffTime, 'seconds').hours());
    const minutes = this.convertToDecimal(moment.duration(diffTime, 'seconds').minutes());
    const seconds = this.convertToDecimal(moment.duration(diffTime, 'seconds').seconds());
    return `${hours} : ${minutes} : ${seconds}`;
  }

  getTotalDividend(): Observable<any> {
    return this.systemCommissionService.totalDividend().pipe(
      map(data => data.prizeTotal),
      catchError(() => {
        return of('0');
      })
    );
  }

  getMyTotalDividend(): Observable<any> {
    return this.systemCommissionService.myTotalDividend().pipe(map(response => response.prizeTotal));
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get dataTime() {
    return new Date(this.userInfo.vipExprTime).getTime();
  }
}
