import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipGiftCodeModalComponent } from './tooltip-gift-code-modal.component';

describe('TooltipGiftCodeModalComponent', () => {
  let component: TooltipGiftCodeModalComponent;
  let fixture: ComponentFixture<TooltipGiftCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipGiftCodeModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipGiftCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
