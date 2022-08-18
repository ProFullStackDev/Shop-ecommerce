import { Injectable } from '@angular/core';
import { BaseApi, BaseUrl, Body, GET } from '@delon/theme';
import { Observable } from 'rxjs';

export interface CashBackData {
  frozenPoint: string;
  myRebateCredits: string;
  myselfTotalSavings: string;
  platformTotalSavings: string;
  sumPoint: string;
  yesterdayPoint: string;
}

@Injectable({ providedIn: 'root' })
@BaseUrl('/wireframe/statistics')
export class rewardService extends BaseApi {
  /**
   * cashBack接口
   * get /wireframe/statistics/queryPointStatistics
   *
   */
  @GET('/queryPointStatistics')
  generate(): Observable<CashBackData> {
    return null as any;
  }
}
