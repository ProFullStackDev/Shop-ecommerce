import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { I18NService } from '@core';
import { SystemUserService } from '@core/system/system-user.service';
import { DropdownItem } from '@shared/components/app-select/models/app-select.model';
import { AccountMenuComponent } from '@shared/components/header/modules/account-menu/components/account-menu/account-menu.component';
import { MobileMenuComponent } from '@shared/components/header/modules/mobile-menu/components/mobile-menu.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { WINDOW } from '@shared/helpers/window';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { Observable, EMPTY, of, Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { NAV_BAR } from '../../../../mock/header.mock';
import { NavBar } from '../models/header.model';

@Injectable()
export class HeaderService extends DestroySubscription {
  activeItem: DropdownItem;
  themeCheck = true;
  closeMenuTrigger$ = new Subject();

  get userInfo() {
    return this.userService.userInfo;
  }

  get isLogin(): boolean {
    return !!this.userInfo && Object.keys(this.userInfo).length > 0;
  }

  get isPrime() {
    return this.userService.userData?.vipLevel > 0;
  }

  constructor(
    private readonly localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(WINDOW) protected readonly window: Window,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private readonly i18: I18NService,
    private userService: SystemUserService,
    private router: Router
  ) {
    super();
  }

  getNav(): Observable<NavBar> {
    // TODO: return http request when backend will be ready
    return of(NAV_BAR);
  }

  openMenu(isConsole?: boolean): void {
    this.document.querySelector('html')?.classList.remove('menu-opened');
    this.document.querySelector('html')?.classList.remove('cdk-global-scrollblock');
    this.document.body.classList.remove('menu-close');
    this.document.querySelector('html')?.classList.add('menu-opened');
    const header = this.document.querySelector('app-header');
    header?.classList.add('sticky');
    header?.classList.remove('scroll-top');
    setTimeout(() => {
      header?.classList.add('sticky');
      header?.classList.remove('scroll-top');
      this.document.querySelector('html')?.classList.add('menu-opened');
    }, 0);
    this.openModal(MobileMenuComponent, isConsole)
      ?.pipe(takeUntil(this.destroyStream$))
      .subscribe(() => {
        this.closeMenu();
        this.document.body.classList.add('menu-close');
        setTimeout(() => {
          this.document.body.classList.remove('menu-close');
          this.document.querySelector('html')?.classList.remove('menu-opened');
        }, 500);
      });
    this.document.body.classList.add('menu-open');
  }

  openAccountMenu(isConsole?: boolean): void {
    this.document.querySelector('html')?.classList.remove('menu-opened');
    this.document.querySelector('html')?.classList.remove('cdk-global-scrollblock');
    this.document.body.classList.remove('menu-close');
    this.document.querySelector('html')?.classList.add('menu-opened');
    setTimeout(() => {
      if (this.document.body.classList.contains('menu-close')) {
        return;
      }
      this.document.body.classList.add('account-menu-open');
    }, 0);
    const header = this.document.querySelector('app-header');
    header?.classList.add('sticky');
    header?.classList.remove('scroll-top');
    setTimeout(() => {
      header?.classList.add('sticky');
      header?.classList.remove('scroll-top');
      this.document.querySelector('html')?.classList.add('menu-opened');
    }, 0);
    this.openModal(AccountMenuComponent, isConsole, 'account-menu')
      ?.pipe(takeUntil(this.destroyStream$))
      .subscribe(() => {
        this.closeMenu();
        this.document.body.classList.add('menu-close');
        setTimeout(() => {
          this.document.body.classList.remove('menu-close');
          this.document.querySelector('html')?.classList.remove('menu-opened');
        }, 500);
      });
    this.document.body.classList.add('account-menu-open');
  }

