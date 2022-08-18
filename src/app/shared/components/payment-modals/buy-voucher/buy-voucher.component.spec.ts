import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyVoucherComponent } from './buy-voucher.component';

describe('BuyVoucherComponent', () => {
  let component: BuyVoucherComponent;
  let fixture: ComponentFixture<BuyVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
