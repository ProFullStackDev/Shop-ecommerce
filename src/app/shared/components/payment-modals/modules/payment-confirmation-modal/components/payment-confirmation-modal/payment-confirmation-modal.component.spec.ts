import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentConfirmationModalComponent } from './payment-confirmation-modal.component';

describe('PaymentConfirmationModalComponent', () => {
  let component: PaymentConfirmationModalComponent;
  let fixture: ComponentFixture<PaymentConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
