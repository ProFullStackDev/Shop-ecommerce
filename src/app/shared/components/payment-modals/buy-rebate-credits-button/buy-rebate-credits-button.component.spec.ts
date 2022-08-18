import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyRebateCreditsButtonComponent } from './buy-rebate-credits-button.component';

describe('BuyRebateCreditsButtonComponent', () => {
  let component: BuyRebateCreditsButtonComponent;
  let fixture: ComponentFixture<BuyRebateCreditsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyRebateCreditsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyRebateCreditsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
