import { TestBed } from '@angular/core/testing';

import { PlatformMobileService } from './platform-mobile.service';

describe('PlatformMobileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlatformMobileService = TestBed.get(PlatformMobileService);
    expect(service).toBeTruthy();
  });
});
