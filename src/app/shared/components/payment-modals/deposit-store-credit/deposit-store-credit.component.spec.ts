import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositStoreCreditComponent } from './deposit-store-credit.component';

describe('DepositStoreCreditComponent', () => {
  let component: DepositStoreCreditComponent;
  let fixture: ComponentFixture<DepositStoreCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositStoreCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositStoreCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
