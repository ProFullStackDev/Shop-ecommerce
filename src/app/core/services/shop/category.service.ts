import { Injectable } from '@angular/core';
import { ProductCategoryAttributes } from '@core/models/ProductCategory';
import { BrandPOM } from '@core/services/shop/brand.service';
import { BaseApi, BaseUrl, GET } from '@delon/theme';
import { Observable } from 'rxjs';

export interface ProductCategoryPOM extends ProductCategoryAttributes {
  parentId?: number;
  child?: ProductCategoryPOM[];
  brandList?: BrandPOM[];
  children?: ProductCategoryPOM[];
}

@Injectable({ providedIn: 'root' })
@BaseUrl('/shop/category')
export class ShopCategoryService extends BaseApi {
  /**
   * 查询产品分类(Query product classification)
   * GET /shop/category/queryAll
   */
  @GET('queryAllCategory')
  queryAll(): Observable<ProductCategoryPOM[]> {
    return null as any;
  }
}
