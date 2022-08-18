import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Injectable()
export class PlatformBrowserService {

  get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
  }

}
