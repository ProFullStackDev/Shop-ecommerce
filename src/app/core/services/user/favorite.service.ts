import { Injectable } from '@angular/core';
import { ProductAttributes } from '@core/models/Product';
import { PageQuery, PageResult } from '@core/services/services.type';
import { CartItemPOM } from '@core/services/user/cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { BaseApi, BaseUrl, GET, POST, Payload, Body } from '@delon/theme';
import { Observable } from 'rxjs';

export interface SaveParams {
  productId: number;
}

export interface DeleteParams {
  id: number;
}

export interface DeleteGoodsParams {
  ids: string[];
}

@Injectable({
  providedIn: 'root'
})
@BaseUrl('/user/favorite')
export class FavoriteService extends BaseApi {
  /**
   * 查询商品收藏列表
   * GET /user/favorite/getUserProductFavorite
   *
   */
  @GET('getUserProductFavorite')
  getUserProductFavorite(@Payload data: any): Observable<PageResult<ProductAttributes>> {
    return null as any;
  }
  /**
   * 收藏商品
   * GET /user/favorite/saveUserProductFavorite
   *
   */
  @POST('/saveUserProductFavorite')
  saveUserProductFavorite(@Body data: SaveParams): Observable<any> {
    return null as any;
  }

  /**
   * 删除商品收藏
   * POST /user/favorite/delUserProductFavorite
   *
   */
  @POST('/delUserProductFavorite')
  delUserProductFavorite(@Body data: DeleteParams): Observable<any> {
    return null as any;
  }

  /**
   * 删除商品收藏
   * POST /user/favorite/delUserProductFavorite
   *
   */
  @POST('/delUserProductFavorites')
  delUserProductFavorites(@Body data: DeleteGoodsParams): Observable<any> {
    return null as any;
  }
}
