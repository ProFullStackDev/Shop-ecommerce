import { Injectable } from '@angular/core';
// @ts-ignore
import { Observable } from 'rxjs/internal/Observable';
// @ts-ignore
import { of } from 'rxjs';
import {ProductsList} from "../models/shop-basket.model";
import {SHOP_BASKET_PRODUCTS_LIST} from "../../../../../../mock/header.mock";

@Injectable({providedIn: 'root'})
export class ShopBasketService {
  public getProducts(): Observable<ProductsList[]> {
    return of(SHOP_BASKET_PRODUCTS_LIST);
  }
}
