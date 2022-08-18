import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeCardComponent } from './qr-code-card.component';

describe('QrCodeCardComponent', () => {
  let component: QrCodeCardComponent;
  let fixture: ComponentFixture<QrCodeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrCodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
