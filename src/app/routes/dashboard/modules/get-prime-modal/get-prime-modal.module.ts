import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GetPrimeModalComponent} from './components/get-prime-modal.component';
import {TyqoonIconsModule} from "@shared/modules/tyqoon-icons";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    GetPrimeModalComponent
  ],
  imports: [
    CommonModule,
    TyqoonIconsModule,
    ReactiveFormsModule,
    TranslateModule
  ]
})
export class GetPrimeModalModule {
}
