import { DOCUMENT, LocationStrategy } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnDestroy,
  OnInit,
  OnChanges,
  SimpleChanges,
  Optional,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { AdPositionEnum } from '@core/services/common.service';
import { EmService } from '@core/system/customerService/em.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { WINDOW } from '@shared/helpers/window';
import { NavigationBar } from '@shared/models/navigation-bar.model';
import { NAVIGATION_BAR } from '@shared/statics/navigation-bar/navigation-bar.static';
import { filter, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends DestroySubscription implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  readonly navigationBar: NavigationBar[] = NAVIGATION_BAR;
  title = 'Tyqoon';
  isNav = false;

  private scrollPos = 0;
  layoutTopAdPosition = AdPositionEnum.LAYOUT_TOP_AD;
  isAd: boolean;
  adHidden: boolean;

  isCategory: boolean;
  isMember: boolean;
  isConsole: boolean;
  isFooter: boolean;
  isMobile: boolean;

  constructor(
    private readonly renderer: Renderer2,
    private meta: Meta,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject(DOCUMENT) private readonly document: Document,
    @Inject(WINDOW) protected readonly window: Window,
    private readonly router: Router,
    private readonly url: LocationStrategy,
    private customSrv: EmService,
    private readonly user: SystemUserService
  ) {
    super();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = window.innerWidth <= 992;
    this.isMember = this.url.path().includes('member');
  }

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 992;
    this.onScroll();
    this.setOGImage();
    this.customSrv.getScript();
    this.customSrv.load(this.user.userInfo);
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        startWith(null),
        takeUntil(this.destroyStream$)
      )
      .subscribe(() => {
        this.window.scrollTo(0, 0);
        this.isAd = this.url.path() === '/';
        this.isCategory = this.url.path() === '/';
        this.isMember = this.url.path().includes('member');
        this.isConsole = this.url.path() === '/gameboard' || this.url.path() === '/dashboard';
        this.isFooter = this.url.path() !== '/gameboard';
        const isOrdersList =
          this.url.path() === '/member/order/list' || this.url.path().includes('/product/detail') || this.url.path().includes('/register');

        if (isOrdersList) {
          this.document.querySelector('app-root')?.classList.add('fix-height');
        } else {
          this.document.querySelector('app-root')?.classList.remove('fix-height');
        }

        // TODO: Hide Skeleton Loading
        // this.renderer.addClass(this.document.body, 'loading');
        // this.toggleSkeleton();

        const navigationAccessUrls = ['/', '/product/detail', '/product/search', '/member/my-favorites/list', '/member/point'];
        const navUrl = navigationAccessUrls.find(item => item === this.window.location.pathname)?.link;
        this.isNav = !!navUrl;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngAfterViewInit() {
    // console.log('查看cookies', this.window.document.cookie);
  }

  //@ts-ignore
  ngOnDestroy(): void {
    this.window.removeEventListener('scroll', () => {});
  }

  /**
   * close advertising
   */
  closeAd(): void {
    this.adHidden = true;
  }
  private toggleSkeleton(): void {
    setTimeout(() => {
      this.renderer.addClass(this.document.body, 'fade-in');
    }, 1500);

    setTimeout(() => {
      this.renderer.removeClass(this.document.body, 'fade-in');
      this.renderer.removeClass(this.document.body, 'loading');
    }, 2000);
  }

  private setOGImage(): void {
    const content = `${this.document.location.origin}/assets/images/tyqoon-share-image.png`;
    this.meta.updateTag({ property: 'og:image', content });
    this.meta.updateTag({ name: 'twitter:image', content });
  }

  private onScroll(): void {
    this.window.addEventListener('scroll', () => {
      const document = this.document;
      const header = this.document.querySelector('app-header');

      if (this.document.body.getBoundingClientRect().top > this.scrollPos && this.window.scrollY > 300) {
        if (this.router.url === '/') {
          document.querySelector('body app-product-categories')?.classList.remove('home-page-categories-head');
        }
        header?.classList.add('sticky');
        header?.classList.remove('scroll-top');
      } else {
        if (this.router.url === '/') {
          document.querySelector('body app-product-categories')?.classList.add('home-page-categories-head');
        }
        if (document.querySelector('html')?.classList.contains('menu-opened')) {
          return;
        }
        header?.classList.remove('sticky');
        header?.classList.add('scroll-top');
      }

      this.scrollPos = this.document.body.getBoundingClientRect().top;
    });
  }
}
