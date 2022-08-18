import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from '@core/services/member/coupon.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { NzMessageService } from 'ng-zorro-antd/message';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-coupon-code',
  templateUrl: './coupon-code.component.html',
  styleUrls: ['./coupon-code.component.less']
})
export class CouponCodeComponent extends DestroySubscription implements OnInit {
  constructor(private router: Router, private couponService: CouponService, private message: NzMessageService) {
    super();
  }
  type: string = '';
  total: number = 0;
  page: number = 0;
  rows: number = 12;
  codeTotalNum = 0;
  pannelListAll: any[] = [];
  giveMore() {
    this.router.navigateByUrl('/theme/coupon');
  }
  ngOnInit(): void {
    this.getList('');
  }
  getList(type: string): void {
    const params = {
      page: this.page,
      rows: this.rows,
      type: type
    };
    this.couponService
      .getCoupon(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.pannelListAll = res.rows;
        this.total = res.total;
        this.codeTotalNum = res.total;
      });
  }
  pageChange(page: number) {
    this.page = page - 1;
    const params = {
      page: this.page,
      rows: this.rows,
      type: this.type
    };
    this.couponService
      .getCoupon(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.pannelListAll = res.rows;
      });
  }
}
