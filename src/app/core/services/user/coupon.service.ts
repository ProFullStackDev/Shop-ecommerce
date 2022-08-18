import { Injectable } from '@angular/core';
import { CouponAttributes } from '@core/models/Coupon';
import { PageResult } from '@core/services/services.type';
import { BaseApi, BaseUrl, GET, POST, Payload, Body } from '@delon/theme';
import { Observable } from 'rxjs';

export interface CouponPOM extends CouponAttributes {
  available: boolean; // 是否可用 available
  unavailableReason: string; // 不可用原因 unavailable Reason
  couponCode: string; // 优惠券编码 couponCode
  prodectRestricted: boolean; // 是否限制品类 product Restricted
}

interface QueryParams {
  page: number;
  rows: number;
  storeId?: string;
}

interface QueryCouponParams extends QueryParams {
  type?: string; // 状态区分 :type:Used(已使用);notUsed(未使用);beOverdue(已过期)
}
export interface RedeemParams {
  id: string;
}

export interface bindingParmas {
  couponCode: string;
}

@Injectable()
@BaseUrl('/user/coupon')
export class UserCouponService extends BaseApi {
  /**
   * 查询我的优惠券(Query coupons)
   * GET /user/coupon/getCoupon
   *
   *@param {QueryCouponParams} data
   */
  @GET('/getCoupon')
  getCoupon(@Payload data: QueryCouponParams): Observable<PageResult<CouponPOM>> {
    return null as any;
  }
  /**
   * 绑定优惠券
   * POST /user/coupon/bindingCoupon
   *
   * @param {bindingParmas} data
   */
  @POST('/bindingCoupon')
  bindCoupon(@Body data: bindingParmas): Observable<any> {
    return null as any;
  }
  /**
   * 查询兑换的优惠券(Check whether you can claim your coupons)
   * GET /shop/coupon/queryWithReceive
   *
   */
  @GET('/getRedeemCouponsList')
  getRedeemCouponsList(@Payload data: QueryParams): Observable<any> {
    return null as any;
  }
  /**
   * 兑换优惠券
   * POST /shop/coupon/redeemCoupons
   *
   * @param {RedeemParams} data
   */
  @POST('/redeemCoupons')
  redeem(@Body data: RedeemParams): Observable<any> {
    return null as any;
  }

  /**
   * 领取优惠券(Receive coupons)
   * POST /user/coupon/receiveCoupon
   *
   * @param data
   */
  @POST('/receiveCoupon')
  receiveCoupon(@Body data: { id: number }): Observable<any> {
    return null as any;
  }
}
