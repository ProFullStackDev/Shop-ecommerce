import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SendCreditsModalComponent } from './components/send-credits-modal/send-credits-modal.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SendCreditsModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SendCreditsModalModule { }
