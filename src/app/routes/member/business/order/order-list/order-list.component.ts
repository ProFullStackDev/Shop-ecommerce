import { Component, ElementRef, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersPOM, OrderStatus, UserOrderService, UserOrdersParams } from '@core/services/user/order.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less'],
  providers: [UserOrderService]
})
export class OrderListComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollingContainer') scrollingContainer: ElementRef;
  isTableStartPosition = false;
  orderId!: string;
  constructor(private orderSrv: UserOrderService, private activatedRoute: ActivatedRoute, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      this.orderStatusTabIndex = params.type || 0;
      this.pageParams.status = this.orderStatusIndex[Number(this.orderStatusTabIndex)];
      this.getUserOrders();
      this.orderId = params.id;
    });
  }

  dateRange = [];
  loading = {
    table: false
  };
  orderStatusTabIndex = 0;
  orderStatusTab = [
    'my-orders-header-all',
    'my-orders-header-waiting-pay',
    'my-orders-header-waiting-delivery',
    'my-orders-header-completed',
    'my-orders-header-cancelled'
  ];
  orderStatusIndex = [OrderStatus.All, OrderStatus.PendingPayment, OrderStatus.Shipped, OrderStatus.Completed, OrderStatus.Canceled];
  orders: OrdersPOM[] = [];
  queryTxtType = 0; // 0: orderSn
  pageParams: UserOrdersParams = {
    rows: 10,
    page: 0,
    status: OrderStatus.All,
    beginTime: '',
    endTime: '',
    orderSn: ''
  };
  orderTotalNum = 0;
  tableSpan = {
    detail: 12,
    price: 4,
    orderStatus: 4,
    operation: 4
  };
  inputDat: boolean = false;

  getUserOrders() {
    this.loading.table = true;
    this.orderSrv
      .getUserOrders({
        ...this.pageParams,
        status: Object.is(this.pageParams.status, 99) ? undefined : this.pageParams.status,
        endTime: this.pageParams.endTime || moment().format('YYYY-MM-DD')
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.orders = res.rows;
          this.orderTotalNum = res.total;
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.table = false;
      });
  }

  orderStatusChange(index: number) {
    // this.pageParams.status = this.orderStatusIndex[index];
    this.pageParams.page = 0;
    this.router.navigate(['member', 'order', 'list'], {
      queryParams: { type: index },
      replaceUrl: true
    });
  }

  onDateRangeChange(dateRange: Date[]) {
    if (dateRange.length > 0) {
      this.pageParams.beginTime = moment(dateRange[0]).format('YYYY-MM-DD');
      this.pageParams.endTime = moment(dateRange[1]).format('YYYY-MM-DD');
    } else {
      this.pageParams.beginTime = '';
      this.pageParams.endTime = '';
    }
  }

  pageChange(page: number) {
    this.pageParams.page = page - 1;
    this.getUserOrders();
  }

  search() {
    this.pageParams.page = 0;
    this.getUserOrders();
  }

  inputData(e: any) {
    this.inputDat = e.target.value;
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
}
