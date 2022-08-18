import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemCodeButtonComponent } from './redeem-code-button.component';

describe('RedeemCodeButtonComponent', () => {
  let component: RedeemCodeButtonComponent;
  let fixture: ComponentFixture<RedeemCodeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedeemCodeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemCodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
