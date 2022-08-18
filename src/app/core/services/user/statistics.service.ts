import { Injectable } from '@angular/core';
import { BaseApi, BaseUrl, GET, Query, POST, Payload, Body } from '@delon/theme';
import { Observable } from 'rxjs';

interface QueryParams {
  page: number;
  rows: number;
}

@Injectable()
@BaseUrl('/user')
export class StatisticsService extends BaseApi {
  /**
   * 获取用户统计数量
   * GET /user/statistics/getUserStatistics
   *
   */
  @GET('/statistics/getUserStatistics')
  getUserStatistics(@Payload data: QueryParams): Observable<any> {
    return null as any;
  }
  /**
   *
   * POST /user/coupon/salesMonthKLine
   *
   */
  @POST('/coupon/salesMonthKLine')
  getShareKLineStatistics(@Payload data: any): Observable<any> {
    return null as any;
  }
  /**
   *
   * GET /user/statistics/walletKLine
   *
   */
  @GET('/statistics/walletKLine')
  getWalletKLineStatistics(@Payload data: any): Observable<any> {
    return null as any;
  }
}
