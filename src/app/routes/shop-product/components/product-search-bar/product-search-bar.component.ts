import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductOrderBy, ProductQueryParams } from '@core/services/shop/product.service';
import { SystemRouterService } from '@core/system/system-router.service';
import { isNullOrUndefined } from '@shared/utils/utils';
import {takeUntil} from "rxjs/operators";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";

@Component({
  selector: 'app-product-search-bar',
  template: `
    <nz-space nzAlign="center">
      <nz-radio-group *nzSpaceItem [ngModel]="queryParams.orderBy" nzButtonStyle="solid" (ngModelChange)="reNavigate($event, 'orderBy')">
        <label class="filter-product-categ" *ngFor="let orderBy of orderByOptions" nz-radio-button [nzValue]="orderBy.value">{{ orderBy.label | translate }}</label>
      </nz-radio-group>
      <label *nzSpaceItem nz-checkbox [ngModel]="queryParams.haStock" (nzCheckedChange)="hasStockChange($event)">{{'search-page-filter-in-stock' | translate}}</label>
      <nz-input-number
        *nzSpaceItem
        [(ngModel)]="queryParams.minPrice"
        [nzMin]="0"
        [nzPrecision]="2"
        nzPlaceHolder="{{'search-page-price-min' | translate}}"
      ></nz-input-number>
      <span *nzSpaceItem>-</span>
      <nz-input-number
        *nzSpaceItem
        [(ngModel)]="queryParams.maxPrice"
        [nzMin]="queryParams.minPrice || 0"
        [nzPrecision]="2"
        nzPlaceHolder="{{'search-page-price-max' | translate}}"
      ></nz-input-number>
      <button *nzSpaceItem nz-button nzType="primary" (click)="search()">{{'search-page-apply' | translate}}</button>
    </nz-space>
  `,
  styleUrls: ['./product-search-bar.component.less'],
  providers: [SystemRouterService]
})
export class ProductSearchBarComponent extends DestroySubscription implements OnInit {
  constructor(private route: ActivatedRoute, private router: SystemRouterService) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(queryParams => {
      this.queryParams.name = queryParams.name;
      this.queryParams.orderBy = Number(queryParams.orderBy) || ProductOrderBy.ShopProductOrderByDefault;
      this.queryParams.haStock = queryParams.haStock ? Boolean(queryParams.haStock) : undefined;
      this.queryParams.isHot = queryParams.isHot;
      this.queryParams.isNew = queryParams.isNew;
      this.queryParams.isLeaderboard = queryParams.isLeaderboard;
      this.queryParams.minPrice = Number(queryParams.minPrice) || undefined;
      this.queryParams.maxPrice = Number(queryParams.maxPrice) || undefined;
      this.queryParams.categoryTreePath = queryParams.categoryTreePath;
      this.queryParams.categoryId = queryParams.categoryId;
      this.queryParams.couponId = queryParams.couponId;
      this.paramsChange.emit(this.queryParams);
    });
  }
  @Output() readonly paramsChange = new EventEmitter<Partial<ProductQueryParams>>();

  orderByOptions = [
    { value: ProductOrderBy.ShopProductOrderByDefault, label: 'search-page-filter-all' },
    { value: ProductOrderBy.ShopProductOrderBySales, label: 'search-page-filter-popular' },
    // TODO will back in future
    //  { value: ProductOrderBy.ShopProductOrderByNumberOfRatings, label: 'search-page-filter-ratings' },
    { value: ProductOrderBy.ShopProductOrderByPriceFromLowToHigh, label: 'search-page-filter-price-low' },
    { value: ProductOrderBy.ShopProductOrderByPriceFromHighToLow, label: 'search-page-filter-price-high' }
  ];

  queryParams: Partial<ProductQueryParams> = {
    name: '',
    categoryTreePath: '',
    orderBy: ProductOrderBy.ShopProductOrderByDefault,
    haStock: undefined,
    minPrice: undefined,
    maxPrice: undefined
  };

  hasStockChange(checked: boolean) {
    const haStock = checked || undefined;
    this.reNavigate(haStock, 'haStock');
  }

  reNavigate(value?: any, field?: any) {
    this.router
      .navigateToProductSearch(
        {
          ...this.queryParams,
          ...(!isNullOrUndefined(field)
            ? {
                [field]: value
              }
            : {})
        },
        {
          replaceUrl: true
        }
      )
      .then(r => console.error(r));
  }

  search() {
    this.reNavigate();
  }

  test(value: any) {
    console.log(value);
  }
}
