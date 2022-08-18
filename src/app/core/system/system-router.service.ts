import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ProductQueryParams } from '@core/services/shop/product.service';

@Injectable({
  providedIn: 'root'
})
export class SystemRouterService {
  constructor(private router: Router) {}

  navigateToProductSearch(params: Partial<ProductQueryParams>, extras?: NavigationExtras) {
    return this.router.navigate(['/product/search'], {
      queryParams: params,
      ...extras
    });
  }
}
