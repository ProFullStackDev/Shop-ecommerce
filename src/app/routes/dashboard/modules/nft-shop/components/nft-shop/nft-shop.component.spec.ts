import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftShopComponent } from './nft-shop.component';

describe('NftShopComponent', () => {
  let component: NftShopComponent;
  let fixture: ComponentFixture<NftShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NftShopComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
