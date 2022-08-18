import { Component, Input } from '@angular/core';
import { ProductImageType, ProductPOM } from '@core/services/shop/product.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { getProductCover } from '@shared/utils/utils';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-item',
  template: `
    <div class="product">
      <a [routerLink]="['/product/detail']" [queryParams]="{ id: productId }" class="cover">
        <img [src]="cover" [alt]="product.name" />
      </a>
      <strong class="price">
        {{ product.price | currency }}
        <del>{{ product.marketPrice | currency }}</del>
      </strong>
      <a [routerLink]="['/product/detail']" [queryParams]="{ id: productId }" class="name text-overflow" [title]="product.name">
        {{ product.name }}
      </a>
      <div *ngIf="showTools" class="tools">
        <button>
          <div class="coin-cash-back coin-cash-back-swiper">
            <div class="dollar-img-cash-cont">
              <p class="text-cash">Cash back reward:</p>
            </div>
            <div class="container-cash-back">
              <img src="/assets/images/TYD-small.png" class="img-dollar-cashback" />
              <p class="num-cash-back">+{{ cashBack | number: '0.2-2' }}</p>
            </div>
          </div>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./product-item.component.less']
})
export class ProductItemComponent extends DestroySubscription {
  constructor(private cartService: SystemCartService) {
    super();
  }

  @Input() product!: ProductPOM;
  @Input() showTools: boolean = false;

  get productId() {
    return this.product.id;
  }

  get cover() {
    return getProductCover(this.product.productImages || '[]', ProductImageType.THUMBNAIL);
  }

  get hasStock() {
    return this.product?.defaultSku?.stock > 0;
  }

  get cashBack() {
    return this.product?.defaultSku?.cashBack;
  }

  addToCart() {
    const defaultSku = this.product.defaultSku;
    this.cartService
      .addCart({
        productId: this.product.id,
        productName: this.product.name,
        skuPrice: defaultSku.price,
        priceTotal: defaultSku.price,
        skuId: defaultSku.id,
        skuExchangePoint: defaultSku.exchangePoint,
        exchangePointTotal: defaultSku.exchangePoint,
        quantity: 1,
        cover: this.cover
      })
      .subscribe(() => this.cartService.getCart().pipe(takeUntil(this.destroyStream$)).subscribe());
  }
}
