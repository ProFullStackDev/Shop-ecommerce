import { Injectable } from '@angular/core';
import { ConsultationAttributes } from '@core/models/Consultation';
import { ProductAttributes } from '@core/models/Product';
import { ReviewAttributes } from '@core/models/Review';
import { SkuAttributes } from '@core/models/Sku';
import { SpecificationAttributes } from '@core/models/Specification';
import { PageQuery, PageResult } from '@core/services/services.type';
import { BaseApi, BaseUrl, GET, Payload, Query } from '@delon/theme';
import { Observable } from 'rxjs';

export interface ProductPOM extends ProductAttributes {
  cover: string;
  defaultSku: ProductSkuPOM;
  collect: boolean;
  exchangeCode: string;
  productType: ProductType;
}

export interface WishProductPOM extends ProductAttributes {
  cover: string;
  specifications: string;
}

export interface ProductSpecification {
  id: number;
  value: string;
}
export interface ProductSkuPOM extends SkuAttributes {
  cashBack: number;
  specifications: ProductSpecification[];
}

export interface SpecificationPOM extends SpecificationAttributes {
  entries: Array<{ id: number; value: string; isSelected: boolean }>;
}
export interface ReviewTotal {
  total: number;
  averageScore: string;
}

export interface PageReviewResult<T> {
  rows: T[];
  reviewTotal: ReviewTotal;
  total: number;
}

export interface ReviewPOM extends ReviewAttributes {
  memberName: string;
  memberRank: string;
  memberAvatar: string;
  storeName: string;
  specifications: string;
  images: string;
  replies: ReviewPOM[];
}

export interface ConsultationPOM extends ConsultationAttributes {
  memberName: '';
  storeName: string;
  replies: ConsultationPOM[];
}

export interface ProductImage {
  source: string;
  large: string;
  medium: string;
  thumbnail: string;
  order: number;
}

// ShopProductType 商品类型
export enum ProductType {
  /**
   * 普通商品
   */
  ShopProductTypeByGeneral,
  /**
   * 兑换商品
   */
  ShopProductTypeByExchange,
  /**
   * 赠品
   */
  ShopProductTypeByGiftP,
  /**
   * VIP
   */
  ShopProductTypeByVIP,
  /**
   * 优惠券(代金券)
   */
  ShopProductTypeByCoupon
}

export enum ProductImageType {
  SOURCE = 'source',
  LARGE = 'large',
  MEDIUM = 'medium',
  THUMBNAIL = 'thumbnail'
}

// ShopProductOrderBy 商品排序
export enum ProductOrderBy {
  /**
   * 综合
   */
  ShopProductOrderByDefault,
  /**
   * 销量
   */
  ShopProductOrderBySales,
  /**
   * 评分数
   */
  ShopProductOrderByNumberOfRatings,
  /**
   * 价格从低到高
   */
  ShopProductOrderByPriceFromLowToHigh,
  /**
   * 价格从高到低
   */
  ShopProductOrderByPriceFromHighToLow
}

export interface ProductQueryParams extends PageQuery {
  productId?: string[]; // 商品ID
  name?: string; // 商品名
  productTagName?: string; // 商品标签名
  productType?: number; // 产品类型
  categoryId?: string | number; // 商品分类ID
  categoryTreePath?: string; // 商品分类树路径
  storeId?: string; // 店铺ID
  storeProductCategoryId?: string; // 店铺分类ID
  promotionsType?: string; // 促销活动类型
  brandId?: string; // 品牌ID
  couponId?: string; // 优惠券ID
  isSelfEmployed?: string; // 是否自营
  orderBy?: ProductOrderBy; // 排序
  allowUsePoint?: string; // 允许使用积分
  minPrice?: number; // 最低价格
  maxPrice?: number; // 最高价格
  haStock?: boolean; // 是否有货
  isTop?: boolean; // 是否置顶
  isList?: boolean; // 是否列出
  isHot?: string; //人气好货
  isNew?: string; //新品首发
  isLeaderboard?: string; //排行榜
}
// ShopScoreType 评分类型
export enum ShopScoreType {
  /**
   * 所有类型
   */
  ShopScoreTypeByAll,
  /**
   * 好评
   */
  ShopScoreTypeByNice,
  /**
   * 中评
   */
  ShopScoreTypeByAverage,
  /**
   * 差评
   */
  ShopScoreTypeByBad
}

@Injectable()
@BaseUrl('/shop/product')
export class ShopProductService extends BaseApi {
  /**
   * 查询商品列表(Query product list)
   * GET /shop/product/query
   */
  @GET('query')
  query(@Payload data: ProductQueryParams): Observable<PageResult<ProductPOM>> {
    return null as any;
  }

  /**
   * 查询商品SKU(Query product SKU)
   * GET /shop/product/querySkuByProductId
   */
  @GET('querySkuByProductId')
  querySkuByProductId(@Query('productId') productId: string): Observable<ProductSkuPOM[]> {
    return null as any;
  }

  /**
   * 查询商品评论(Query product reviews)
   * GET /shop/product/queryReview
   */
  @GET('queryReview')
  queryReview(@Payload data: PageQuery & { productId: string; scoreType: ShopScoreType }): Observable<PageReviewResult<ReviewPOM>> {
    return null as any;
  }

  /**
   * 查询商品咨询(Inquiry commodity consultation)
   * GET /shop/product/queryConsultation
   */
  @GET('queryConsultation')
  queryConsultation(@Payload data: PageQuery & { productId: string }): Observable<PageResult<ConsultationPOM>> {
    return null as any;
  }

  /**
   * query sku
   * GET /shop/product/querySkuById
   *
   * @param skuId: skuId list, join by ',', eg:  '23,33,43'
   */
  @GET('querySkuById')
  querySkuById(@Query('skuId') skuId: string): Observable<ProductSkuPOM[]> {
    return null as any;
  }
}
