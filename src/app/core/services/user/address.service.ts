import { Injectable } from '@angular/core';
import { ReceiverAttributes } from '@core/models/Receiver';
import { PageQuery, PageResult } from '@core/services/services.type';
import { BaseApi, BaseUrl, GET, POST, Payload, Body } from '@delon/theme';
import { Observable } from 'rxjs';

interface getReceiverAddressDetailsParams {
  id: string;
}
interface AreaDataQueryParams {
  parentId?: string;
}

export interface DeleteParams {
  id: string;
}

export interface SaveParams {
  address: string;
  areaName: string;
  consignee: string;
  phone: string;
  zipCode: string;
  isDefault: boolean;
}
interface UpdateParams extends SaveParams {
  id: string;
}

// @ts-ignore
export interface ReceiverPOM extends ReceiverAttributes {
  id: string;
  AreaId: number;
  MemberId: number;
  areaId: string;
}

@Injectable()
@BaseUrl('/user/receiver')
export class AddressService extends BaseApi {
  /**
   * 查询收货地址
   * GET /user/receiver/getReceiverAddress
   *
   */
  @GET('/getReceiverAddress')
  getReceiverAddress(@Payload data: PageQuery): Observable<PageResult<ReceiverPOM>> {
    return null as any;
  }
  /**
   * 收货地址详情-单个
   * GET /user/receiver/getReceiverAddressDetails
   *
   */
  @GET('/getReceiverAddressDetails')
  getReceiverAddressDetails(@Payload data: getReceiverAddressDetailsParams): Observable<any> {
    return null as any;
  }
  /**
   * 删除收货地址
   * GET /user/receiver/delReceiverAddress
   *
   */
  @POST('/delReceiverAddress')
  delReceiverAddress(@Body data: DeleteParams): Observable<any> {
    return null as any;
  }
  /**
   * 获取地区
   * GET /user/receiver/getAreaData
   *
   */
  @GET('/getAreaData')
  getAreaData(@Payload data: AreaDataQueryParams): Observable<any> {
    return null as any;
  }
  /**
   * 新增收货地址
   * GET /user/receiver/saveReceiverAddress
   *
   */
  @POST('/saveReceiverAddress')
  saveReceiverAddress(@Body data: SaveParams): Observable<any> {
    return null as any;
  }
  /**
   * 编辑收货地址
   * GET /user/receiver/updateReceiverAddress
   *
   */
  @POST('/updateReceiverAddress')
  updateReceiverAddress(@Body data: UpdateParams): Observable<any> {
    return null as any;
  }
}
