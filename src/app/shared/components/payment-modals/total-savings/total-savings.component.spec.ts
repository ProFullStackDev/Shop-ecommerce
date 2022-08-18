import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSavingsComponent } from './total-savings.component';

describe('TotalSavingsComponent', () => {
  let component: TotalSavingsComponent;
  let fixture: ComponentFixture<TotalSavingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalSavingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalSavingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
