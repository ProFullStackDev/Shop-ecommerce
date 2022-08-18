import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { SharedModule } from '@shared/shared.module';
import { HeaderModule } from '@shared/components/header/header.module';
import { TyqoonIconRegistryService } from '@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import {
	anquanbaozhangIcon,
	arrowDownIcon,
	arrowRightIcon,
	burgerMenuIcon,
	cameraIcon,
	cameraSmallIcon,
	chFlagIcon,
  chHgFlagIcon,
	closeMenuIcon,
	crossIcon,
	crownIcon,
	diamondIcon,
	discordSocialIcon,
	envelopeIcon,
	facebookSocialIcon,
	flowerIcon,
	franchiseAnimatedIcon,
	gbFlagIcon,
	giftIcon,
	instagramSocialIcon,
	listIcon,
	logoIcon,
  logoMobIcon,
	mailSocialIcon,
	mallAnimatedIcon,
	mallBuildAnimatedIcon,
	mobileBasketIcon,
	qrSocialIcon,
	scanIcon,
	searchIcon,
	shopAnimatedIcon,
	shopBasketIcon,
	smsSocialIcon,
	smthIcon,
	supermarketAnimatedIcon,
	tabletIcon,
	telegramSocialIcon,
	twitterSocialIcon,
	wechatSocialIcon,
	whatsappSocialIcon,
	withdrawIcon
} from '@shared/modules/tyqoon-icons/tyqoon-icons';

@NgModule({
	declarations: [DashboardLayoutComponent],
	imports: [CommonModule, SharedModule, HeaderModule]
})
export class DashboardLayoutModule {
	static forRoot(): ModuleWithProviders<DashboardLayoutModule> {
		return {
			ngModule: DashboardLayoutModule,
			providers: [TyqoonIconRegistryService]
		};
	}

	constructor(private readonly t: TyqoonIconRegistryService) {
		this.t.registryIcons([
			envelopeIcon,
			crownIcon,
			facebookSocialIcon,
			twitterSocialIcon,
			instagramSocialIcon,
			discordSocialIcon,
			telegramSocialIcon,
			wechatSocialIcon,
			whatsappSocialIcon,
			mailSocialIcon,
			smsSocialIcon,
			qrSocialIcon,
			crossIcon,
			withdrawIcon,
			burgerMenuIcon,
			scanIcon,
			mobileBasketIcon,
			closeMenuIcon,
			gbFlagIcon,
			chFlagIcon,
      chHgFlagIcon,
			arrowDownIcon,
			arrowDownIcon,
			shopBasketIcon,
			arrowDownIcon,
			cameraIcon,
			tabletIcon,
			cameraSmallIcon,
			smthIcon,
			diamondIcon,
			giftIcon,
			flowerIcon,
			searchIcon,
			listIcon,
			anquanbaozhangIcon,
			arrowRightIcon,
			logoIcon,
      logoMobIcon,
			mallAnimatedIcon,
			shopAnimatedIcon,
			franchiseAnimatedIcon,
			supermarketAnimatedIcon,
			mallBuildAnimatedIcon
		]);
	}
}
