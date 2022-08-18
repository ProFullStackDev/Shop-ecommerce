import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovertDollarsButtonComponent } from './covert-dollars-button.component';

describe('CovertDollarsButtonComponent', () => {
  let component: CovertDollarsButtonComponent;
  let fixture: ComponentFixture<CovertDollarsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovertDollarsButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovertDollarsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
