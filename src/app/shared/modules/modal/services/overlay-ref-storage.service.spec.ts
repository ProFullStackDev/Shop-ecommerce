import {TestBed} from '@angular/core/testing';

import {OverlayRefStorageService} from './overlay-ref-storage.service';

describe('OverlayRefStorageService', () => {
  let service: OverlayRefStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayRefStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
