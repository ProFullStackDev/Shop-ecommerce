import { Injectable } from '@angular/core';
import { FapiaoAttributes } from '@core/models/Fapiao';
import { GiftCodeAttributes } from '@core/models/GiftCode';
import { OrderItemAttributes } from '@core/models/OrderItem';
import { OrderShipping } from '@core/models/OrderShipping';
import { OrdersAttributes } from '@core/models/Orders';
import { PageQuery, PageResult } from '@core/services/services.type';
import { ProductPOM, ProductType } from '@core/services/shop/product.service';
import { BillPOM } from '@core/services/user/bill.service';
import { CouponPOM } from '@core/services/user/coupon.service';
import { BaseApi, BaseUrl, GET, Query, POST, Payload, Body } from '@delon/theme';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AnyCnameRecord } from 'dns';

export enum OrderStatus {
  /**
   * 等待付款
   */
  PendingPayment,
  /**
   * 等待审核
   */
  PendingReview,
  /**
   * 等待发货
   */
  PendingShipment,
  /**
   * 已发货
   */
  Shipped,
  /**
   * 已收货
   */
  Received,
  /**
   * 已完成
   */
  Completed,
  /**
   * 已失败
   */
  Failed,
  /**
   * 已取消
   */
  Canceled,
  /**
   * 已拒绝
   */
  Denied,
  All = -1
}

export interface UserOrdersParams extends PageQuery {
  status?: number; // status 状态0 : 等待付款 1 : 等待审核 3 : 等待收货 5 : 已完成 7 : 已取消 不传则表示查询全部
  beginTime?: string; // 开始时间（beginTime）
  endTime?: string; // 截止时间（endTime）
  orderSn?: string; // 订单编码（orderSn）
}

export interface ProductToOrderParams {
  receiverId: string; // 收货地址ID
  payMethodId: string; // 支付方式ID
  shippingMethodId: string; // 配送方式ID
  fapiao: BillPOM | null; // 发票
  productOrder: Array<{ skuId: string; quantity: number }>; // 商品订单
  usePoint: boolean; // 是否使用抵扣积分
  useBalance: boolean; // 是否余额
  // couponCode: string | null; // 优惠券(优惠码)
  memo: string; // 备注
}

export interface OrderAmountParams {
  productOrder: Array<{ skuId: string; quantity: number }>; // 商品订单 productOrder
  couponCode?: string; // 优惠券编码 couponCode
  usePoint: boolean; // 使用积分 Use integral
  useBalance: boolean; // 使用余额 Use balance
  areaId: string; // 地区ID
  address: string; // 地区ID
}

export interface OrderCouponsParams {
  storeId: string;
  // storeName: string;
  // isSelfEmployed: boolean;
  productOrder: Array<{
    skuId: string;
    quantity: number;
    productId: string;
    productName: string;
    cover: string;
    skuSpec: string;
    skuExchangePoint: number;
    skuPrice: number;
    exchangePointTotal: number;
    priceTotal: number;
    skuStock: number;
    cashBack: number;
  }>;
}

export interface OrderAmountPOM {
  totalSumPrice: number;
  totalSumPoint: number;
  totalSumDiscount: number;
  totalSumQuantity: number;
  usersBalance: number;
  usersPoint: number;
  totalSumFreight: number;
}

export interface FapiaoPOM extends FapiaoAttributes {}

export interface OrdersPOM extends OrdersAttributes {
  orderItems: any[];
  shopName: string;
  shopType: number;
  isAllowAfterSale: boolean;
  fapiao: BillPOM;
}

export interface OrderItemPOM extends OrderItemAttributes {
  images: any[];
  productName: string;
  productId: string;
  type: ProductType;
  exchangeCode: string;
}

export interface OrderShippingPOM extends OrderShipping {}

export interface OrderItems {
  expressNum: string;
  applyCheck: boolean;
  applyQuantity: number;
  disabled: boolean;
  orderItem: OrderItemPOM;
  product: ProductPOM;
}

export interface OrderDetailsPOM {
  orders: OrdersPOM;
  item: OrderItems[];
  fapiao?: FapiaoPOM;
  orderShipping?: OrderShippingPOM;
}

export interface ProductToOrderResponse {
  orderIds: string[];
  userBalance: number;
}

export interface GiftCodePOM extends GiftCodeAttributes {}

export interface GiftCodesQueryParams {
  page: number;
  rows: number;
  endTime: string; // 截止时间（endTime）
}

