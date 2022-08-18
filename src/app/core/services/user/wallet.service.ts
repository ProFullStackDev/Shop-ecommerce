import { Injectable } from '@angular/core';
import { CouponAttributes } from '@core/models/Coupon';
import { PageResult } from '@core/services/services.type';
import { BaseApi, BaseUrl, GET, Query, POST, Payload, Body } from '@delon/theme';
import { Observable } from 'rxjs';

interface DepositQueryParams {
  page: number;
  rows: number;
  type?: string;
  beginTime?: string;
  endTime?: string;
}

interface PointQueryParams {
  page: number;
  rows: number;
  beginTime?: string;
  endTime?: string;
  type?: string;
}

@Injectable({ providedIn: 'root' })
@BaseUrl('/user')
export class WalletService extends BaseApi {
  /**
   * 余额明细
   * GET /user/deposit/query
   *
   */
  @GET('/deposit/query')
  deposit(@Payload data: DepositQueryParams): Observable<any> {
    return null as any;
  }
  /**
   * 积分明细
   * GET /user/point/query
   *
   */
  @GET('/point/query')
  point(@Payload data: PointQueryParams): Observable<any> {
    return null as any;
  }

  /**
   * 积分明细
   * GET /user/point/queryTyqoonDollarExchangeBalanceConfig
   *
   */
  @GET('/point/queryTyqoonDollarExchangeBalanceConfig')
  queryTyqoonDollarExchangeBalanceConfig(): Observable<any> {
    return null as any;
  }

  /**
   * 积分明细
   * POST /user/point/queryTyqoonDollarExchangeBalanceConfig
   *
   */
  @POST('/point/tyqoonDollarExchangeBalance')
  tyqoonDollarExchangeBalance(@Payload data: any): Observable<any> {
    return null as any;
  }
}
