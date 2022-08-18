import { Component, OnInit } from '@angular/core';
import { CouponService } from '@core/services/member/coupon.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import {takeUntil} from "rxjs/operators";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";

@Component({
  selector: 'app-coupon-bind',
  templateUrl: './coupon-bind.component.html',
  styleUrls: ['./coupon-bind.component.less']
})
export class CouponBindComponent extends DestroySubscription implements OnInit {
  constructor(private couponService: CouponService, private message: NzMessageService, private fb: FormBuilder) {
    super();
  }
  value: string = '';
  bind() {
    if (!this.value) {
      this.message.error('输入有误，请检查后重新提交');
    } else {
      const params = {
        couponCode: this.value
      };
      this.couponService
        .bindCoupon(params)
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(
          () => {
            this.message.success('绑定成功');
          },
          error => {
            this.message.error(error.message);
          }
        )
        .add(() => {});
    }
  }
  ngOnInit(): void {}
}
