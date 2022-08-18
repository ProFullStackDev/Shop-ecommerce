import { TestBed } from '@angular/core/testing';

import { SkeletonService } from './skeleton.service';

describe('SkeletonService', () => {
  let service: SkeletonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkeletonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
