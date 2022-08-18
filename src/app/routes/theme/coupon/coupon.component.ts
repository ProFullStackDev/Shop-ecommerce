import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CouponPOM, ShopCouponService } from '@core/services/shop/coupon.service';
import { UserCouponService } from '@core/services/user/coupon.service';
import { SystemUserService } from '@core/system/system-user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {takeUntil} from "rxjs/operators";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.less'],
  providers: [ShopCouponService, UserCouponService]
})
export class CouponComponent extends DestroySubscription implements OnInit {
  constructor(
    private shopCouponService: ShopCouponService,
    private userService: SystemUserService,
    private userCouponService: UserCouponService,
    private router: Router,
    private message: NzMessageService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getCouponList();
    if (this.userService.isLogin()) {
      this.getUserCouponList();
    }
  }

  scrollConfig = {
    noMore: false,
    loading: false,
    distance: 1,
    throttle: 300,
    page: 0,
    rows: 10
  };

  loading = {
    receive: false,
    receiveId: -1
  };

  couponList: CouponPOM[] = [];
  userReceivedCouponIds: Set<number> = new Set([]);

  onScrollDown() {
    this.getCouponList();
  }

  getUserCouponList() {
    this.shopCouponService
      .queryWithReceive({
        page: 0,
        rows: 300,
        storeId: '1',
        isReceive: false
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.userReceivedCouponIds = new Set(res.rows.map(coupon => coupon.id));
        },
        error => {
          console.error(error);
        }
      );
  }

  getCouponList() {
    if (this.scrollConfig.noMore || this.scrollConfig.loading) return;
    this.scrollConfig.loading = true;
    this.shopCouponService
      .query({
        page: this.scrollConfig.page,
        rows: this.scrollConfig.rows,
        storeId: '1'
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.scrollConfig.page++;
          this.couponList.push(...res.rows);
          this.scrollConfig.noMore = res.rows.length < this.scrollConfig.rows;
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.scrollConfig.loading = false;
      });
  }

  couponBtnClick(couponId: number) {
    if (!this.userService.isLogin()) {
      return this.userService.showConfirmLoginModal();
    }
    if (this.userReceivedCouponIds.has(couponId)) {
      this.router.navigate(['/product/search'], {
        queryParams: {
          couponId
        }
      });
      return;
    }
    this.loading.receive = true;
    this.loading.receiveId = couponId;
    this.userCouponService
      .receiveCoupon({ id: couponId })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.getUserCouponList();
          this.message.success('领取成功！');
        },
        error => {
          console.error(error);
          this.message.error(error.message);
        }
      )
      .add(() => {
        this.loading.receive = false;
        this.loading.receiveId = -1;
      });
  }
}
