import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeGiftCodeButtonComponent } from './make-gift-code-button.component';

describe('MakeGiftCodeButtonComponent', () => {
  let component: MakeGiftCodeButtonComponent;
  let fixture: ComponentFixture<MakeGiftCodeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeGiftCodeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeGiftCodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
