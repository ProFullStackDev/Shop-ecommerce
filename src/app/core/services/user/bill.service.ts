import { Injectable } from '@angular/core';
import { FapiaoAttributes } from '@core/models/Fapiao';
import { OrdersPOM, OrderItemPOM } from '@core/services/user/order.service';
import { BaseApi, BaseUrl, GET, POST, Payload, Body } from '@delon/theme';
import { Observable } from 'rxjs';

export interface BillQueryParams {
  page: number;
  rows: number;
}
interface BgetUserFapiaoDetailsParams {
  id: string;
}
interface delUserVatFapiaoParams {
  id: string;
}
interface updateUserFapiaoParams {
  id: string;
  type: number;
  contentType: number;
  invoicingType?: number;
  title: string;
  billingAccountName: string;
  billingAccountPhone: string;
  billingAccountEmail: string;
  billingAccountAreaName: string;
  billingAccountAddress: string;
  //
  vatRegistrationNumber: string;
  registeredAddress?: string;
  registeredPhone?: string;
  bankAccount?: string;
  bankName?: string;
}
interface getFapiaoTitleParams {
  page: number;
  rows: number;
}
export interface delFapiaoTitleParams {
  id: string;
}
export interface getFapiaoTitleDetailsParams {
  id: string;
}
interface updateFapiaoTitleParams {
  id: string;
  title: string;
  type: number;
  vatRegistrationNumber: string;
  registeredPhone?: string;
  registeredAddress?: string;
  bankAccount?: string;
  bankName?: string;
}
interface saveFapiaoTitleParams {
  title: string;
  type: number;
  vatRegistrationNumber: string;
  registeredPhone?: string;
  registeredAddress?: string;
  bankAccount?: string;
  bankName?: string;
}

interface saveUserVatFapiaoParams {
  dTYPE: string;
  title: string;
  type: number;
  bankAccount: string;
  bankName: string;
  registeredAddress: string;
  registeredPhone: string;
  vatRegistrationNumber: string;
  address: string;
  name: string;
  phone: string;
  areaName: string;
}

export interface updateUserVatFapiaoParams extends saveUserVatFapiaoParams {
  id: string;
}

interface getUserVatFapiaoParams {
  page?: number;
  rows?: number;
}

export enum BillType {
  /**
   * 增值税普通发票
   */
  VAT_NORMAL_Bill,
  /**
   * 增值税专用发票
   */
  VAT_SPECIAL_Bill
}

export enum BillHeaderType {
  /**
   * 个人
   */
  PERSONAL_Bill,
  /**
   * 单位
   */
  COMPANY_Bill
}

export enum BillContentType {
  /**
   * 商品明细
   */
  PRODUCT_DETAIL,
  /**
   * 商品类别
   */
  PRODUCT_CATEGORY
}

export enum BillStatus {
  /**
   * 等待审核
   */
  PENDING,
  /**
   * 审核成功
   */
  SUCCEEDED,
  /**
   * 开票成功
   */
  COMPLETED,
  /**
   * 审核失败
   */
  FAILED
}

export enum BillInvoicingType {
  FIRST_INVOICING, // 首次开票
  RE_INVOICING // 重新开票
}
export interface BillPOM extends FapiaoAttributes {
  billingAccountAreaName: string;
  areaName: number;
  status: BillStatus;
  contentType: BillContentType;
  invoicingType: BillInvoicingType;
  orderSn: string;
  productId: string;
  price: string;
  quantity: string;
  thumbnail: string;
  productName: string;
  specifications: string;
  order: OrdersPOM;
  orderItems: OrderItemPOM[];
  areaDetails: AreaDetail[];
}

interface AreaDetail {
  value: string;
  label: string;
}

@Injectable()
@BaseUrl('/user/fapiao')
export class BillService extends BaseApi {
  /**
   * 发票列表
   * GET /user/fapiao/getUserFapiaoList
   *
   */
  @GET('/getUserFapiaoList')
  getUserFapiaoList(@Payload data: BillQueryParams): Observable<any> {
    return null as any;
  }
  /**
   * 最新发票列表
   * GET /user/fapiao/queryOrderInvoiceList
   *
   */
  @GET('/queryOrderInvoiceList')
  queryOrderInvoiceList(@Payload data: BillQueryParams): Observable<any> {
    return null as any;
  }
  /**
   * 发票详情
   * GET /user/fapiao/getUserFapiaoDetails
   *
   */
  @GET('/getUserFapiaoDetails')
  getUserFapiaoDetails(@Payload data: BgetUserFapiaoDetailsParams): Observable<BillPOM> {
    return null as any;
  }
  /**
   * 发票编辑
   * GET /user/fapiao/updateUserFapiao
   *
   */
  @POST('/updateUserFapiao')
  updateUserFapiao(@Payload data: updateUserFapiaoParams): Observable<any> {
    return null as any;
  }
  /**
   * 发票申请
   * GET /user/fapiao/saveUserFapiaoApply
   *
   */
  @POST('/saveUserFapiaoApply')
  saveUserFapiaoApply(@Payload data: updateUserFapiaoParams): Observable<any> {
    return null as any;
  }
  /**
   * 抬头列表
   * GET /user/fapiao/getFapiaoTitle
   *
   */
  @GET('/getFapiaoTitle')
  getFapiaoTitle(@Payload data: getFapiaoTitleParams): Observable<any> {
    return null as any;
  }
  /**
   * 抬头详情
   * GET /user/fapiao/getFapiaoTitleDetails
   *
   */
  @GET('/getFapiaoTitleDetails')
  getFapiaoTitleDetails(@Payload data: getFapiaoTitleDetailsParams): Observable<any> {
    return null as any;
  }
  /**
   * 删除抬头
   * GET /user/fapiao/delFapiaoTitle
   *
   */
  @POST('/delFapiaoTitle')
  delFapiaoTitle(@Body data: delFapiaoTitleParams): Observable<any> {
    return null as any;
  }
  /**
   * 编辑抬头
   * PSOT /user/fapiao/updateFapiaoTitle
   *
   */
  @POST('/updateFapiaoTitle')
  updateFapiaoTitle(@Body data: updateFapiaoTitleParams): Observable<any> {
    return null as any;
  }
  /**
   * 新增抬头
   *  POST /user/fapiao/saveFapiaoTitle
   *
   */
  @POST('/saveFapiaoTitle')
  saveFapiaoTitle(@Body data: saveFapiaoTitleParams): Observable<any> {
    return null as any;
  }
  /**
   *  增票资质-新增
   *  /user/fapiao/saveUserVatFapiao
   *
   */
  @POST('/saveUserVatFapiao')
  saveUserVatFapiao(@Body data: saveUserVatFapiaoParams): Observable<any> {
    return null as any;
  }
  /**
   * 增票资质详情
   * GET /user/fapiao/getUserVatFapiao
   *
   */
  @GET('/getUserVatFapiao')
  getUserVatFapiao(@Payload data: getUserVatFapiaoParams): Observable<any> {
    return null as any;
  }
  /**
   * 增票资质删除
   * GET /user/fapiao/delUserVatFapiao
   *
   */
  @POST('/delUserVatFapiao')
  delUserVatFapiao(@Payload data: delUserVatFapiaoParams): Observable<any> {
    return null as any;
  }

  /**
   * 增票资质修改
   * GET //user/fapiao/updateUserVatFapiao
   *
   */
  @POST('/updateUserVatFapiao')
  updateUserVatFapiao(@Payload data: updateUserVatFapiaoParams): Observable<any> {
    return null as any;
  }
}
