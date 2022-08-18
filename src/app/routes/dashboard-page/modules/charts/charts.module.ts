import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsComponent } from './components/charts/charts.component';
import { PointsComponent } from './components/charts/points/points.component';
import { TokensComponent } from './components/charts/tokens/tokens.component';
import {TyqoonIconsModule} from "@shared/modules/tyqoon-icons";
import {TyqoonIconRegistryService} from "@shared/modules/tyqoon-icons/services/tyqoon-icon-registry.service";
import {arrowUpIcon, tooltipIcon, walletIcon} from "@shared/modules/tyqoon-icons/tyqoon-icons";
import {NgApexchartsModule} from "ng-apexcharts";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    declarations: [
        ChartsComponent,
        PointsComponent,
        TokensComponent
    ],
    exports: [
        ChartsComponent
    ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    TyqoonIconsModule,
    TranslateModule
  ]
})
export class ChartsModule {
  constructor(private readonly t: TyqoonIconRegistryService) {
    this.t.registryIcons([tooltipIcon, walletIcon, arrowUpIcon]);
  }
}
