import { Component, Input } from '@angular/core';
import { ProductPOM, ProductType } from '@core/services/shop/product.service';

@Component({
  selector: 'app-category-product',
  template: `<div class="product">
    <a routerLink="/product/detail" [queryParams]="{ id: product.id }" class="product-image">
      <img [src]="product.cover" [alt]="product.name" />
    </a>
    <strong class="product-price" *ngIf="isGeneral">
      ￥{{ product.price }} <del>{{ product.marketPrice }}</del>
    </strong>
    <!--    <strong *ngIf="isExchange"> 积分兑换： </strong>-->
    <a routerLink="/product/detail" [queryParams]="{ id: product.id }" class="product-name">
      <h5 class="text-overflow" [title]="product.name">{{ product.name }}</h5>
    </a>
    <h6 class="product-caption text-overflow" [title]="product.caption">{{ product.caption }}</h6>
  </div>`,
  styleUrls: ['./category-product.component.less']
})
// <a class="product-image" href="${base}${product.path}" target="_blank">
// <img class="lazyload img-responsive center-block" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVQYV2P4DwABAQEAWk1v8QAAAABJRU5ErkJggg==" data-src="${product.thumbnail!setting.defaultThumbnailProductImage}" alt="${product.name}">
//   </a>
//   <strong>
//   [#if product.type == "GENERAL"]
//     ${currency(product.price, true)}
//     [#if setting.isShowMarketPrice]
// <del>${currency(product.marketPrice, true)}</del>
//   [/#if]
//   [#elseif product.type == "EXCHANGE"]
// ${message("Sku.exchangePoint")}: ${product.exchangePoint}
// [/#if]
// </strong>
// <a href="${base}${product.path}" target="_blank">
// <h5 class="text-overflow" title="${product.name}">${product.name}</h5>
//   </a>
//     [#if product.caption?has_content]
// <h6 class="text-overflow" title="${product.caption}">${product.caption}</h6>
//   [/#if]
export class CategoryProductComponent {
  constructor() {}

  @Input() product!: ProductPOM;

  get isGeneral() {
    return Object.is(this.product.type, ProductType.ShopProductTypeByGeneral);
  }

  get isExchange() {
    return Object.is(this.product.type, ProductType.ShopProductTypeByExchange);
  }
}
