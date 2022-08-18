import { Injectable } from '@angular/core';
import { BrandAttributes } from '@core/models/Brand';
import { BaseApi, BaseUrl, GET, Query } from '@delon/theme';
import { Observable } from 'rxjs';

export interface BrandPOM extends BrandAttributes {}

@Injectable()
@BaseUrl('/shop/brand')
export class ShopBrandService extends BaseApi {
  /**
   * 查询品牌(Query brand)
   * GET /shop/brand/query
   */
  @GET('query')
  query(@Query('categoryId') categoryId: string): Observable<BrandPOM[]> {
    return null as any;
  }
}
