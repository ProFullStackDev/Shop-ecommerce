import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TyqoonDollarsComponent } from './components/tyqoon-dollars/tyqoon-dollars.component';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    TyqoonDollarsComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class TyqoonDollarsModule { }
