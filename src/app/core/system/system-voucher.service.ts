import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class SystemVoucherService {
  constructor(private translate: TranslateService) {
    this.translate.get('voucher').subscribe(t => (this.productName = t));
  }

  skuId = '100';
  productId = '100';
  defaultPrice = 50;
  productName = '';
  cover = '/assets/images/ticket-voucher-single-gold.png';
}
