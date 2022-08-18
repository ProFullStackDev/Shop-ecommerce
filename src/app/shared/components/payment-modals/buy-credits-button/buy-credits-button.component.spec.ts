import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCreditsButtonComponent } from './buy-credits-button.component';

describe('BuyCreditsButtonComponent', () => {
  let component: BuyCreditsButtonComponent;
  let fixture: ComponentFixture<BuyCreditsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCreditsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCreditsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
