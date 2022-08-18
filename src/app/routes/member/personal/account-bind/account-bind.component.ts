import { Component, OnInit } from '@angular/core';
import { CouponService } from '@core/services/member/coupon.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-account-bind',
  templateUrl: './account-bind.component.html',
  styleUrls: ['./account-bind.component.less']
})
export class AccountBindComponent implements OnInit {
  constructor(private couponService: CouponService, private message: NzMessageService) {}
  value: string = '';
  bind() {}
  ngOnInit(): void {}
}
