import { Component } from '@angular/core';
import { SystemRouterService } from '@core/system/system-router.service';
import { isNullOrUndefinedOrEmpty } from '@shared/utils/utils';

@Component({
  selector: 'app-search-box',
  template: `
    <nz-input-group class="search-box" nzSearch [nzAddOnAfter]="suffixButton">
      <input [(ngModel)]="name" type="text" nz-input placeholder="商品" (keyup.enter)="search()" />
    </nz-input-group>
    <ng-template #nzPrefix>
      <nz-select [ngModel]="searchType">
        <nz-option *ngFor="let searchType of searchTypeList" [nzLabel]="searchType.label" [nzValue]="searchType.value"></nz-option>
      </nz-select>
    </ng-template>
    <ng-template #suffixButton>
      <button nz-button nzType="primary" nzSearch (click)="search()">搜索</button>
    </ng-template>
  `,
  styleUrls: ['./search-box.component.less']
})
export class SearchBoxComponent {
  constructor(private router: SystemRouterService) {}

  searchType = 1;
  name = '';
  searchTypeList = [
    {
      label: '商品',
      value: 1
    },
    {
      label: '店铺',
      value: 2
    }
  ];

  hotSearchList = [
    {
      text: '苹果',
      link: ''
    },
    {
      text: '三星',
      link: ''
    },
    {
      text: '索尼',
      link: ''
    },
    {
      text: '华为',
      link: ''
    },
    {
      text: '魅族',
      link: ''
    },
    {
      text: '佳能',
      link: ''
    },
    {
      text: '小米',
      link: ''
    },
    {
      text: '美的',
      link: ''
    },
    {
      text: '格力',
      link: ''
    }
  ];

  search() {
    if (isNullOrUndefinedOrEmpty(this.name)) return;
    this.router.navigateToProductSearch({ name: this.name });
  }
}
