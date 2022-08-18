import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {CopyingDirective} from './directives/copying.directive';



@NgModule({
  declarations: [CopyingDirective],
  imports: [
    CommonModule
  ],
  exports: [CopyingDirective]
})
export class CopyingModule { }
