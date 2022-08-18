import { TestBed } from '@angular/core/testing';

import { ShopBasketService } from './shop-basket.service';

describe('ShopBasketService', () => {
  let service: ShopBasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopBasketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
