import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Params, Router } from '@angular/router';
import { SystemUserService } from '@core/system/system-user.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { WINDOW } from '@shared/helpers/window';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { ThemeService } from '@shared/services/theme-service/theme.service';
import { LANGUAGES_LIST } from '@shared/statics/languages-select/languages-select.static';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Observable } from 'rxjs/internal/Observable';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { DropdownItem, SelectType } from '../../../app-select/models/app-select.model';
import { NavBar } from '../../models/header.model';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent extends DestroySubscription implements OnInit, AfterViewInit, OnDestroy {
  navBar$: Observable<NavBar | null>;

  @Input() isConsole: boolean = false;
  @Input() isCategory: boolean = false;

  readonly languageList: DropdownItem[] = LANGUAGES_LIST;
  readonly selectType = SelectType;
  defaultLang: string | null;
  theme = true;
  isQrcodeScannerRendered = false;
  themeCheck: boolean;
  private html5QrcodeScanner: Html5QrcodeScanner;

  constructor(
    public readonly headerService: HeaderService,
    private readonly themeService: ThemeService,
    private readonly localStorageService: LocalStorageService,
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(WINDOW) protected readonly window: Window,
    private readonly router: Router,
    private readonly user: SystemUserService
  ) {
    super();
    this.defaultLang = localStorage.getItem('current-lang');
  }

  @HostListener('window:resize', [])
  onResize() {
    this.closeMenu();

    // this.dragMenu();
  }

  ngOnInit(): void {
    this.themeService.defaultTheme();
    this.themeService.themeCheck$.pipe(takeUntil(this.destroyStream$)).subscribe(val => {
      this.themeCheck = val;
    });

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        startWith(null),
        takeUntil(this.destroyStream$)
      )
      .subscribe(() => {
        this.closeMenu();
      });
    this.navBar$ = this.headerService.getNav();
    this.defaultTheme();
    this.setDefaultLang();
  }

  ngAfterViewInit() {
    this.html5QrcodeScanner = new Html5QrcodeScanner(
      'qr-scanner',
      {
        aspectRatio: undefined,
        disableFlip: false,
        experimentalFeatures: undefined,
        formatsToSupport: undefined,
        rememberLastUsedCamera: true,
        supportedScanTypes: [],
        videoConstraints: undefined,
        fps: 10,
        qrbox: 320
      },
      false
    );

    // this.dragMenu();
  }

  // @ts-ignore
  ngOnDestroy(): void {
    this.document.body.removeEventListener('touchstart', () => {});
    this.document.body.removeEventListener('touchmove', () => {});
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get cashback() {
    return this.user.cashBackData;
  }

  renderQRScanner() {
    return; // TODO disable it untill ssl will be implemented

    if (this.isQrcodeScannerRendered) {
      this.hideQrScanner();
    } else {
      this.html5QrcodeScanner.render(
        () => this.onSuccessQRScan(),
        () => {}
      );
      this.document.body.classList.add('stop-scroll');
      this.isQrcodeScannerRendered = true;
    }
  }

  onSuccessQRScan() {
    this.hideQrScanner();
  }

  hideQrScanner() {
    this.isQrcodeScannerRendered = false;
    this.document.body.classList.remove('stop-scroll');
    this.html5QrcodeScanner?.clear();
  }

  openMenu(): void {
    this.headerService.openMenu(this.isConsole);
    this.hideQrScanner();
  }

  closeMenu() {
    this.headerService.closeMenu();
    this.hideQrScanner();
  }

  toggleTheme(e: Event): void {
    this.themeService.toggleTheme(e);
  }

  dragMenu(): void {
    this.headerService.dragMenu();
  }

  defaultTheme() {
    return this.themeService.defaultTheme();
  }

  setLanguage(lang: string) {
    this.headerService.setLanguage(lang);
    window.location.reload();
  }

  toProfile() {
    this.headerService.toProfile();
  }

  nav(link: string[], params?: Params) {
    this.headerService.nav(link, params);
  }

  private setDefaultLang() {
    return this.headerService.setDefaultLang(this.languageList);
  }

  defaultAvatar = '/assets/images/avatar.jpg';

  get getAvatar() {
    const avatar = this.headerService.userInfo.avatar;
    return avatar ? avatar : this.defaultAvatar;
  }
}
