import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadDirective } from './directives/download.directive';



@NgModule({
    declarations: [
        DownloadDirective
    ],
    exports: [
        DownloadDirective
    ],
    imports: [
        CommonModule
    ]
})
export class DownloadModule { }
