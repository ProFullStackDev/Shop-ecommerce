import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewConvertDollarsModalComponent } from './new-convert-dollars-modal.component';

describe('NewConvertDollarsModalComponent', () => {
  let component: NewConvertDollarsModalComponent;
  let fixture: ComponentFixture<NewConvertDollarsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewConvertDollarsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewConvertDollarsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
