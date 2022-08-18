import { Injectable } from '@angular/core';
import { BaseApi, BaseUrl, GET, POST, Payload, Query } from '@delon/theme';
import { Observable } from 'rxjs';

export interface PaymentPlatform {
  platformCode: string;
  icon: string;
  name: string;
  platformGroup: string;
  minAmount: number;
  maxAmount: number;
}

export enum PaymentPlatformEnum {
  STRIPE = 'STRIPE',
  TRIPLE = 'TRIPLE'
}

export enum PaymentMethodsEnum {
  BALANCE = 1,
  CRYPTO,
  CARD
}

export interface PayParams {
  platformCode: string;
  businessType: PayBusinessType;
  businessId: string | number;
  amount?: number;
  currency?: string;
  description?: string;
  // cancelPath?: string;
  // successPath?: string;
}

export interface PayParamsV2 {
  platformCode: string;
  businessType: PayBusinessType;
  businessId: string | number;
  paymentType: PaymentType;
}

export enum PaymentType {
  client = 'client',
  url = 'url'
}

export enum PayStatus {
  /**
   * 等待中
   */
  PENDING,
  /**
   * 完成
   */
  FINISH,
  /**
   * 取消
   */
  CANCEL,
  /**
   * 过期
   */
  TIMEOUT
}

export interface PayResult {
  id: string; //支付id
  platformCode: string; //支付平台
  platformName: string; //支付平台名称
  amount: string; //支付金额
  currency: string; //支付货币
  status: PayStatus; // 0:等待中;1:完成;2:取消;3:过期
  businessType: PayBusinessType; //业务类型 1:订单支付;2:余额充值
  businessId: number; //业务id
  paymentUrl: string; //支付页面url
  expiredTime: number; //超时时间 时间戳（秒）
  createDate: string; // 订单创建时间
  updateDate: string; // 订单创建时间
  clientJson: string; // 客户端参数
}

export enum PayBusinessType {
  /**
   * 订单支付
   */
  ORDER = 1,
  /**
   * 余额支付
   */
  BALANCE,
  /**
   * 购买充值卡
   */
  GIFTCODE
}

@Injectable()
@BaseUrl('/payment')
export class PaymentService extends BaseApi {
  /**
   * 查询支付平台
   * GET /payment/queryPlatformList
   *
   */
  @GET('/queryPlatformList')
  queryPlatformList(): Observable<PaymentPlatform[]> {
    return null as any;
  }
  /**
   * 查询支付订单详情
   * GET /payment/queryPaymentOrder
   *
   */
  @GET('/queryPaymentOrder')
  queryPaymentOrder(@Query('id') id: string): Observable<PayResult> {
    return null as any;
  }
  /**
   * 支付
   * POST /payment/pay
   *
   */
  @POST('/pay')
  pay(@Payload data: PayParams): Observable<PayResult> {
    return null as any;
  }

  /**
   * 支付
   * POST /payment/payV2
   *
   */
  @POST('/payV2')
  payV2(@Payload data: PayParamsV2): Observable<PayResult> {
    return null as any;
  }

  /**
   * 取消支付
   * POST /payment/cancel
   *
   */
  @POST('/cancel')
  cancel(@Payload data: { id: string }): Observable<any> {
    return null as any;
  }

  /**
   * 根据业务查询支付订单
   * GET /payment/QueryByBusiness
   *
   */
  @GET('/QueryByBusiness')
  QueryByBusiness(@Payload data: Pick<PayParams, 'businessId' | 'businessType'>): Observable<PayResult> {
    return null as any;
  }
}
