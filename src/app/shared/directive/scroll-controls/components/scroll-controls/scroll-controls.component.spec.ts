import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollControlsComponent } from './scroll-controls.component';

describe('ScrollControlsComponent', () => {
  let component: ScrollControlsComponent;
  let fixture: ComponentFixture<ScrollControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
