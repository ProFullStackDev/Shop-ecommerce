import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppSelectComponent } from './components/app-select/app-select.component';
import {TyqoonIconsModule} from "../../modules/tyqoon-icons";

@NgModule({
  declarations: [AppSelectComponent],
  exports: [AppSelectComponent],
  imports: [CommonModule, TyqoonIconsModule]
})
export class AppSelectModule {
}
