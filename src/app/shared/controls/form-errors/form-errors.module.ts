import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { ControlErrorsDirective } from './directives/control-errors.directive';

@NgModule({
	declarations: [ControlErrorComponent, ControlErrorsDirective],
	imports: [CommonModule],
	exports: [ControlErrorsDirective]
})
export class FormErrorsModule {}
