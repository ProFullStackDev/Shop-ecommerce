import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPrimeModalComponent } from './get-prime-modal.component';

describe('GetPrimeModalComponent', () => {
  let component: GetPrimeModalComponent;
  let fixture: ComponentFixture<GetPrimeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetPrimeModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPrimeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
