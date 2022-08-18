import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-loading-status',
  template: `<div class="data-loading br-bot-12 custom">
    <div *ngIf="loading; else noLoadingRef" class="search-products-search-wrap">
      <div class="search-products-search">
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <span class="ant-spin-text">{{ loadingText }}</span>
    </div>
    <ng-template #noLoadingRef>
      <nz-empty style="margin-top: 15vh" *ngIf="empty; else noMoreRef" [nzNotFoundContent]="emptyText"></nz-empty>
      <ng-template #noMoreRef>
        <span class="text-gray" *ngIf="noMore; else pullLoadMoreRef">{{ noMoreText }}</span>
        <ng-template #pullLoadMoreRef>
          <span class="text-gray">{{ pullLoadMoreText }}</span>
        </ng-template>
      </ng-template>
    </ng-template>
  </div>`,
  styles: [
    `
      .data-loading {
        text-align: center;
        margin: 8px 0;
      }
    `
  ]
})
export class DataLoadingStatusComponent {
  constructor() {}

  @Input() noMore: boolean = false;
  @Input() empty: boolean = false;
  @Input() noMoreText: string = '-- 没有更多了 --';
  @Input() loading: boolean = false;
  @Input() loadingText: string = '加载中...';
  @Input() emptyText: string = '暂无数据';
  @Input() pullLoadMoreText: string = '下拉加载更多';
}
