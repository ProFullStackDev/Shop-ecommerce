import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { TyqoonIconRegistryService } from '@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service';
import { walletIcon, heartIcon, houseIcon, userIcon } from '@shared/modules/tyqoon-icons/tyqoon-icons';
import { TyqoonIconsModule } from '@shared/modules/tyqoon-icons';
import { RouterModule } from '@angular/router';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
	declarations: [NavigationBarComponent],
	exports: [NavigationBarComponent],
  imports: [CommonModule, TyqoonIconsModule, RouterModule, TranslateModule]
})
export class NavigationBarModule {
	constructor(private readonly t: TyqoonIconRegistryService) {
		this.t.registryIcons([houseIcon, heartIcon, walletIcon, userIcon]);
	}
}
