import { Component } from '@angular/core';
import { AdPositionEnum } from '@core/services/common.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.less']
})
export class HomeLayoutComponent {
  menuList = [
    {
      name: '首页',
      link: '/'
    },
    {
      name: '优惠券',
      link: '/theme/coupon'
    }
    // {
    //   name: '积分商城',
    //   link: '/1'
    // }
  ];
}
