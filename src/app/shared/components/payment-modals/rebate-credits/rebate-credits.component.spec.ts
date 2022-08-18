import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebateCreditsComponent } from './rebate-credits.component';

describe('RebateCreditsComponent', () => {
  let component: RebateCreditsComponent;
  let fixture: ComponentFixture<RebateCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RebateCreditsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RebateCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
