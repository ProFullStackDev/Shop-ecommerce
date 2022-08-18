import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopBasketComponent} from './components/shop-basket/shop-basket.component';
import {TyqoonIconsModule} from "../../../../modules/tyqoon-icons";
import {ShopBasketService} from "./services/shop-basket.service";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {NzSkeletonModule} from "ng-zorro-antd/skeleton";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    ShopBasketComponent
  ],
  exports: [
    ShopBasketComponent
  ],
    imports: [
        CommonModule,
        TyqoonIconsModule,
        NzEmptyModule,
        NzSkeletonModule,
        RouterModule,
        TranslateModule
    ],
  providers: [
    ShopBasketService
  ]
})
export class ShopBasketModule {
}
