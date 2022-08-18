import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MissionsComponent } from './components/missions/missions.component';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    MissionsComponent
  ],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class MissionsModule { }
