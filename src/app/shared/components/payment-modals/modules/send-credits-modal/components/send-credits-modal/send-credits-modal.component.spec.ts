import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendCreditsModalComponent } from './send-credits-modal.component';

describe('SendCreditsModalComponent', () => {
  let component: SendCreditsModalComponent;
  let fixture: ComponentFixture<SendCreditsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendCreditsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendCreditsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
