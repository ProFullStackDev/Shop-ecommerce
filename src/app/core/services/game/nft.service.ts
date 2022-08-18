import { Injectable } from '@angular/core';
import { NftAttributes } from '@core/models/Nft';
import { UserNftAttributes } from '@core/models/UserNft';
import { BaseApi, BaseUrl, Body, GET, POST } from '@delon/theme';
import { BuildingType } from '@shared/models/nft-shop-modal.model';
import { Observable } from 'rxjs';

export interface NftPOM extends NftAttributes {
  unshow: boolean;
  numleft: number;
  numright: number;
  type: string;
}
export interface UserNftPOM extends UserNftAttributes {}

@Injectable({ providedIn: 'root' })
@BaseUrl('/wireframe/nft')
export class NftService extends BaseApi {
  /**
   * 查询nft配置
   * GET /wireframe/nft/queryConfig
   *
   */
  @GET('/queryConfig')
  queryConfig(): Observable<NftPOM[]> {
    return null as any;
  }

  /**
   * 查询用户nft列表
   * GET /wireframe/nft/queryUser
   *
   */
  @GET('/queryUser')
  queryUser(): Observable<UserNftPOM[]> {
    return null as any;
  }

  /**
   * 购买NFT
   * POST /wireframe/nft/buy
   *
   */
  @POST('/buy')
  buy(): Observable<string> {
    return null as any;
  }

  /**
   * 合并NFT
   * POST /wireframe/nft/merge
   *
   */
  @POST('/merge')
  merge(@Body data: { mergeNftLevel: BuildingType }): Observable<string> {
    return null as any;
  }
}
