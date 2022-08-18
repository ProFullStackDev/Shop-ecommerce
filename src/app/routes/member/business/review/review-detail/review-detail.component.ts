import { Location } from '@angular/common'; //路由返回
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from '@core/services/user/review.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.less']
})
export class ReviewDetailComponent extends DestroySubscription implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private message: NzMessageService,
    private reviewService: ReviewService,
    private location: Location
  ) {
    super();
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      content: [null, [Validators.required]]
    });
    this.route.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(queryParams => {
      console.log(queryParams);
      this.productId = queryParams.productId;
      this.reviewId = queryParams.reviewId;
      this.storeId = queryParams.storeId;
      this.orderItemId = queryParams.orderItemId;
      this.specifications = queryParams.specifications;
      this.name = queryParams.name;
      this.thumbnail = queryParams.thumbnail;
      this.content = queryParams.content;
      this.score = queryParams.score;
      this.images = queryParams.images ? JSON.parse(queryParams.images) : [];
    });
  }
  score = 5;
  productId: string;
  storeId: string;
  orderItemId: string;
  specifications: string;
  name: string;
  thumbnail: string;
  reviewId: string;
  content: string;
  validateForm!: FormGroup;
  loading = {
    submit: false
  };
  isVisible = false;
  images: any[] = [];

  handleOk(): void {
    this.isVisible = false;
    this.delReview();
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  goDel() {
    this.isVisible = true;
  }

  delReview(): void {
    this.loading.submit = true;
    this.reviewService
      .delProductReview({
        reviewId: this.reviewId
      })
      .subscribe(
        () => {
          this.message.success('删除成功');
          setTimeout(() => {
            this.router.navigate(['/member/review/list']);
          }, 500);
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

  goBack() {
    this.location.back();
  }
}
