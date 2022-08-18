import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PagesList } from '../../../../models/nav-panel.model';

@Component({
  selector: 'app-pages-nav',
  templateUrl: './pages-nav.component.html',
  styleUrls: ['./pages-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesNavComponent implements OnInit {
  @Input() pagesList: PagesList[] | null;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  isLinkActive(url: string): boolean {
    const queryParamsIndex = this.router.url.indexOf('?');
    if (!queryParamsIndex) {
      return false;
    }
    const baseUrl = queryParamsIndex === -1 ? this.router.url : this.router.url.slice(0, queryParamsIndex);
    return baseUrl === url;
  }
}
