import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftcodeComponent } from './giftcode.component';

describe('GiftcodeComponent', () => {
  let component: GiftcodeComponent;
  let fixture: ComponentFixture<GiftcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
