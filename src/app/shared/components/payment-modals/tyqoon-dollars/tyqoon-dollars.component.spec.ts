import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TyqoonDollarsComponent } from './tyqoon-dollars.component';

describe('TyqoonDollarsComponent', () => {
  let component: TyqoonDollarsComponent;
  let fixture: ComponentFixture<TyqoonDollarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TyqoonDollarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TyqoonDollarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
