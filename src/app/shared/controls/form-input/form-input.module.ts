import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormErrorsModule } from '../form-errors';
import {TyqoonIconsModule} from "../../modules/tyqoon-icons";

@NgModule({
	declarations: [FormInputComponent],
	exports: [FormInputComponent],
  imports: [CommonModule, FormErrorsModule, TyqoonIconsModule]
})
export class FormInputModule {
}
