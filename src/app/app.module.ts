import { isPlatformBrowser, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import zh from '@angular/common/locales/zh';
import { DEFAULT_CURRENCY_CODE, Inject, LOCALE_ID, NgModule, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DefaultInterceptor } from '@core';
import { LocalStorageEnum } from '@core/enum/localStorage';
import { CustomLoader } from '@core/i18n/custom-loader';
import { DelonAuthModule, SimpleInterceptor } from '@delon/auth';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { RoutesModule } from '@routes/routes.modules';
import { HeaderModule } from '@shared/components/header/header.module';
import { LayoutFooterModule } from '@shared/components/layout/layout-footer/layout-footer.module';
import { NavigationBarModule } from '@shared/components/navigation-bar/navigation-bar.module';
import { ShopAdModule } from '@shared/components/shop-ad/shop-ad.module';
import { ScrollControlsComponent } from '@shared/directive/scroll-controls/components/scroll-controls/scroll-controls.component';
import { AuthGuard } from '@shared/guards/auth.guard';
import { LoaderInterceptor } from '@shared/inteceptors/loader.interceptor';
import { PlatformBrowserModule } from '@shared/modules/browser';
import { ModalModule } from '@shared/modules/modal/modal.module';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { zh_CN, en_US, NZ_I18N, NzI18nModule, zh_CN as zorroZhCN } from 'ng-zorro-antd/i18n';
import { NzIconService } from 'ng-zorro-antd/icon';

import { AppComponent } from './app.component';
import { GlobalConfigModule } from './global-config.module';

registerLocaleData(zh, zorroZhCN);

@NgModule({
  declarations: [AppComponent, ScrollControlsComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    RouterModule,
    RoutesModule,
    FormsModule,
    HttpClientModule,
    NzI18nModule,
    DelonAuthModule,
    ModalModule,
    PlatformBrowserModule.forRoot(),
    GlobalConfigModule.forRoot(),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: CustomLoader, deps: [HttpClient] }
    }),
    HeaderModule,
    ShopAdModule,
    NavigationBarModule,
    LayoutFooterModule,
    TyqoonIconsModule
  ],
  providers: [
    AuthGuard,
    { provide: DEFAULT_CURRENCY_CODE, useValue: '￥' },
    {
      provide: LOCALE_ID,
      useFactory: (platformId: Object) => {
        let localId: any;
        // @ts-ignore
        if (isPlatformBrowser(platformId)) {
          localId = localStorage.getItem('current-lang');
        } else {
          localId = 'zh';
        }
        return localId;
      },
      deps: [PLATFORM_ID]
    },
    {
      provide: NZ_I18N,
      useFactory: (localId: string) => {
        switch (localId) {
          case 'en':
            return en_US;
          case 'zh':
            return zh_CN;
          case 'cn-TR':
            return zorroZhCN;
          default:
            return zh_CN;
        }
      },
      deps: [LOCALE_ID]
    },
    { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private nzIconService: NzIconService) {
    this.nzIconService.fetchFromIconfont({ scriptUrl: '//at.alicdn.com/t/font_3286885_iwy1n6u5mic.js' });
  }
}
