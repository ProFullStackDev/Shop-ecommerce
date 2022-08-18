import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NavBarList } from '@shared/components/header/models/header.model';
import { HeaderService } from '@shared/components/header/services/header.service';

import { NAV_BAR_LIST, NAV_BAR_LIST_MOB } from '../../../../../../mock/header.mock';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit {
  @ViewChild('list') list: ElementRef;

  navLinksList: NavBarList[];

  constructor(public readonly headerService: HeaderService) {}

  ngOnInit(): void {
    this.switchMenu();
  }

  logOut(): void {
    this.headerService.logOut();
  }

  focusOut(): void {
    this.list.nativeElement.parentElement.parentElement.parentElement.parentElement.style.pointerEvents = 'none';

    setTimeout(() => {
      this.list.nativeElement.parentElement.parentElement.parentElement.parentElement.style.pointerEvents = 'all';
    }, 1);
  }

  @HostListener('window:resize')
  switchMenu(): void {
    this.navLinksList = innerWidth > 992 ? NAV_BAR_LIST : NAV_BAR_LIST_MOB;
  }
}
