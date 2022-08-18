import { Injectable } from '@angular/core';
import { AftersalesAttributes } from '@core/models/Aftersales';
import { AftersalesItemAttributes } from '@core/models/AftersalesItem';
import { BaseApi, BaseUrl, GET, Query, POST, Payload, Body } from '@delon/theme';
import { Observable } from 'rxjs';

export enum AftersalesStatus {
  /**
   * 等待审核
   */
  PENDING,
  /**
   * 审核通过
   */
  APPROVED,
  /**
   * 审核失败
   */
  FAILED,
  /**
   * 已完成
   */
  COMPLETED,
  /**
   *已取消
   */
  CANCELED
}

export enum AftersalesType {
  /**
   * 换货
   */
  REPLACE = 'AftersalesReplacement',
  /**
   * 退货
   */
  RETURNS = 'AftersalesReturns',
  /**
   * 退款
   */
  REFUND = 'AftersalesRefund'
}

export enum AftersalesMethod {
  /**
   * 原路退回
   */
  ORIGIN,

  /**
   * 在线支付
   */
  ONLINE,

  /**
   * 线下支付
   */
  OFFLINE,

  /**
   * 预存款支付
   */
  DEPOSIT
}

export interface AfterSalesQueryParams {
  page: number;
  rows: number;
  afterSalesType?: string;
  beginTime?: string;
  endTime?: string;
  orderSn?: string;
}

export interface AfterSalesDetailsParams {
  afterSalesID: string;
}

export interface AfterSalesGuaranteeParams {
  orderId: string;
  storeId: string;
}

export interface AfterSalesGuaranteePOM {
  repairTips: string;
  replacementTips: string;
  returnsTips: string;
  refundTips: string;
  repairDay: number;
  replacementDay: number;
  returnsDay: number;
  afterSalesRepair: boolean;
  afterSalesReturns: boolean;
  afterSalesReplacement: boolean;
}

export interface AfterSalesDetailsPOM {
  afterSales: AfterSalesDetails;
  afterSalesDetailsItem: AfterSalesDetailsItem[];
}

export interface AfterSalesDetailsItem extends AftersalesItemAttributes {
  afterSalesItem: AftersalesItem;
  orderId: string;
  orderName: string;
  orderThumbnail: string;
  status: number;
  type: string;
}

/**
 * aftersales_item
 */
export interface AftersalesItem {
  /**
   * 售后ID，aftersales id
   */
  aftersalesId: string;
  /**
   * 创建日期，created date
   */
  createdDate: string;
  /**
   * ID，ID
   */
  id: string;
  /**
   * 售后商品图片，images
   */
  images: string;
  /**
   * 最后修改日期，last modified date
   */
  lastModifiedDate: string;
  /**
   * 订单项ID，orderItem id
   */
  orderItemId: string;
  /**
   * 数量，quantity
   */
  quantity: number;
  /**
   * 版本，version
   */
  version: number;
}

export interface AfterSalesDetails extends AftersalesAttributes {
  supplierMobile: string;
  supplierAddr: string;
  supplierReceiver: string;
  images: string;
}

export interface AftersalesOrderModal {
  /**
   * 退款账户，account
   */
  account: string;
  /**
   * 地址，address
   */
  address: string;
  afterSalesItem: AfterSalesItem[];
  /**
   * 售后类型，afterSalesType
   */
  afterSalesType: string;
  /**
   * 区域ID，area id
   */
  areaId: string;
  /**
   * 退款银行，bank
   */
  bank: string;
  /**
   * 收货人，consignee
   */
  consignee: string;
  /**
   * 退款方式，method
   */
  method: number;
  /**
   * 订单编码，orderSn
   */
  orderSn: string;
  /**
   * 电话，phone
   */
  phone: string;
  /**
   * 原因，reason
   */
  reason: string;
  /**
   * 退货金额，refundAmount
   */
  refundAmount: number;
  /**
   * 店铺ID，storeId
   */
  storeId: string;
}

export interface AfterSalesItem {
  /**
   * 订单项ID，order item id
   */
  orderItemId: string;
  /**
   * 退货数量，quantity
   */
  quantity: number;
  /**
   * 图片，images
   */
  images: any[];
}

export interface TrackingNoModal {
  /**
   * 售后订单ID，afterSalesId
   */
  afterSalesId: string;
  /**
   * 快递ID，deliveryId
   */
  deliveryId: string;
  /**
   * 物流单号，trackingNo
   */
  trackingNo: string;
  /**
   * 物流凭证，images
   */
  images: string[];
}

interface delParam {
  afterSalesID: string;
}

@Injectable({
  providedIn: 'root'
})
@BaseUrl('/user/afterSales')
export class AftersalesService extends BaseApi {
  /**
   * 售后列表
   * GET /user/afterSales/getAfterSalesList
   *
   */
  @GET('/getAfterSalesList')
  getAfterSalesList(@Payload data: AfterSalesQueryParams): Observable<any> {
    return null as any;
  }

  /**
   * 售后详情
   * GET /user/afterSales/getAfterSalesDetails
   *
   */
  @GET('/getAfterSalesDetails')
  getAfterSalesDetails(@Payload data: AfterSalesDetailsParams): Observable<any> {
    return null as any;
  }

  /**
   * 取得订单的售后保修期
   * GET /user/afterSales/getAfterSalesGuarantee
   *
   */
  @GET('/getAfterSalesGuaranteeV2')
  getAfterSalesGuarantee(@Payload data: AfterSalesGuaranteeParams): Observable<any> {
    return null as any;
  }

  /**
   * 申请订单售后服务
   * GET /user/afterSales/saveAfterSales
   *
   */
  @POST('/saveAfterSales')
  saveAfterSales(@Payload data: AftersalesOrderModal): Observable<any> {
    return null as any;
  }

  /**
   * 增加售后物流单号
   * GET /user/afterSales/saveAfterSalesTrackingNo
   *
   */
  @POST('/saveAfterSalesTrackingNo')
  saveAfterSalesTrackingNo(@Payload data: TrackingNoModal): Observable<any> {
    return null as any;
  }

  /**
   * 取消售后服务申请
   * GET /user/afterSales/delAfterSalesOrder
   *
   */
  @POST('/delAfterSalesOrder')
  delAfterSalesOrder(@Payload data: delParam): Observable<any> {
    return null as any;
  }
}
