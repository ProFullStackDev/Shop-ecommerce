import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitTimeComponent } from './limit-time.component';

describe('LimitTimeComponent', () => {
  let component: LimitTimeComponent;
  let fixture: ComponentFixture<LimitTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LimitTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LimitTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
