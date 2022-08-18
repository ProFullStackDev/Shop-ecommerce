import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Params, Router } from '@angular/router';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { ProductsCategories } from '@shared/components/nav-panel/models/nav-panel.model';
import { ProductCategoriesService } from '@shared/services/productCategories/product-categories.service';
import { take, Observable, forkJoin } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DropdownItem } from '../../../../../../controls/form-select/models/form-select.model';
import { HotSearchDto, SearchCategories } from '../../models/search.model';
import { HOT_SEARCH, SEARCH_CATEGORIES } from '../../statics/search.static';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent {
  public productCategories$: Observable<ProductsCategories[]>;
  readonly categories: Array<DropdownItem<number>> = SEARCH_CATEGORIES;
  readonly hotSearch: HotSearchDto = HOT_SEARCH;

  form: FormGroup;

  productCategories: ProductsCategories[];

  constructor(private readonly fb: FormBuilder, private router: Router, private readonly categoriesService: ProductCategoriesService) {
    this.categoriesService
      .getProductsCategories1()
      // .pipe(take(1))
      .subscribe({
        next: categories => {
          this.productCategories = [...categories];
          this.productCategories.unshift(new ProductsCategories('0', 'header-search-categories', '/product/search?categoryId=', '', []));
          this.setHotSearch(this.productCategories[0].id);
        }
      });
    this.initForm();
  }

  setHotSearch(value: string | number): void {
    this.form.get('searchCategories')?.patchValue(value);
    const targetCategory = this.productCategories.find(item => Object.is(item.id, value));
    if (!targetCategory) return;
    this.form.get('searchCategoriesText')?.patchValue(targetCategory.title);
  }

  search() {
    console.log(this.productCategories, this.form);
    const targetCategory = this.productCategories.find(item => Object.is(item.id, this.form.value.searchCategories));
    // console.log('targetCategory', targetCategory);
    if (!targetCategory) return;
    console.log('1');
    this.router.navigateByUrl(`${targetCategory.link}&name=${this.form.value.search || ''}`);
    // this.nav(['product', 'search'], { categoryId: this.form.value.searchCategories, name: this.form.value.search });
  }

  nav(link: string[], params?: Params) {
    this.router.navigate(link, { queryParams: params });
  }

  getParams() {
    const data = 'name';
    let search = window.location.search.replace(/^\?/, '');
    let pairs = search.split('&');
    let paramsMap = pairs
      .map(pair => {
        let [key, value] = pair.split('=');
        return [decodeURIComponent(key), decodeURIComponent(value)];
      })
      .reduce((res, [key, value]) => Object.assign(res, { [key]: value }), {});
    // @ts-ignore
    return paramsMap[data] || '';
  }

  private initForm(): void {
    const fb = this.fb;
    this.form = fb.group({
      search: this.getParams() ? this.getParams() : fb.control(null),
      searchCategories: fb.control(null),
      searchCategoriesText: fb.control(null)
    });
  }
}