  openModal(component: any, isConsole?: boolean, accountMenu?: string): Observable<any> | null {
    const ref = this.overlayService.open(
      component,
      {
        isConsole: isConsole
      },
      {
        backdropClass: ['modal-menu-overlay'],
        panelClass: ['modal-menu', accountMenu ? accountMenu : ''],
        disposeOnNavigation: true
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  closeMenu() {
    this.document.body.classList.remove('account-menu-open');
    this.document.body.classList.remove('menu-open');
    this.document.body.classList.remove('open');
    this.closeMenuTrigger$.next(true);
  }

  dragMenu(): void {
    if (this.window.innerWidth >= 993) {
      return;
    }

    // @ts-ignore
    let xDown = null;
    // @ts-ignore
    let yDown = null;

    this.document.body.addEventListener('touchstart', e => {
      e.stopPropagation();
      if (this.document.body.classList.contains('open') && !this.document.body.classList.contains('menu-open')) {
        return;
      }

      xDown = e.touches[0].clientX;
      yDown = e.touches[0].clientY;
    });

    this.document.body.addEventListener('touchmove', e => {
      e.stopPropagation();
      if (this.document.body.classList.contains('open') && !this.document.body.classList.contains('menu-open')) {
        return;
      }

      const xUp = e.touches[0].clientX;

      const yUp = e.touches[0].clientY;
      // @ts-ignore
      const xDiff = xDown - xUp;
      // @ts-ignore
      const yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff < 0) {
          this.openMenu();
        }

        if (xDiff > 0) {
          this.closeMenu();
        }
      }
    });
  }

  toggleTheme(e: Event): void {
    e.stopPropagation();

    if (this.localStorageService.getItem('theme') === 'theme-dark') {
      this.setTheme('theme-light');
    } else {
      this.setTheme('theme-dark');
    }
  }

  setTheme(themeName: string): void {
    this.localStorageService.setItem('theme', themeName);
    this.document.getElementsByTagName('html')[0].className = themeName;
  }

  defaultTheme(): void {
    if (this.localStorageService.getItem('theme') === 'theme-dark') {
      this.document.getElementsByTagName('html')[0].classList.remove('theme-light');
      this.document.getElementsByTagName('html')[0].classList.add('theme-dark');
      this.themeCheck = false;
    } else {
      this.document.getElementsByTagName('html')[0].classList.remove('theme-dark');
      this.document.getElementsByTagName('html')[0].classList.add('theme-light');
      this.themeCheck = true;
    }
  }

  // TODO: will be return in future
  // dragMenu(): void {
  // 	if (this.window.innerWidth >= 993) {
  // 		return;
  // 	}
  //
  // 	// @ts-ignore
  // 	let xDown = null;
  // 	// @ts-ignore
  // 	let yDown = null;
  //
  // 	this.document.body.addEventListener('touchstart', (e) => {
  // 		xDown = e.touches[0].clientX;
  // 		yDown = e.touches[0].clientY;
  // 	});
  //
  // 	this.document.body.addEventListener('touchmove', (e) => {
  // 		const xUp = e.touches[0].clientX;
  //
  // 		const yUp = e.touches[0].clientY;
  // 		// @ts-ignore
  // 		const xDiff = xDown - xUp;
  // 		// @ts-ignore
  // 		const yDiff = yDown - yUp;
  //
  // 		if (Math.abs(xDiff) > Math.abs(yDiff)) {
  // 			if (xDiff < 0) {
  // 				this.openMenu();
  // 			}
  //
  // 			if (xDiff > 0) {
  // 				this.closeMenu();
  // 			}
  // 		}
  // 	});
  // }

  logOut(): void {
    this.userService.logout();
  }

  setLanguage(lang: string) {
    this.i18.use(lang, {});
  }

  toProfile() {
    this.router.navigate(['/member']);
  }

  nav(link: string[], params?: Params) {
    this.router.navigate(link, { queryParams: params });
  }

  setDefaultLang(languageList: DropdownItem[]): void {
    const chosenLang = this.localStorageService.getItem('current-lang');
    const defaultLang = languageList.find(item => item);
    const langFromStorage = languageList.find(item => item.lang === chosenLang);
    const currentLang = langFromStorage ? langFromStorage : defaultLang;
    if (currentLang) {
      this.activeItem = new DropdownItem(currentLang.id, currentLang.icon, currentLang.currency, currentLang.lang, currentLang.text);
    }
  }
}
