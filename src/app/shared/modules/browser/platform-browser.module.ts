import { ModuleWithProviders, NgModule, Optional, PLATFORM_ID, SkipSelf } from '@angular/core';
import { PlatformBrowserService } from './platform-browser.service';

export function browserServiceFactory(platformId: object): PlatformBrowserService {
	return new PlatformBrowserService(platformId);
}

@NgModule()
export class PlatformBrowserModule {
	constructor(@Optional() @SkipSelf() parentModule: PlatformBrowserModule) {
		if (parentModule) {
			throw new Error('BrowserModule module should be imported only in CoreModule.');
		}
	}

	public static forRoot(): ModuleWithProviders<PlatformBrowserModule> {
		return {
			ngModule: PlatformBrowserModule,
			providers: [
				{
					provide: PlatformBrowserService,
					useFactory: browserServiceFactory,
					deps: [PLATFORM_ID]
				}
			]
		};
	}
}
