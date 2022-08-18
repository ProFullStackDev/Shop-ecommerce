import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemCodeModalComponent } from './redeem-code-modal.component';

describe('RedeemCodeModalComponent', () => {
  let component: RedeemCodeModalComponent;
  let fixture: ComponentFixture<RedeemCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeemCodeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
