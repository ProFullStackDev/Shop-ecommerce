import { Injectable } from '@angular/core';
import { AdAttributes } from '@core/models/Ad';
import { PaymentMethodAttributes } from '@core/models/PaymentMethod';
import { ShippingMethodAttributes } from '@core/models/ShippingMethod';
import { PageQuery, PageResult } from '@core/services/services.type';
import { BaseApi, BaseUrl, GET, Payload } from '@delon/theme';
import { Observable } from 'rxjs';

export interface AdPOM extends AdAttributes {}

export interface ShippingMethodPOM extends ShippingMethodAttributes {}
export interface PaymentMethodPOM extends PaymentMethodAttributes {}

export enum AdPositionEnum {
  LAYOUT_TOP_AD = '顶部广告',
  HOME_MAIN_SWIPER_AD = '首页-主轮播广告',
  HOME_ASIDE_SWIPER_AD = '首页-侧轮播广告',
  HOME_MIDDLE_AD = '首页-中部广告',
  HOME_BOTTOM_AD = '首页-底部广告',
  COUPON_AD = '领券广告'
}

export enum ConfigThemeEnum {
  ChannelSquare = 'ChannelSquare', // 频道广场
  RecommendedToYou = 'RecommendedToYou' // 为你推荐
}

export interface ConfigThemePOM {
  data: string;
  id: number;
  theme: ConfigThemeEnum;
}

export interface DeliveryParam {
  page: number;
  rows: number;
  name: string;
}

export interface DeliveryPOM {
  id: string;
  code: string;
  name: string;
}

@Injectable()
@BaseUrl('/common')
export class CommonService extends BaseApi {
  /**
   * 查询品牌(Query brand)
   * GET /shop/brand/query
   */
  @GET('/queryAd')
  queryAd(@Payload data: { title?: string; positionName?: AdPositionEnum }): Observable<AdPOM[]> {
    return null as any;
  }

  /**
   * 查询配送方式(Query distribution method)
   * GET /common/queryShippingMethod
   */
  @GET('/queryShippingMethod')
  queryShippingMethod(): Observable<ShippingMethodPOM[]> {
    return null as any;
  }

  /**
   * 查询支付方式(Query payment method)
   * GET /common/queryPaymentMethod
   */
  @GET('/queryPaymentMethod')
  queryPaymentMethod(): Observable<PaymentMethodPOM[]> {
    return null as any;
  }

  /**
   * 查询(Query payment method)
   * GET /common/queryConfigTheme
   */
  @GET('/queryConfigTheme')
  queryConfigTheme(): Observable<ConfigThemePOM[]> {
    return null as any;
  }

  /**
   * 查询(inquireLogisticsCompany)
   * GET /common/queryDelivery
   */
  @GET('/queryDelivery')
  queryDelivery(@Payload data: DeliveryParam): Observable<PageResult<DeliveryPOM>> {
    return null as any;
  }
}
