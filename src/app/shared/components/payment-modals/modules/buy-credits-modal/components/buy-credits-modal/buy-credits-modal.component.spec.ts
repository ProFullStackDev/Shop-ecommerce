import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCreditsModalComponent } from './buy-credits-modal.component';

describe('BuyCreditsModalComponent', () => {
  let component: BuyCreditsModalComponent;
  let fixture: ComponentFixture<BuyCreditsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCreditsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyCreditsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
