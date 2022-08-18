import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmYourOrderComponent } from './confirm-your-order.component';

describe('ConfirmYourOrderComponent', () => {
  let component: ConfirmYourOrderComponent;
  let fixture: ComponentFixture<ConfirmYourOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmYourOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmYourOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
