import { TestBed } from '@angular/core/testing';

import { BuildShopsService } from './build-shops.service';

describe('BuildShopsService', () => {
  let service: BuildShopsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuildShopsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
