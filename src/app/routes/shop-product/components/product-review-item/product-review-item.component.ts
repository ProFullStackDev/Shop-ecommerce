import { Component, Input } from '@angular/core';
import { ReviewPOM } from '@core/services/shop/product.service';

@Component({
  selector: 'app-product-review-item',
  template: `
    <nz-row [nzGutter]="32" nzAlign="top">
      <nz-col class="header">
        <nz-avatar nzIcon="user" [nzSrc]="avatar"></nz-avatar>
        <div class="text text-gray-darker">
          <div>{{ review.memberName }}</div>
          <div>{{ review.memberRank }}</div>
        </div>
      </nz-col>
      <nz-col nzFlex="1">
        <nz-rate [ngModel]="review.score" nzDisabled></nz-rate>
        <div class="content">{{ review.content }}</div>
        <div class="images" *ngIf="images.length > 0"
          ><nz-image-group> <img nz-image width="90px" *ngFor="let image of images" [nzSrc]="image" alt="" /> </nz-image-group
        ></div>
        <nz-row class="text-gray" nzJustify="space-between">
          <div class="specifications">[{{ specifications }}]</div>
          <div class="time">{{ review.createdDate | date: 'YYYY-MM-dd' }}</div>
        </nz-row>
        <div *ngFor="let replie of review.replies" class="replies-item">
          <nz-row nzJustify="space-between">
            <nz-col> {{ storeName }}：</nz-col>
            <nz-col [nzFlex]="1">
              <nz-row class="right" nzJustify="space-between">
                <nz-col class="replie-content text-primary" [nzFlex]="1">{{ replie.content }}</nz-col>
                <nz-col [nzFlex]="1" class="text-gray">{{ replie.createdDate | date: 'YYYY-MM-dd' }}</nz-col>
              </nz-row>
            </nz-col>
          </nz-row>
          <nz-divider></nz-divider>
        </div>
      </nz-col>
    </nz-row>
  `,
  styleUrls: ['./product-review-item.component.less']
})
export class ProductReviewItemComponent {
  constructor() {}

  @Input() review!: ReviewPOM;
  @Input() storeName = '';

  get images() {
    return this.review.images ? JSON.parse(this.review.images) : [];
  }

  get avatar() {
    return this.review.memberAvatar;
  }

  get specifications() {
    return JSON.parse(this.review.specifications || '[]').join(',');
  }
}
