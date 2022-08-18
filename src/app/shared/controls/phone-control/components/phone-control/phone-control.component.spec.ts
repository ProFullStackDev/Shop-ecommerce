import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneControlComponent } from './phone-control.component';

describe('PhoneControlComponent', () => {
  let component: PhoneControlComponent;
  let fixture: ComponentFixture<PhoneControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
