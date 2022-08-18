import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokensComponent } from './components/tokens/tokens.component';
import {TyqoonIconsModule} from "@shared/modules/tyqoon-icons";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TokensComponent
  ],
  imports: [
    CommonModule,
    TyqoonIconsModule,
    ReactiveFormsModule
  ]
})
export class TokensModule { }
