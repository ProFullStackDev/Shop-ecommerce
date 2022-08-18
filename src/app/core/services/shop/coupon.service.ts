import { Injectable } from '@angular/core';
import { CouponAttributes } from '@core/models/Coupon';
import { PageResult } from '@core/services/services.type';
import { ProductCategoryPOM } from '@core/services/shop/category.service';
import { BaseApi, BaseUrl, GET, Payload } from '@delon/theme';
import { Observable } from 'rxjs';

export interface CouponPOM extends CouponAttributes {
  productCategories: ProductCategoryPOM[];
}

interface QueryParams {
  page: number;
  rows: number;
  storeId?: string;
}

interface QueryWithReceiveParams extends QueryParams {
  storeId: string;
  isReceive?: boolean; // 是否可领取 : true查询可领取优惠券,false查询已领取优惠券 / Availability: true: queries available coupons,false: queries received coupons
}

@Injectable()
@BaseUrl('/shop/coupon')
export class ShopCouponService extends BaseApi {
  /**
   * 查询优惠券(Query coupons)
   * GET /shop/coupon/query
   *
   * @param {QueryParams} data
   */
  @GET('/query')
  query(@Payload data: QueryParams): Observable<PageResult<CouponPOM>> {
    return null as any;
  }

  /**
   * 查询可否领取的优惠券(Check whether you can claim your coupons)
   * GET /shop/coupon/queryWithReceive
   *
   * @param {QueryWithReceiveParams} data
   */
  @GET('/queryWithReceive')
  queryWithReceive(@Payload data: QueryWithReceiveParams): Observable<PageResult<CouponPOM>> {
    return null as any;
  }
}
