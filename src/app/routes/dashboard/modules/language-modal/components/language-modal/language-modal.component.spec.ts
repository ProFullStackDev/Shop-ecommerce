import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageModalComponent } from './language-modal.component';

describe('LanguageModalComponent', () => {
  let component: LanguageModalComponent;
  let fixture: ComponentFixture<LanguageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LanguageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
