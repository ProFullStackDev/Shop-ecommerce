import { Component, OnInit } from '@angular/core';
import { ProductPOM, ShopProductService } from '@core/services/shop/product.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-recommend',
  template: `
    <nz-card
      [nzBorderless]="true"
      [nzTitle]="'home-recommended-title' | translate"
      nzSize="small"
      [nzLoading]="loading"
      class="recommend-product mob-width"
    >
      <swiper *ngIf="productList.length > 0" direction="vertical" [slidesPerView]="2" [loop]="true" [autoplay]="true" class="mySwiper mob-width">
        <ng-template swiperSlide *ngFor="let product of productList">
          <app-product-item class="mob-width" [product]="product"></app-product-item>
        </ng-template>
      </swiper>
    </nz-card>
  `,
  styleUrls: ['./product-recommend.component.less']
})
export class ProductRecommendComponent extends DestroySubscription implements OnInit {
  constructor(private productSrc: ShopProductService) {
    super();
  }

  productList: ProductPOM[] = [];
  loading = false;

  ngOnInit(): void {
    this.queryRecommendProduct();
  }

  queryRecommendProduct() {
    // TODO: query recommend
    this.loading = true;
    this.productSrc
      .query({ rows: 5, page: 0, allowUsePoint: 'false', categoryTreePath: ',1,' })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.productList = res.rows;
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading = false;
      });
  }
}
