import { Injectable } from '@angular/core';
import { ReviewAttributes } from '@core/models/Review';
import { PageQuery, PageResult } from '@core/services/services.type';
import { BaseApi, BaseUrl, GET, POST, Payload, Body } from '@delon/theme';
import { Observable } from 'rxjs';

export interface DeleteParams {
  reviewId: string;
}

export interface DeleteOrderItemParams {
  orderItemId: string;
}

export interface ReviewParams extends PageQuery {}

export interface SaveParams {
  productId: string;
  storeId: string;
  orderItemId: string;
  score: number;
  content: string;
  specifications: string;
  images: string;
}

export interface ReviewPOM extends ReviewAttributes {
  images: string;
}

@Injectable({ providedIn: 'root' })
@BaseUrl('/user/review')
export class ReviewService extends BaseApi {
  /**
   * user has commented on this product
   * GET /user/review/getUserReviewList
   *
   */
  @GET('/getUserReviewList')
  getUserReviewList(@Payload data: PageQuery): Observable<PageResult<ReviewPOM>> {
    return null as any;
  }

  /**
   * user did not comment on product
   * GET /user/review/getUserNotReviewList
   *
   */
  @GET('/getUserNotReviewList')
  getUserNotReviewList(@Payload data: ReviewParams): Observable<PageResult<ReviewPOM>> {
    return null as any;
  }

  /**
   * delete commented items
   * POST /user/review/delProductReview
   *
   */
  @POST('/delProductReview')
  delProductReview(@Body data: DeleteParams): Observable<any> {
    return null as any;
  }

  /**
   * delete items without comments
   * POST /user/review/delNotProductReview
   *
   */
  @POST('/delNotProductReview')
  delNotProductReview(@Body data: DeleteOrderItemParams): Observable<any> {
    return null as any;
  }

  /**
   * add product reviews
   * POST /user/review/saveProductReview
   *
   */
  @POST('/saveProductReview')
  saveProductReview(@Body data: SaveParams): Observable<any> {
    return null as any;
  }
}
