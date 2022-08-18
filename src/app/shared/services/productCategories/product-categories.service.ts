import { Injectable } from '@angular/core';
import { ShopCategoryService, ProductCategoryPOM } from '@core/services/shop/category.service';
import { ProductsCategories, ProductsCategoriesSubItem } from '@shared/components/nav-panel/models/nav-panel.model';
import { map, of, takeUntil } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import { PRODUCT_CATEGORIES } from '../../../mock/nav-panel.mock';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoriesService {
  constructor(private categoryService: ShopCategoryService) {}

  public getProductsCategories(): Observable<ProductsCategories[]> {
    return of(PRODUCT_CATEGORIES);
  }

  public getProductsCategories1(): Observable<ProductsCategories[]> {
    // @ts-ignore
    return this.categoryService.queryAll().pipe(
      map(allCategory =>
        allCategory
          .filter(item => Object.is(item.parentId, null))
          .map(topCategory => ({
            id: topCategory.id,
            link: `/product/search?categoryId=${topCategory.id}`,
            title: topCategory.key ? topCategory.key : topCategory.name,
            icon: topCategory.icon || '',
            // @ts-ignore
            subList: topCategory.children
              .filter(category => Object.is(category.parentId, topCategory.id))
              .map(secondCategory => ({
                title: secondCategory.key ? secondCategory.key : secondCategory.name,
                // @ts-ignore
                links: secondCategory.children
                  .filter(category => Object.is(category.parentId, secondCategory.id))
                  .map(thirdCategory => ({
                    link: `/product/search?categoryId=${thirdCategory.id}`,
                    // @ts-ignore
                    text: thirdCategory.key ? thirdCategory.key : thirdCategory.name
                  }))
              }))
          }))
      )
    );
    // return of(PRODUCT_CATEGORIES);
  }
}
