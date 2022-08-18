import { Injectable } from '@angular/core';
import { BaseApi, BaseUrl, GET } from '@delon/theme';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@BaseUrl('')
export class SystemCommissionService extends BaseApi {
  /**
   * 查询等级配置 Copy
   * GET /user/commission/getNextPrizeTimestamp
   *
   */
  @GET('/user/commission/getNextPrizeTimestamp')
  getNextPrizeTimestamp(): Observable<any> {
    return null as any;
  }

  /**
   * 查询等级配置 Copy
   * GET /commission/totalDividend
   *
   */
  @GET('/commission/totalDividend')
  totalDividend(): Observable<any> {
    return null as any;
  }

  /**
   * 查询等级配置 Copy
   * GET /commission/myTotalDividend
   *
   */
  @GET('/commission/myTotalDividend')
  myTotalDividend(): Observable<any> {
    return null as any;
  }
}
