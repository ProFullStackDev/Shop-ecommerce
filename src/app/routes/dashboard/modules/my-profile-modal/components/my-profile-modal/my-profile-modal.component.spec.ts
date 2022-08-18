import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileModalComponent } from './my-profile-modal.component';

describe('MyProfileModalComponent', () => {
  let component: MyProfileModalComponent;
  let fixture: ComponentFixture<MyProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyProfileModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
