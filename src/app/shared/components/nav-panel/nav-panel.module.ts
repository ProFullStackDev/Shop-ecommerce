import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavPanelComponent } from './components/nav-panel/nav-panel.component';
import {ProductCategoriesModule} from "./modules/product-categories/product-categories.module";
import {PagesNavModule} from "./modules/pages-nav/pages-nav.module";
import {NavPanelService} from "./services/nav-panel.service";
import {TyqoonIconsModule} from "../../modules/tyqoon-icons";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    NavPanelComponent
  ],
  exports: [
    NavPanelComponent
  ],
    imports: [
        CommonModule,
        ProductCategoriesModule,
        PagesNavModule,
        TyqoonIconsModule,
        RouterModule,
        TranslateModule
    ],
  providers: [
    NavPanelService
  ]
})
export class NavPanelModule {
}
