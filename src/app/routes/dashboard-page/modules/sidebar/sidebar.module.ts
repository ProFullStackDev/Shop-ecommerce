import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {ChallengeCardModule} from "@shared/components/challenge-card/challenge-card.module";
import {QrCodeCardModule} from "@shared/components/qr-code-card/qr-code-card.module";


@NgModule({
    declarations: [
        SidebarComponent
    ],
    exports: [
        SidebarComponent
    ],
  imports: [
    CommonModule,
    ChallengeCardModule,
    QrCodeCardModule
  ]
})
export class SidebarModule {}
