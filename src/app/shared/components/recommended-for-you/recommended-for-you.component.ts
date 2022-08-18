import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonService, ConfigThemeEnum, ConfigThemePOM } from '@core/services/common.service';
import { ProductCategoryPOM } from '@core/services/shop/category.service';
import { ProductImageType, ProductPOM, ShopProductService } from '@core/services/shop/product.service';
import { ProductsCategories } from '@shared/components/nav-panel/models/nav-panel.model';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { getProductCover } from '@shared/utils/utils';
import { forkJoin, Observable, takeUntil } from 'rxjs';

import { RECOMMENDED_TITLES } from '../../../mock/home-blocks.mock';

@Component({
  selector: 'app-recommended-for-you',
  templateUrl: './recommended-for-you.component.html',
  styleUrls: ['./recommended-for-you.component.less']
})
export class RecommendedForYouComponent extends DestroySubscription implements OnInit {
  @ViewChild('navelemt') navelemt: ElementRef;
  @ViewChild('elemt') elemt: ElementRef;
  isTableStartPosition = false;
  constructor(
    private commonService: CommonService,
    private productService: ShopProductService,
    @Inject(DOCUMENT) private readonly document: Document
  ) {
    super();
  }

  private mouseDown = false;
  private startX: any;
  private scrollLeft: any;

  allCategory: ProductCategoryPOM[] = [];
  themeConfig: ConfigThemePOM[] = [];

  public productCategories$: Observable<ProductsCategories[]>;

  recommendTabs: Array<{
    categoryTreePath: string;
    meta: any;
    key: string;
    title: string;
  }> = [];
  recommendKey: string = '';
  recommendGoods: {
    [key: string]: ProductPOM[];
  } = {};

  get currentRecommendList() {
    return this.recommendGoods[this.recommendKey];
  }

  ngOnInit(): void {
    this.queryAllCategory();
  }

  queryAllCategory() {
    // TODO: cache data
    // forkJoin([this.commonService.queryConfigTheme(), this.categoryService.queryAll()])
    forkJoin([this.commonService.queryConfigTheme()])
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        ([themeConfig]) => {
          this.themeConfig = themeConfig;
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.getRecommendData();
      });
  }

  generateProduct(product: ProductPOM): ProductPOM {
    return {
      ...product,
      cover: getProductCover(product.productImages || '{}', ProductImageType.THUMBNAIL)
    };
  }

  getRecommendData() {
    const recommendThemeConfig = this.themeConfig.find(config => Object.is(config.theme, ConfigThemeEnum.RecommendedToYou));
    const recommendList: Array<{ meta: any; title: string }> = JSON.parse((recommendThemeConfig || {}).data || '[]');
    // The meta is the products query params
    this.recommendTabs = recommendList.map((recommend, index) => ({
      key: `${recommend.title}-${recommend.meta.categoryTreePath}`,
      categoryTreePath: recommend.meta.categoryTreePath,
      meta: recommend.meta,
      title: RECOMMENDED_TITLES[index].title
    }));
    if (this.recommendTabs.length > 0) {
      this.recommendKey = this.recommendTabs[0].key;
      this.recommendGoods = this.recommendTabs.reduce((obj, tab) => {
        obj[tab.key] = [];
        return obj;
      }, {});
      forkJoin(this.recommendTabs.map(tab => this.productService.query(tab.meta)))
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(
          dataList => {
            Object.keys(this.recommendGoods).forEach((key, index) => {
              // TODO: The data is repetitive, The sorting method makes them look different
              this.recommendGoods[key] = dataList[index].rows.map(this.generateProduct).sort(() => Math.random() - 0.5);
            });
          },
          error => {
            console.log(error);
          }
        );
      // this.recommendGoods.phone = phone.rows.map(this.generateProduct);
    }
  }

  // @ts-ignore
  public startDragging(e, flag, el): void {
    this.mouseDown = true;
    this.startX = e.pageX - el.offsetLeft;
    this.scrollLeft = el.scrollLeft;
  }

  // @ts-ignore
  public stopDragging(e, flag, el): void {
    this.mouseDown = false;
    el.classList.remove('active');
  }

  // @ts-ignore
  public moveEvent(e, el): void {
    e.preventDefault();
    if (!this.mouseDown) {
      return;
    }
    const x = e.pageX - el.offsetLeft;
    const scroll = x - this.startX;
    el.scrollLeft = this.scrollLeft - scroll * 2;
    el.classList.add('active');
  }

  scrollOnSelect(e: any) {
    e.target.scrollIntoView({ inline: 'start', behavior: 'smooth', block: 'nearest' });
  }

  startTouching(): void {
    this.isTableStartPosition = this.navelemt.nativeElement.scrollLeft === 0;
  }

  checkTouching(e: TouchEvent): void {
    if (this.isTableStartPosition) {
      return;
    }

    e.stopPropagation();
  }

  startTouchingSlider(): void {
    this.isTableStartPosition = this.elemt.nativeElement.scrollLeft === 0;
  }

  checkTouchingSlider(e: TouchEvent): void {
    if (this.isTableStartPosition) {
      return;
    }

    e.stopPropagation();
  }
}
