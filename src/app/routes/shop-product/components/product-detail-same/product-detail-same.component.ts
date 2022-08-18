import { Component, Input } from '@angular/core';
import { ProductImageType, ProductPOM, ShopProductService } from '@core/services/shop/product.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { getProductCover } from '@shared/utils/utils';
import { takeUntil } from 'rxjs/operators';
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper';
import { NavigationOptions } from 'swiper/types';

SwiperCore.use([Pagination, Navigation, Autoplay]);

@Component({
  selector: 'app-product-detail-same',
  template: `
    <nz-divider nzText="看了又看"></nz-divider>
    <nz-skeleton *ngIf="loading"></nz-skeleton>
    <swiper
      *ngIf="sameProductList.length > 0"
      direction="vertical"
      [slidesPerView]="2"
      [loop]="true"
      [autoplay]="true"
      [navigation]="navigation"
      class="mySwiper"
    >
      <ng-template swiperSlide *ngFor="let product of sameProductList">
        <app-product-item [product]="product"></app-product-item>
      </ng-template>
    </swiper>
    <div class="space">
      <div [class.scr-prev]="isScrolled" class="swiper-button-prev detail-same-swiper-prev"></div>
      <div [class.scr-next]="isScrolled" class="swiper-button-next detail-same-swiper-next"></div>
    </div>
  `,
  styleUrls: ['./product-detail-same.component.less']
})
export class ProductDetailSameComponent extends DestroySubscription {
  constructor(private productSrv: ShopProductService) {
    super();
  }

  private _productId!: string;

  sameProductList: ProductPOM[] = [];

  loading = false;

  navigation: NavigationOptions = { prevEl: '.detail-same-swiper-prev', nextEl: '.detail-same-swiper-next' };
  @Input() isScrolled: boolean = false;
  @Input()
  set productId(id: string) {
    this._productId = id;
    this.getSameProduct();
  }

  generateProduct(product: ProductPOM): ProductPOM {
    return {
      ...product,
      cover: getProductCover(product.productImages || '{}', ProductImageType.THUMBNAIL)
    };
  }

  getSameProduct() {
    // TODO: get same product with product ID
    this.loading = true;
    this.productSrv
      .query({ page: 0, rows: 6, minPrice: 100 })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.sameProductList = res.rows.map(this.generateProduct);
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
