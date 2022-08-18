import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

import { LogoComponent } from './logo/logo.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {TyqoonIconsModule} from "@shared/modules/tyqoon-icons";

@NgModule({
  declarations: [LogoComponent, SearchBoxComponent, ShoppingCartComponent],
    imports: [CommonModule, SharedModule, TyqoonIconsModule],
  exports: [LogoComponent, SearchBoxComponent, ShoppingCartComponent]
})
export class LayoutHeaderToolsModule {}
