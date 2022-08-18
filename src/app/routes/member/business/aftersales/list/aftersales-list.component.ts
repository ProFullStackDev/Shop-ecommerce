import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AftersalesService, AftersalesType, AfterSalesDetailsPOM } from '@core/services/user/aftersales.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { DictKey, DictPipe } from '@shared/pipes/dict/dict.pipe';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-aftersales',
  templateUrl: './aftersales-list.component.html',
  styleUrls: ['./aftersales-list.component.less'],
  providers: [AftersalesService]
})
export class AftersalesListComponent extends DestroySubscription implements OnInit {
  constructor(private router: Router, private aftersalesService: AftersalesService) {
    super();
  }

  page = 1;
  rows = 10;
  total = 0;
  tabIndex = 0;
  afterSalesList: AfterSalesDetailsPOM[] = [];
  date = null;
  orderNumber: string = '';
  beginTime: string = '';
  endTime: string = '';
  orderSn: string = '';
  type: string = '';
  DictKey = DictKey;

  ngOnInit(): void {
    this.getAfterSalesList();
  }

  tabIndexChange(index: number) {
    switch (index) {
      case 1:
        this.type = AftersalesType.REPLACE;
        break;
      case 2:
        this.type = AftersalesType.RETURNS;
        break;
      case 3:
        this.type = AftersalesType.REFUND;
        break;
      default:
        this.type = '';
        break;
    }
    this.getAfterSalesList();
  }

  getAfterSalesList() {
    const params = {
      page: this.page - 1,
      rows: this.rows,
      beginTime: this.beginTime ? moment(this.beginTime).format('YYYY-MM-DD') : '',
      endTime: this.endTime ? moment(this.endTime).format('YYYY-MM-DD') : '',
      afterSalesType: this.type,
      orderSn: this.orderSn
    };
    this.aftersalesService
      .getAfterSalesList(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.afterSalesList = res.rows.reverse();
        this.total = res.total;
      });
  }

  search() {
    this.getAfterSalesList();
  }

  pageIndexChange() {
    this.getAfterSalesList();
  }

  pageSizeChange() {
    this.page = 1;
    this.getAfterSalesList();
  }

  // 详情
  toDetail(id: number) {
    this.router.navigate(['/member/aftersales/detail'], { queryParams: { afterSalesID: id }, replaceUrl: true });
  }
}
