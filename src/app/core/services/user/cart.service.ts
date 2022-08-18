import { Injectable } from '@angular/core';
import { BaseApi, BaseUrl, GET, Payload, POST } from '@delon/theme';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartPOM {
  id: number;
  name: string;
  // isSelfEmployed: boolean;
  checked: boolean;
  checkedIndeterminate: boolean;
  items: CartItemPOM[];
}
export interface CartItemPOM {
  cartItemId: string;
  productId: number;
  productName: string;
  skuId: number;
  skuSpec: string;
  skuExchangePoint: number;
  skuPrice: number;
  quantity: number;
  skuStock: number;
  priceTotal: number;
  exchangePointTotal: number;
  checked: boolean;
  cover: string;
  productImages: string;
  productEndTime: number;
  productBeingTime: number;
  cashBack: number;
}

@Injectable({
  providedIn: 'root'
})
@BaseUrl('/user/cart')
export class UserCartService extends BaseApi {
  /**
   * 获取购物车(Get shopping cart)
   * GET /user/cart/queryCart
   *
   */
  @GET('/queryCart')
  queryCart(): Observable<CartPOM[]> {
    return null as any;
  }

  /**
   * 修改购物项(Modify shopping item)
   * POST /user/cart/cartItemModify
   *
   * @param data
   */
  @POST('/cartItemModify')
  cartItemModify(@Payload data: any): Observable<any> {
    return null as any;
  }

  /**
   * 删除购物项
   * POST /user/cart/delByIds
   *
   * @param data
   */
  @POST('/delByIds')
  delByIds(@Payload data: { cartItemId: string[] }): Observable<any> {
    return null as any;
  }

  /**
   * 删除购物项
   * POST /user/cart/getCartAmount
   *
   * @param data
   */
  @POST('/getCartAmount')
  getCartAmount(
    @Payload data: { skuId: string; quantity: number }
  ): Observable<{ totalSumPrice: number; totalSumPoint: number; totalSumQuantity: number }> {
    return null as any;
  }
}
