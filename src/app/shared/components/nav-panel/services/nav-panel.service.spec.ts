import { TestBed } from '@angular/core/testing';

import { NavPanelService } from './nav-panel.service';

describe('NavPanelService', () => {
  let service: NavPanelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavPanelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
