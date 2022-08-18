import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreditComponent } from './store-credit.component';

describe('StoreCreditComponent', () => {
  let component: StoreCreditComponent;
  let fixture: ComponentFixture<StoreCreditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCreditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
