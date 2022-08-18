import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGiftModalComponent } from './buy-gift-modal.component';

describe('BuyGiftModalComponent', () => {
  let component: BuyGiftModalComponent;
  let fixture: ComponentFixture<BuyGiftModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyGiftModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyGiftModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
