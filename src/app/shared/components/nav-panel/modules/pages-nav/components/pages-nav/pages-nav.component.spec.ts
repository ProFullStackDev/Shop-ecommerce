import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesNavComponent } from './pages-nav.component';

describe('PagesNavComponent', () => {
  let component: PagesNavComponent;
  let fixture: ComponentFixture<PagesNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
