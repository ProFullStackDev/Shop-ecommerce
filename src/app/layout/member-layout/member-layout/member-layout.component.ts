import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { StatisticsService } from '@core/services/user/statistics.service';
import { AccountMenuComponent } from '@shared/components/header/modules/account-menu/components/account-menu/account-menu.component';
import { HeaderService } from '@shared/components/header/services/header.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { EMPTY, Subscription } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-member-layout',
  templateUrl: './member-layout.component.html',
  styleUrls: ['./member-layout.component.less']
})
export class MemberLayoutComponent extends DestroySubscription {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private statisticsService: StatisticsService,
    @Inject(DOCUMENT) private readonly document: Document,
    public readonly headerService: HeaderService
  ) {
    super();
  }
  public loginStatus: boolean = true;

  memberInfo: any = {
    userName: '',
    balance: '',
    amount: '',
    point: '',
    couponCount: '',
    pendingPaymentCount: '',
    toBeShippedCount: '',
    deliverGoodsCount: '',
    completeCount: ''
  };

  mobileLink = [
    {
      name: '微信公众号',
      qrcode: 'src/assets/images/qrcode-wechat.jpg'
    },
    {
      name: '微信小程序',
      qrcode: 'src/assets/images/qrcode-applet.jpg'
    },
    {
      name: '下载APP',
      qrcode: 'src/assets/images/qrcode-app.jpg'
    }
  ];
  menuList1 = [
    {
      name: '交易信息',
      link: '/'
    },
    {
      name: '我的订单',
      link: '/'
    },
    {
      name: '我的优惠券',
      link: '/'
    },
    {
      name: '绑定优惠券',
      link: '/1'
    },
    {
      name: '兑换优惠券',
      link: '/1'
    },
    {
      name: '我的积分',
      link: '/1'
    },
    {
      name: '我的售后',
      link: '/1'
    }
  ];
  searchType = 1;
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
  // get userInfoBoxBoolean() {
  //   return Object.is(this.router.routerState.snapshot.url, '/member/index');
  // }
  ngOnInit(): void {
    this.getUserStatistics();
  }
  getUserStatistics(): void {
    const params = {
      page: 0,
      rows: 3
    };
    this.statisticsService
      .getUserStatistics(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.memberInfo = res;
        // 存储信息
        localStorage.setItem('memberInfo', JSON.stringify(res));
      });
  }

  openModal() {
    this.router.navigate(['/']).finally(() => {
      setTimeout(() => {
        this.headerService.openAccountMenu();
      }, 0);
    });
  }
}
