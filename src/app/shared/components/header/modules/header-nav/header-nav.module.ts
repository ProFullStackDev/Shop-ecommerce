import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import {TyqoonIconsModule} from "../../../../modules/tyqoon-icons";



@NgModule({
  declarations: [
    HeaderNavComponent
  ],
  exports: [
    HeaderNavComponent
  ],
  imports: [
    CommonModule,
    TyqoonIconsModule
  ]
})
export class HeaderNavModule {
}
