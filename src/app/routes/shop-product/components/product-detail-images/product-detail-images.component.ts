import { Component, Input, ViewChild } from '@angular/core';
import { ProductImage } from '@core/services/shop/product.service';
import SwiperCore, { Navigation, Thumbs } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { NavigationOptions } from 'swiper/types';

SwiperCore.use([Navigation, Thumbs]);

@Component({
  selector: 'app-product-detail-images',
  template: `
    <swiper #swiperLarge [spaceBetween]="10" [thumbs]="{ swiper: thumbsSwiper }" class="swiper-large">
      <ng-template *ngFor="let item of _productImages" swiperSlide><img class="img" [src]="item.large" /></ng-template>
    </swiper>
    <div class="swiper-thumb-con">
      <swiper
        #swiperThumb
        (swiper)="thumbsSwiper = $event"
        [spaceBetween]="10"
        [slidesPerView]="5"
        [navigation]="navigation"
        [watchSlidesProgress]="true"
        class="swiper-thumb"
      >
        <ng-template class="swiper-slide swiper-slide-style" *ngFor="let item of _productImages; let i = index" swiperSlide>
          <img (mouseenter)="changeSwiperIndex(i)" class="img" [src]="item.thumbnail" />
        </ng-template>
      </swiper>
      <div class="product-and-share">
        <div class="share-airplane">
          <p class="share-text">{{ 'shop-product-page-share' | translate }}</p>
          <img class="paper-plane" src="assets/images/paper-plane.svg" alt="plane" />
        </div>
      </div>
      <div class="swiper-button-prev detail-images-thumb-button-prev navigation-btn"></div>
      <div class="swiper-button-next detail-images-thumb-button-next navigation-btn"></div>
    </div>
  `,
  styleUrls: ['./product-detail-images.component.less']
})
export class ProductDetailImagesComponent {
  constructor() {}

  @ViewChild('swiperLarge', { static: false }) swiperLarge?: SwiperComponent;
  @ViewChild('swiperThumb', { static: false }) swiperThumb?: SwiperComponent;

  _productImages: ProductImage[] = [];

  thumbsSwiper: any;

  navigation: NavigationOptions = {
    prevEl: '.detail-images-thumb-button-prev',
    nextEl: '.detail-images-thumb-button-next'
  };

  @Input()
  set productImages(productImages: string) {
    this._productImages = JSON.parse(productImages || '[]');
    setTimeout(() => {
      // hack
      this.changeSwiperIndex(1);
      this.changeSwiperIndex(0);
    }, 500);
  }

  changeSwiperIndex(index: number) {
    this.swiperLarge?.swiperRef.slideTo(index);
    this.swiperThumb?.swiperRef.slideTo(index);
  }
}
