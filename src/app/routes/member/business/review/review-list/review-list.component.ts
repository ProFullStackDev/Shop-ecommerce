import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersPOM, OrderStatus, UserOrderService, UserOrdersParams } from '@core/services/user/order.service';
import { ReviewPOM, ReviewParams, ReviewService } from '@core/services/user/review.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { DictKey } from '@shared/pipes/dict/dict.pipe';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.less']
})
export class ReviewListComponent extends DestroySubscription implements OnInit {
  constructor(
    private reviewSrv: ReviewService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
    private modal: NzModalService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      this.reviewStatusTabIndex = params.reviewStatusTabIndex || 0;
      if (this.reviewStatusTabIndex == 1) {
        this.getReviewList();
      } else {
        this.getNotReviewList();
      }
    });
  }

  dateRange = [];
  loading = {
    table: false,
    submit: false
  };
  DictKey = DictKey;
  reviewStatusTabIndex = 0;
  reviewStatusTab = ['未评论', '已评论'];
  reviews: ReviewPOM[] = [];
  queryTxtType = 0; // 0: orderSn
  pageParams: ReviewParams = {
    rows: 10,
    page: 0
  };
  reviewTotalNum = 0;
  tableSpan = {
    detail: 12,
    review: 8,
    operation: 4
  };
  isVisible = false;
  index = 0;

  getReviewList() {
    this.loading.table = true;
    console.log(this.pageParams);
    this.reviewSrv
      .getUserReviewList({
        ...this.pageParams
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          console.log('getReviewList', res);
          this.reviews = res.rows;
          this.reviewTotalNum = res.total;
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.table = false;
      });
  }

  getNotReviewList() {
    this.loading.table = true;
    console.log(this.pageParams);
    this.reviewSrv
      .getUserNotReviewList({
        ...this.pageParams
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          console.log('getNotReviewList', res);
          this.reviews = res.rows;
          this.reviewTotalNum = res.total;
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.table = false;
      });
  }

  handleOk(): void {
    this.isVisible = false;
    this.delReview();
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  goDel(index: number) {
    this.isVisible = true;
    this.index = index;
  }

  delReview(): void {
    this.loading.submit = true;
    this.reviewSrv
      .delProductReview({
        reviewId: `${this.reviews[this.index].id}`
      })
      .subscribe(
        () => {
          this.message.success('删除成功');
          this.reviews.splice(this.index, 1);
        },
        error => {
          console.error(error);
          this.message.error(error.message);
        }
      )
      .add(() => {
        this.loading.submit = false;
      });
  }

  orderStatusChange(index: number) {
    this.pageParams.page = 0;
    this.router.navigate(['member', 'review', 'list'], {
      queryParams: { reviewStatusTabIndex: index },
      replaceUrl: true
    });
  }

  pageChange(page: number) {
    this.pageParams.page = page - 1;
    if (this.reviewStatusTabIndex == 1) {
      this.getReviewList();
    } else {
      this.getNotReviewList();
    }
  }
}
