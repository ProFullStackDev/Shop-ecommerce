import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductCategoryPOM, ShopCategoryService } from '@core/services/shop/category.service';
import { ProductImageType, ProductPOM, ShopProductService } from '@core/services/shop/product.service';
import { getProductCover } from '@shared/utils/utils';
import { NzAnchorLinkComponent } from 'ng-zorro-antd/anchor';
import {takeUntil} from "rxjs/operators";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";

interface CategoryProductPOM extends ProductCategoryPOM {
  relatedProduct: ProductPOM[];
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less']
})
export class CategoryComponent extends DestroySubscription implements OnInit {
  constructor(
    private categoryService: ShopCategoryService,
    private productService: ShopProductService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super();
  }

  loading = {
    list: false
  };

  allCategory: ProductCategoryPOM[] = [];
  categoryTree: CategoryProductPOM[] = [];
  loadedProductCategoryId: Set<string> = new Set<string>([]);

  ngOnInit(): void {
    this.queryAllCategory();
  }

  queryAllCategory() {
    this.loading.list = true;
    this.categoryService
      .queryAll()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.allCategory = res;
          this.categoryTree = this.allCategory.filter(item => Object.is(item.parentId, null)).map(item => this.generateCategoryItem(item));
          if (this.categoryTree.length > 0) {
            this.getRelatedProduct(this.categoryTree[0].id.toString());
          }
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.list = false;
      });
  }

  generateCategoryItem(categoryItem: ProductCategoryPOM): CategoryProductPOM {
    const childCategory = this.allCategory.filter(item => Object.is(item.parentId, categoryItem.id));
    return {
      ...categoryItem,
      relatedProduct: [],
      ...(childCategory.length > 0 ? { child: childCategory.map(item => this.generateCategoryItem(item)) } : {})
    };
  }

  scrollTarget(e: NzAnchorLinkComponent) {
    const categoryId = e.nzHref.split('-')[1];
    if (!Object.is(categoryId, undefined)) {
      const index = this.categoryTree.findIndex(category => Object.is(category.id, categoryId));
      this.getRelatedProduct(categoryId);
      if (index < this.categoryTree.length - 1) {
        this.getRelatedProduct(this.categoryTree[index + 1].id.toString());
      }
    }
  }

  getRelatedProduct(categoryId: string) {
    const targetCategory = this.categoryTree.find(category => Object.is(category.id, categoryId));
    if (!targetCategory || this.loadedProductCategoryId.has(categoryId)) return;
    this.loadedProductCategoryId.add(categoryId);
    this.productService
      .query({
        page: 0,
        rows: 5,
        allowUsePoint: 'false',
        categoryTreePath: `,${categoryId},`
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          targetCategory.relatedProduct.push(
            ...res.rows.map(product => ({
              ...product,
              cover: getProductCover(product.productImages || '{}', ProductImageType.THUMBNAIL)
            }))
          );
          this.changeDetectorRef.markForCheck();
          this.changeDetectorRef.detectChanges();
        },
        error => {
          console.error(error);
        }
      );
  }
}
