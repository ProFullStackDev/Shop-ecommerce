import { Injectable } from '@angular/core';
import { VipAttributes } from '@core/models/Vip';
import { BaseApi, BaseUrl, Body, GET, POST } from '@delon/theme';
import { Observable } from 'rxjs';

export interface GameVipPOM extends VipAttributes {
  description: string[];
  days: any;
}

@Injectable({ providedIn: 'root' })
@BaseUrl('/wireframe/vip')
export class GameVipService extends BaseApi {
  /**
   * 查询会员购买配置
   * GET /wireframe/vip/query
   *
   */
  @GET('/query')
  query(): Observable<GameVipPOM[]> {
    return null as any;
  }

  /**
   * 购买会员
   * POST /wireframe/vip/buyVip
   *
   */
  @POST('/buyVip')
  buyVip(@Body data: { vipConfigId: string }): Observable<any> {
    return null as any;
  }
}
