import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageModalComponent } from './components/language-modal/language-modal.component';
import {TyqoonIconsModule} from "@shared/modules/tyqoon-icons";
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    LanguageModalComponent
  ],
  imports: [
    CommonModule,
    TyqoonIconsModule,
    TranslateModule
  ]
})
export class LanguageModalModule { }
