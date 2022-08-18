import {PLATFORM_ID} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {PlatformBrowserService} from '.';


const PLATFORM_BROWSER_ID = 'browser';
const PLATFORM_SERVER_ID = 'server';

describe('BrowserService for browser', () => {
  let service: PlatformBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformBrowserService,
        { provide: PLATFORM_ID, useValue: PLATFORM_BROWSER_ID }
      ]
    });

    service = TestBed.get(PlatformBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#isBrowser should return true', () => {
    expect(service.isBrowser).toBeTruthy();
  });

});

describe('BrowserService for server', () => {
  let service: PlatformBrowserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlatformBrowserService,
        { provide: PLATFORM_ID, useValue: PLATFORM_SERVER_ID }
      ]
    });

    service = TestBed.get(PlatformBrowserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#isBrowser should return false', () => {
    expect(service.isBrowser).toBeFalsy();
  });

});
