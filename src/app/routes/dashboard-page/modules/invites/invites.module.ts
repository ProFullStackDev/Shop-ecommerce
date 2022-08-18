import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitesComponent } from './components/invites/invites.component';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
    declarations: [
        InvitesComponent
    ],
    exports: [
        InvitesComponent
    ],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class InvitesModule { }
