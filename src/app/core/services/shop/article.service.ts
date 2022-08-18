import { Injectable } from '@angular/core';
import { ArticleAttributes } from '@core/models/Article';
import { ArticleCategoryAttributes } from '@core/models/ArticleCategory';
import { PageQuery, PageResult } from '@core/services/services.type';
import { BaseApi, BaseUrl, GET, Payload, Query } from '@delon/theme';
import { Observable } from 'rxjs';

export interface ArticleCategory extends ArticleCategoryAttributes {}
export interface ArticlePOM extends ArticleAttributes {}

interface ArticleListQuery extends PageQuery {
  rows: number;
  page: number;
  articleCategoryId?: string;
  searchContent?: string;
}

@Injectable({ providedIn: 'root' })
@BaseUrl('/shop/article')
export class ShopArticleService extends BaseApi {
  /**
   * get article classification
   * GET /shop/article/getCategory
   */
  @GET('getCategory')
  getCategory(@Payload data: PageQuery): Observable<PageResult<ArticleCategory>> {
    return null as any;
  }
  /**
   * get article list
   * GET /shop/article/getArticleList
   */
  @GET('getArticleList')
  getArticleList(@Payload data: ArticleListQuery): Observable<PageResult<ArticlePOM>> {
    return null as any;
  }
  /**
   * get article details
   * GET /shop/article/getParticulars
   */
  @GET('getParticulars')
  getParticulars(@Query('articleId') articleId: string): Observable<ArticlePOM> {
    return null as any;
  }
}
