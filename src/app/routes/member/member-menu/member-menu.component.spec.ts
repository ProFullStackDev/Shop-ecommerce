import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMenuComponent } from './member-menu.component';

describe('MemberMenuComponent', () => {
  let component: MemberMenuComponent;
  let fixture: ComponentFixture<MemberMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MemberMenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
