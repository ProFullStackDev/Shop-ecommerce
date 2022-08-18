import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetailsPOM, OrderStatus, UserOrderService } from '@core/services/user/order.service';
import { PayBusinessType, PaymentService, PayStatus } from '@core/services/user/payment.service';
import { SystemUserService } from '@core/system/system-user.service';
import { PaymentComponent, PlatformChangeData } from '@shared/components/payment/payment.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shop-order-pay',
  templateUrl: './shop-order-pay.component.html',
  styleUrls: ['./shop-order-pay.component.less'],
  providers: [UserOrderService, PaymentService]
})
export class ShopOrderPayComponent extends DestroySubscription implements OnInit {
  @ViewChild('paymentComponent') paymentComponent: PaymentComponent;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orderSrv: UserOrderService,
    private message: NzMessageService,
    private user: SystemUserService,
    private modal: NzModalService,
    private paymentSrv: PaymentService
  ) {
    super();
  }

  orderId: string;
  orderDetails: OrderDetailsPOM;
  useBalance = false;
  selectedPaymentCode: string;
  loading = {
    getOrderDetails: false,
    pay: false,
    queryByBusiness: false
  };

  get canPay() {
    return Object.is(this.orders.status, OrderStatus.PendingPayment);
  }

  get orders() {
    return this.orderDetails?.orders || {};
  }

  get canUseBalance() {
    if (!this.userInfo.balance || !this.needPayAmount) return false;
    return this.userInfo.balance >= this.needPayAmount;
  }

  get needPayAmount() {
    return this.orders.amount - this.orders.amountPaid;
  }

  get userInfo() {
    return this.user.userInfo;
  }

  ngOnInit(): void {
    const { orderId } = this.activatedRoute.snapshot.queryParams;
    this.orderId = orderId;
    this.QueryByBusiness();
    this.user.updateUserInfo();
  }

  QueryByBusiness() {
    this.loading.queryByBusiness = true;
    this.paymentSrv
      .QueryByBusiness({
        businessType: PayBusinessType.ORDER,
        businessId: this.orderId
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: res => {
          if ([PayStatus.PENDING, PayStatus.FINISH].includes(res.status)) {
            this.router.navigate([`/pay/result/${res.id}`], { replaceUrl: true });
            return;
          }
          this.getOrder();
        },
        error: err => {
          console.error(err);
          switch (err.code) {
            case 8001003: // 支付订单不存在 Payment order does not exist
              this.getOrder();
              return;
            default:
              this.message.error(err.message);
          }
        }
      })
      .add(() => {
        this.loading.queryByBusiness = false;
      });
  }

  getOrder() {
    this.loading.getOrderDetails = true;
    this.orderSrv
      .getOrderDetails(this.orderId)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: res => (this.orderDetails = res),
        error: res => {
          console.error(res);
          this.message.error(res.message);
        }
      })
      .add(() => (this.loading.getOrderDetails = false));
  }

  pay() {
    this.loading.pay = true;
    if (this.useBalance) {
      this.balancePayment();
      return;
    }
    this.paymentComponent
      .confirm({
        businessType: PayBusinessType.ORDER,
        businessId: this.orderId
      })
      .subscribe({
        error: err => {
          console.error(err);
          // 支付订单已存在 Payment order already exists
          if (Object.is(err.code, 8001009)) {
            this.QueryByBusiness();
          }
        }
      })
      .add(() => (this.loading.pay = false));
  }

  payCancel() {
    this.navigateToOrderList();
  }

  payCancelConfirm() {
    this.modal.confirm({
      nzTitle: '取消支付', // cancel payment
      nzContent: '确定取消支付吗?', // Are you sure you want to cancel the payment?
      nzOnOk: () => this.navigateToOrderList()
    });
  }

  useBalanceChange(checked: boolean) {
    if (checked) {
      this.paymentComponent.unSelectPlatform();
    }
  }

  platformChange(platformChangeData: PlatformChangeData) {
    this.selectedPaymentCode = platformChangeData.platformCode || '';
    if (platformChangeData.platformCode) {
      this.useBalance = false;
    }
  }

  balancePayment() {
    this.orderSrv
      .balancePayment({ orderId: this.orderId })
      .subscribe({
        next: () => {
          this.message.success('支付成功'); // payment successful
          this.navigateToOrderList();
        },
        error: res => {
          console.error(res);
          this.message.error(res.message);
          switch (res.code) {
            case 1008013: // 余额不足 Insufficient balance
              this.useBalance = false;
              this.user.updateUserInfo();
              this.user.showInsufficientBalanceModal();
              break;
            case 1008028: // 订单超时 Order timed out
            case 1008027: // 订单付款失败 Order payment failed
              this.router.navigate(['/member/order/detail'], { queryParams: { id: this.orderId }, replaceUrl: true });
              break;
            case 4001013: // 订单操作失败 Order operation failed
            case 1008015: // 获取订单信息失败 Failed to get order information
              this.router.navigate(['/member/order/list'], { replaceUrl: true });
              break;
          }
        }
      })
      .add(() => (this.loading.pay = false));
  }

  paySuccess() {
    this.message.success('支付成功'); // payment successful
    this.navigateToOrderList();
  }

  navigateToOrderList() {
    this.router.navigateByUrl('/member/order/list', {
      replaceUrl: true
    });
  }
}
