import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillService, BillQueryParams } from '@core/services/user/bill.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header-manage',
  templateUrl: './header-manage.component.html',
  styleUrls: ['./header-manage.component.less'],
  providers: [BillService]
})
export class HeaderManageComponent extends DestroySubscription implements OnInit {
  constructor(private router: Router, private billService: BillService) {
    super();
  }
  page: number = 0;
  rows: number = 12;
  dataList: any[] = [];
  isVisible: boolean = false;
  deleteIndex: number = 0;
  pageParams: BillQueryParams = {
    rows: 10,
    page: 0
  };
  totalNum = 0;

  ngOnInit(): void {
    this.getDataList();
  }
  getDataList(): void {
    const params = {
      page: this.pageParams.page,
      rows: this.pageParams.rows
    };
    this.billService
      .getFapiaoTitle(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.totalNum = res.total;
        this.dataList = res.rows;
      });
  }
  toDelete(index: number) {
    this.isVisible = true;
    this.deleteIndex = index;
  }
  handleOk(): void {
    this.isVisible = false;
    const params = {
      id: this.dataList[this.deleteIndex].id
    };
    this.billService
      .delFapiaoTitle(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        // 删除成功刷新数据
        this.dataList.splice(this.deleteIndex, 1);
      });
  }
  handleCancel(): void {
    this.isVisible = false;
  }

  pageChange(page: number) {
    this.pageParams.page = page - 1;
    this.getDataList();
  }
}
