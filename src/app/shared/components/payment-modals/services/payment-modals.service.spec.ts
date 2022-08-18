import { TestBed } from '@angular/core/testing';

import { PaymentModalsService } from './payment-modals.service';

describe('PaymentModalsService', () => {
  let service: PaymentModalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentModalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
