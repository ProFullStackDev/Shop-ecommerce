import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from '@core/services/member/coupon.service';
import { BillService, BillQueryParams, BillPOM } from '@core/services/user/bill.service';
import { OrdersPOM } from '@core/services/user/order.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { BILL_STATUS, BILL_TYPE } from '@shared/pipes/dict/bill.dict';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.less']
})
export class InvoiceComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollingContainer') scrollingContainer: ElementRef;

  isTableStartPosition = false;
  constructor(
    private couponService: CouponService,
    private billService: BillService,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    super();
  }
  billType = BILL_TYPE;
  billStatus = BILL_STATUS;
  billList: OrdersPOM[] = [];
  pageParams: BillQueryParams = {
    rows: 10,
    page: 0
  };
  totalNum = 0;
  loading = {
    table: false,
    submit: false
  };
  statusTabIndex = 0;
  statusTab = ['order-not-invoiced', 'order-billed'];

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      this.statusTabIndex = params.statusTabIndex || 0;
      this.getUserFapiaoList();
    });
  }

  getUserFapiaoList(): void {
    this.loading.table = true;
    const params = {
      page: this.pageParams.page,
      rows: this.pageParams.rows,
      type: this.statusTabIndex
    };
    this.billService
      .queryOrderInvoiceList(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        console.log(res);
        this.totalNum = res.total;
        this.billList = res.rows;
      })
      .add(() => {
        this.loading.table = false;
      });
  }

  pageChange(page: number) {
    this.pageParams.page = page - 1;
    this.getUserFapiaoList();
  }

  statusChange(index: number) {
    this.pageParams.page = 0;
    this.router.navigate(['member', 'invoice', 'list'], {
      queryParams: { statusTabIndex: index },
      replaceUrl: true
    });
  }
}
