import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import { NavBar } from "../../../../models/header.model";

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderNavComponent {
  @Input() navBar: NavBar | null;
}
