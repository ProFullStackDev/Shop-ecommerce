import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareCodeModalComponent } from './share-code-modal.component';

describe('ShareCodeModalComponent', () => {
  let component: ShareCodeModalComponent;
  let fixture: ComponentFixture<ShareCodeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareCodeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareCodeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
