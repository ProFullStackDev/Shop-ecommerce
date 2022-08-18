import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedForYouComponent } from './recommended-for-you.component';

describe('RecommendedForYouComponent', () => {
  let component: RecommendedForYouComponent;
  let fixture: ComponentFixture<RecommendedForYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedForYouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
