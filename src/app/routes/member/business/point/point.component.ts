import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserOrderService } from '@core/services/user/order.service';
import { WalletService } from '@core/services/user/wallet.service';
import { SystemUserService } from '@core/system/system-user.service';
import { ShareCodeModalComponent } from '@shared/components/payment-modals/modules/share-code-modal/components/share-code-modal/share-code-modal.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import * as moment from 'moment';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { EMPTY, Observable } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.less'],
  providers: [UserOrderService]
})
export class PointComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollingContainer') scrollingContainer: ElementRef;

  tabIndex = 0;
  isDateOpened: boolean = false;
  page = 1;
  rows = 10;
  total = 0;

  isTableStartPosition = false;
  constructor(
    public orderSrv: UserOrderService,
    private walletService: WalletService,
    private readonly overlayService: OverlayService,
    private user: SystemUserService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    const { tabIndex } = activatedRoute.snapshot.queryParams;
    this.tabIndex = tabIndex || 0;
    this.tabChange({ index: this.tabIndex } as NzTabChangeEvent);
  }
  inputDat: boolean = false;

  blanceDataListAll: any[] = [];
  blanceDataListIncome: any[] = [];
  blanceDataListExpend: any[] = [];
  loading = {
    query: false,
    cancellationOrder: false,
    confirmReceipt: false
  };
  giftCodesAll: any[] = [];
  type: string = '';
  beginTime: string = '';
  endTime: string = '';

  get memberInfo() {
    return this.user.userInfo;
  }

  ngOnInit(): void {
    this.user.updateUserInfo();
  }
  getList(type: string): void {
    this.type = type;
    const params = {
      page: 0,
      rows: 10,
      type: this.type
    };
    this.walletService
      .point(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.blanceDataListAll = res.rows;
      });
  }
  search(): void {
    const params = {
      page: 0,
      rows: 10,
      beginTime: this.beginTime ? moment(this.beginTime).format('YYYY-MM-DD') : '',
      endTime: this.endTime ? moment(this.endTime).format('YYYY-MM-DD') : '',
      type: this.type
    };
    this.walletService
      .point(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.blanceDataListAll = res.rows;
      });
  }

  getExchangeCode() {
    this.orderSrv.getExchangeCode(this.endTime, this.page, this.rows);
  }

  tabChange(event: NzTabChangeEvent) {
    switch (Number(event.index)) {
      case 0:
        this.getList('');
        break;
      case 1:
        this.getList('credit');
        break;
      case 2:
        this.getList('debit');
        break;
      case 3:
        this.getExchangeCode();
        break;
    }
  }

  pageIndexChange() {
    this.getExchangeCode();
  }

  pageSizeChange() {
    this.page = 1;
    this.getExchangeCode();
  }

  inputData(e: any) {
    this.inputDat = e.target.value;
  }

  openShareModal(id: string): Observable<boolean> | null {
    const ref = this.overlayService.open(
      ShareCodeModalComponent,
      { giftId: id },
      {
        panelClass: ['modal']
      }
    );

    return ref
      ? ref.afterClosed$.pipe(
          map(event => {
            return event.data;
          })
        )
      : EMPTY;
  }

  copied(text: string, id: string): void {
    const item = this.orderSrv.giftCodesAll$.value.find((item: any) => item.exchangeCode === id);
    // @ts-ignore
    const temp = item.successTitle;
    // @ts-ignore
    item.successTitle = text;
    // @ts-ignore
    setTimeout(() => (item.successTitle = temp), 2000);
  }

  startTouching(): void {
    this.isTableStartPosition = this.scrollingContainer.nativeElement.scrollLeft === 0;
  }

  checkTouching(e: TouchEvent): void {
    if (this.isTableStartPosition) {
      return;
    }
    e.stopPropagation();
  }

  openDateRange() {
    this.isDateOpened = !this.isDateOpened;
    console.log(this.isDateOpened);
  }
}
