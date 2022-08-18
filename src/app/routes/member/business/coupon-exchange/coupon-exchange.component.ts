import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponService } from '@core/services/member/coupon.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {takeUntil} from "rxjs/operators";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";

@Component({
  selector: 'app-coupon-exchange',
  templateUrl: './coupon-exchange.component.html',
  styleUrls: ['./coupon-exchange.component.less']
})
export class CouponExchangeComponent extends DestroySubscription implements OnInit {
  constructor(private couponService: CouponService, private router: Router, private message: NzMessageService) {
    super();
  }
  isVisible: boolean = false;
  redeemId: string = '';
  pannelListAll: any[] = [];
  total: number = 0;
  page: number = 0;
  rows: number = 12;
  codeTotalNum: number = 0;
  tempId!: string;

  ngOnInit(): void {
    this.getCoupon();
  }
  getCoupon(): void {
    const params = {
      page: 0,
      rows: 10
    };
    this.couponService.getRedeemCouponsList(params).pipe(takeUntil(this.destroyStream$)).subscribe(res => {
      this.pannelListAll = res.rows;
      this.total = res.total;
      this.codeTotalNum = res.total;
    });
  }
  pageChange(page: number) {
    this.page = page - 1;
    const params = {
      page: this.page,
      rows: this.rows
    };
    this.couponService.getCoupon(params).pipe(takeUntil(this.destroyStream$)).subscribe(res => {
      this.pannelListAll = res.rows;
    });
  }
  handleOk(): void {
    this.isVisible = false;
    const params = {
      id: this.tempId
    };
    this.couponService
      .redeem(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.message.success('兑换成功');
          this.getCoupon();
        },
        error => {
          this.message.error(error.message);
          this.getCoupon();
        }
      )
      .add(() => {});
  }
  handleCancel(): void {
    this.isVisible = false;
  }
  giveMoreCoupon(): void {
    this.router.navigateByUrl('/theme/coupon');
  }
  useCoupon(id: string): void {
    this.isVisible = true;
    this.tempId = id;
  }
}
