import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSelectComponent } from './components/form-select/form-select.component';
import {TyqoonIconsModule} from "../../modules/tyqoon-icons";

@NgModule({
	declarations: [FormSelectComponent],
	exports: [FormSelectComponent],
  imports: [CommonModule, TyqoonIconsModule]
})
export class FormSelectModule {
}
