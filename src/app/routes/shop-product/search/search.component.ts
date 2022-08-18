import { Component } from '@angular/core';
import { ProductPOM, ProductQueryParams, ShopProductService } from '@core/services/shop/product.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shop-product-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class ShopProductSearchComponent extends DestroySubscription {
  constructor(private productSrc: ShopProductService) {
    super();
  }

  productList: ProductPOM[] = [];
  queryParams!: Partial<ProductQueryParams>;

  scrollConfig = {
    noMore: false,
    loading: false,
    distance: 1,
    throttle: 300,
    page: 0,
    rows: 20
  };

  paramsChange(params: Partial<ProductQueryParams> = {}) {
    this.queryParams = params;
    this.scrollConfig.noMore = false;
    this.scrollConfig.loading = false;
    this.scrollConfig.page = 0;
    this.productList = [];
    this.getProductList();
  }

  onScrollDown() {
    console.log('getProductList');
    this.getProductList();
  }

  getProductList() {
    if (this.scrollConfig.noMore || this.scrollConfig.loading) return;
    this.scrollConfig.loading = true;
    this.productSrc
      .query({ rows: this.scrollConfig.rows, page: this.scrollConfig.page, ...this.queryParams })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.scrollConfig.page++;
          this.productList.push(...res.rows);
          this.scrollConfig.noMore = res.rows.length < this.scrollConfig.rows;
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        setTimeout(() => {
          this.scrollConfig.loading = false;
        }, 2000);
      });
  }
}
