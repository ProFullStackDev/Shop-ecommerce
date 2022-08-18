import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesComponent } from './components/messages/messages.component';
import {TranslateModule} from "@ngx-translate/core";



@NgModule({
  declarations: [
    MessagesComponent
  ],
    imports: [
        CommonModule,
        TranslateModule
    ]
})
export class MessagesModule { }