@BaseUrl('/user/order')
export class UserOrderService extends BaseApi {
  giftCodesAll$ = new BehaviorSubject<any>([]);
  loading$ = new BehaviorSubject<any>({ query: false });
  total$ = new BehaviorSubject<any>(0);
  /**
   * 商品下单(product order)
   * POST /user/order/productToOrder
   *
   * @param {ProductToOrderParams} data
   */
  @POST('/productToOrder')
  productToOrder(@Payload data: ProductToOrderParams): Observable<ProductToOrderResponse> {
    return null as any;
  }

  /**
   * 获取用户订单列表(Get user order list)
   * GET /user/order/getUserOrders
   *
   * @param data
   */
  @GET('/getUserOrders')
  getUserOrders(@Payload data: UserOrdersParams): Observable<PageResult<OrdersPOM>> {
    return null as any;
  }

  /**
   * 获取订单明细信息(Get order details)
   * GET /user/order/getOrderDetails
   *
   * @param orderId
   */
  @GET('/getOrderDetails')
  getOrderDetails(@Query('orderId') orderId: string): Observable<OrderDetailsPOM> {
    return null as any;
  }

  /**
   *
   * GET /user/order/getExpress
   *
   * @param data
   */
  @GET('/getExpress')
  getExpress(@Payload data: { orderId: string; expressNum: string[] }): Observable<any> {
    return null as any;
  }

  /**
   * 获取订单优惠券(Get order coupons)
   * GET /user/order/getOrderCoupons
   *
   * @param data
   */
  @POST('/getOrderCoupons')
  getOrderCoupons(@Body data: { store: OrderCouponsParams[] }): Observable<CouponPOM[]> {
    return null as any;
  }

  /**
   * 取消订单(cancellation of order)
   * POST /user/order/cancellationOrder
   *
   * @param data
   */
  @POST('/cancellationOrder')
  cancellationOrder(@Payload data: { orderId: string }): Observable<any> {
    return null as any;
  }

  /**
   * (buy gift code)
   * POST /user/order/buyGiftCode
   *
   * @param data
   */
  @POST('/buyGiftCode')
  buyGiftCode(@Payload data: { panelValue: string; num: number; useBalance: boolean }): Observable<any> {
    return null as any;
  }

  getExchangeCode(endTime: any, page: any, rows: any) {
    this.loading$.next({ query: true });
    this.giftCodesAll$.next([]);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const params = {
      page: page - 1,
      rows,
      endTime: endTime ? moment(endTime).format('YYYY-MM-DD') : moment(tomorrow).format('YYYY-MM-DD')
    };
    this.queryExchangeCode(params).subscribe(res => {
      this.total$.next(res.total);
      if (res.rows.length) {
        this.giftCodesAll$.next(res.rows.map((item: any) => ({ ...item, successTitle: 'shop-product-page-share-modal' })));
      }
    });
  }

  /**
   * (Get gift codes)
   * GET /user/order/queryExchangeCode
   *
   * @param data
   */
  @GET('/queryExchangeCode')
  queryExchangeCode(@Payload data: GiftCodesQueryParams): Observable<any> {
    return null as any;
  }

  /**
   * 确认收货(Confirm receipt)
   * POST /user/order/confirmReceipt
   *
   * @param data
   */
  @POST('/confirmReceipt')
  confirmReceipt(@Payload data: { orderId: string }): Observable<any> {
    return null as any;
  }

  /**
   * 获取订单金额（GetOrderAmount）
   * POST /user/order/getOrderAmount
   *
   * @param data
   */
  @POST('/getOrderAmount')
  getOrderAmount(@Payload data: OrderAmountParams): Observable<OrderAmountPOM> {
    return null as any;
  }

  /**
   * balance payment/余额支付
   * POST /user/order/balancePayment
   *
   * @param data
   */
  @POST('/balancePayment')
  balancePayment(@Payload data: { orderId: string }): Observable<any> {
    return null as any;
  }

  /**
   * redeem code for cash
   * POST /user/order/exchangeCode
   *
   * @param data
   */
  @POST('/exchangeCode')
  exchangeCode(@Payload data: { code: string }): Observable<any> {
    return null as any;
  }

  /**
   * redeem code for cash
   * POST /user/order/exchangeCode
   *
   * @param data
   */
  @GET('/queryExchangeCodeAmount')
  queryExchangeCodeAmount(@Query('code') code: string): Observable<any> {
    return null as any;
  }
}
