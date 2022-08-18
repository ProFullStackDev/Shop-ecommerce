import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftDetailsComponent } from './nft-details.component';

describe('NftDetailsComponent', () => {
  let component: NftDetailsComponent;
  let fixture: ComponentFixture<NftDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
