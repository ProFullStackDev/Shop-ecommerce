import {Injectable} from '@angular/core';
import {PlatformBrowserService} from '..';

@Injectable()
export class PlatformMobileService {

  get isMobile(): boolean {
    if (this.browserService.isBrowser) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    return false;
  }

  constructor(
    private readonly browserService: PlatformBrowserService,
  ) {
  }
}
