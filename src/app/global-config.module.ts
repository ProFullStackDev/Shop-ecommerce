/* eslint-disable import/order */
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { DelonACLModule } from '@delon/acl';
import { AlainThemeModule } from '@delon/theme';
import { AlainConfig, ALAIN_CONFIG } from '@delon/util/config';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { throwIfAlreadyLoaded } from '@core';

// Please refer to: https://ng-alain.com/docs/global-config
// #region NG-ALAIN Config

export const alainConfig: AlainConfig = {
  auth: {
    store_key: '_tyqoon_web_token',
    login_url: '/login',
    token_invalid_redirect: true,
    token_send_key: 'token',
    ignores: [/\/*/]
  }
};

const alainModules: any[] = [AlainThemeModule.forRoot(), DelonACLModule.forRoot()];
const alainProvides = [{ provide: ALAIN_CONFIG, useValue: alainConfig }];

// Please refer to: https://ng.ant.design/docs/global-config/en#how-to-use
// #region NG-ZORRO Config

const ngZorroConfig: NzConfig = {
  message: {
    nzMaxStack: 1
  }
};

const zorroProvides = [{ provide: NZ_CONFIG, useValue: ngZorroConfig }];

// #endregion

@NgModule({
  imports: [...alainModules]
})
export class GlobalConfigModule {
  constructor(@Optional() @SkipSelf() parentModule: GlobalConfigModule) {
    throwIfAlreadyLoaded(parentModule, 'GlobalConfigModule');
  }

  static forRoot(): ModuleWithProviders<GlobalConfigModule> {
    return {
      ngModule: GlobalConfigModule,
      providers: [...alainProvides, ...zorroProvides]
    };
  }
}
