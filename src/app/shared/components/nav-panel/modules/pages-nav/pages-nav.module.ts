import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesNavComponent } from './components/pages-nav/pages-nav.component';
import {TranslateModule} from "@ngx-translate/core";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        PagesNavComponent
    ],
    exports: [
        PagesNavComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule
    ]
})
export class PagesNavModule { }
