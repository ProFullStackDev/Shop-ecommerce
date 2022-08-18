import { CurrencyPipe, DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderItems, OrdersPOM, OrderStatus, UserOrderService } from '@core/services/user/order.service';
import { EmService } from '@core/system/customerService/em.service';
import { TranslateService } from '@ngx-translate/core';
import { setFormat } from '@shared/helpers/dateFormat';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { DictKey } from '@shared/pipes/dict/dict.pipe';
import { generateOrderConfirmParams, isNullOrUndefined } from '@shared/utils/utils';
import * as moment from 'moment';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { takeUntil } from 'rxjs/operators';

interface infoItemConfig {
  [key: string]: {
    title: string;
    className?: string;
    style?: string;
    format?: Function;
    filter?: Function;
  };
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.less'],
  providers: [UserOrderService, DatePipe, CurrencyPipe]
})
export class OrderDetailComponent extends DestroySubscription implements OnInit {
  constructor(
    private orderSrv: UserOrderService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private message: NzMessageService,
    private location: Location,
    private router: Router,
    private modal: NzModalService,
    private translate: TranslateService,
    private customSrv: EmService
  ) {
    super();
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      this.orderId = params.id;
    });
    this.getOrderDetails();
  }

  orderId!: string;
  order!: OrdersPOM;
  orderItem: OrderItems[] = [];
  expressNums: any;
  expressNumData: any;
  loading = {
    query: false,
    cancellationOrder: false,
    confirmReceipt: false
  };
  confirmModal?: NzModalRef;

  DictKey = DictKey;

  get displayOrderInfoKeys() {
    return this.filterDisplayKeys(this.order, this.orderInfoConfig);
  }

  get displayAddressInfoKeys() {
    return [
      {
        title: 'order-details-reciever',
        value: this.order.consignee
      },
      {
        title: 'order-details-post-code',
        value: this.order.zipCode
      },
      {
        title: 'order-details-address',
        value: this.order.areaName,
        additionalValue: this.order.address
      },
      {
        title: 'order-details-phone',
        value: this.order.phone
      }
    ];
  }

  get displayShippingInfoKeys() {
    return this.filterDisplayKeys(this.order, this.addressInfoConfig);
  }

  // get displayBillKeys() {
  //   return this.filterDisplayKeys(this.order, this.billConfig);
  // }

  // billConfig: infoItemConfig = {}

  contactSupport(val: any, orderItem?: any) {
    this.customSrv.orderDetail(val, orderItem);
  }

  orderInfoConfig: infoItemConfig = {
    createdDate: {
      title: 'order-details-creation-time',
      format: (value: any) => setFormat(value, this.datePipe)
    },
    paymentMethodName: {
      title: 'order-details-payment-method'
    },
    shippingMethodName: {
      title: 'order-details-delivery-method'
    },
    price: {
      title: 'order-details-price',
      format: (value: any) => this.formatAmount(value)
    },
    fee: {
      title: 'order-details-amount-paid',
      format: (value: any) => this.formatAmount(value)
    },
    freight: {
      title: 'order-details-freight',
      format: (value: any) => this.formatAmount(value)
    },
    promotionDiscount: {
      title: '促销折扣',
      format: (value: any) => this.formatAmount(value),
      filter: (value: any) => value > 0
    },
    couponDiscount: {
      title: '优惠券折扣',
      format: (value: any) => this.formatAmount(value),
      filter: (value: any) => value > 0
    },
    amount: {
      title: 'order-details-order-amount',
      format: (value: any) => this.formatAmount(value)
    },
    amountPaid: {
      title: 'order-cancelled-payment-amount',
      format: (value: any) => this.formatAmount(value),
      filter: (value: any) => value > 0,
      className: 'text-primary'
    },
    refundAmount: {
      title: '退款金额',
      format: (value: any) => this.formatAmount(value),
      filter: (value: any) => value > 0
    },
    amountPayable: {
      title: '应付金额',
      format: (value: any) => this.formatAmount(value),
      filter: (value: any) => value > 0,
      className: 'text-primary'
    },
    rewardPoint: {
      title: '获得积分',
      filter: (value: any) => value > 0
    },
    deductionPoint: {
      title: '抵扣积分',
      filter: (value: any) => value > 0
    },
    exchangePoint: {
      title: '兑换积分',
      filter: (value: any) => value > 0
    },
    couponCode: {
      title: '优惠券'
    },
    // promotionNames: {
    //   title: '促销'
    // },
    memo: {
      title: 'order-details-postscript'
    }
  };

  addressInfoConfig: infoItemConfig = {
    consignee: {
      title: 'order-details-reciever'
    },
    zipCode: {
      title: 'order-details-post-code'
    },
    areaName: {
      title: 'order-details-address'
    },
    ['address']: {
      title: '地址'
    },
    phone: {
      title: 'order-details-phone'
    }
  };

  shippingInfoConfig: infoItemConfig = {};

  OrderStatus = OrderStatus;

  get isDelivery() {
    return this.orderItem.some(item => item.orderItem.isDelivery);
  }

  get hasExpired() {
    return this.order.expire && moment(this.order.expire).isBefore(moment()) && Object.is(this.order.status, OrderStatus.PendingPayment);
  }

  get showPayBtn() {
    return [OrderStatus.PendingPayment].includes(this.order.status);
  }

  get showReceiveBtn() {
    return [OrderStatus.PendingShipment, OrderStatus.Shipped].includes(this.order.status);
  }

  get showAfterSalesBtn() {
    return this.order.isAllowAfterSale;
  }

  get showReOrderBtn() {
    return Object.is(this.order.status, OrderStatus.Canceled);
  }

  get showCancelBtn() {
    return (
      [OrderStatus.PendingPayment, OrderStatus.PendingReview, OrderStatus.PendingShipment].includes(this.order.status) &&
      ![OrderStatus.Canceled, OrderStatus.Denied].includes(this.order.status)
    );
  }

  get showBillBtn() {
    return (
      !this.order.fapiao &&
      (Object.is(OrderStatus.PendingReview, this.order.status) ||
        Object.is(OrderStatus.PendingShipment, this.order.status) ||
        Object.is(OrderStatus.Shipped, this.order.status) ||
        Object.is(OrderStatus.Received, this.order.status) ||
        Object.is(OrderStatus.Completed, this.order.status))
    );
  }

  get orderStatusTips() {
    let str = '';
    switch (this.order.status) {
      case OrderStatus.PendingPayment:
        str = 'order-details-notification-waiting-payment';
        break;
      case OrderStatus.PendingReview:
        str = 'order-details-notification-order-review';
        break;
      case OrderStatus.PendingShipment:
        str = 'order-details-notification-waiting-shipping';
        break;
      case OrderStatus.Completed:
        str = 'order-details-notification-order-completed';
        break;
    }
    if (this.hasExpired) {
      str = '';
    }
    return str;
  }

  successTitle = 'shop-product-page-share-modal';

  copied(text: string): void {
    const temp = this.successTitle;
    this.successTitle = text;

    setTimeout(() => (this.successTitle = temp), 2000);
  }

  formatAmount(amount: number) {
    return this.currencyPipe.transform(amount);
  }

  filterDisplayKeys(obj: any, config: infoItemConfig) {
    return Object.entries(config).reduce<string[]>((arr, [key, config]) => {
      if (config.filter) {
        if (config.filter(obj[key])) {
          arr.push(key);
        }
        return arr;
      }
      if (!isNullOrUndefined(obj[key])) {
        arr.push(key);
      }
      return arr;
    }, []);
  }

  getOrderDetails() {
    this.loading.query = true;
    this.orderSrv
      .getOrderDetails(this.orderId)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.order = res.orders;
          this.orderItem = res.item;
          this.expressNums = res.item.map(item => {
            return {
              orderItemImg: item.orderItem.thumbnail,
              expressNum: item.expressNum[0]
            };
          });
          this.getExpress(this.expressNums);
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.query = false;
      });
  }

  cancellationOrder() {
    this.loading.cancellationOrder = true;
    this.orderSrv
      .cancellationOrder({ orderId: this.orderId })
      .subscribe(
        () => {
          this.message.success('取消成功');
          this.location.back();
        },
        error => {
          this.message.error(error.message);
          console.error(error);
        }
      )
      .add(() => {
        this.loading.cancellationOrder = false;
      });
  }

  confirmReceipt() {
    this.loading.confirmReceipt = true;
    this.orderSrv
      .confirmReceipt({ orderId: this.orderId })
      .subscribe(
        () => {
          // TODO: 引导到评论页
          this.router.navigate(['/member/order/list']);
        },
        error => {
          this.message.error(error.message);
          console.error(error);
        }
      )
      .add(() => {
        this.loading.cancellationOrder = false;
      });
  }

  payment() {
    this.router.navigate(['/order/pay'], { queryParams: { orderId: this.orderId } });
  }

  reOrder() {
    this.router.navigate(['/order/confirm'], {
      queryParams: generateOrderConfirmParams([
        {
          storeId: this.order.storeId.toString(),
          productOrder: this.orderItem.map(item => ({
            skuId: (item.orderItem.skuId || '').toString(),
            cover: item.orderItem.thumbnail || '',
            quantity: item.orderItem.quantity,
            productName: item.orderItem.productName
          }))
        }
      ])
    });
  }

  convertToDecimal(number: any) {
    if (number < 10) {
      number = 0 + number.toString();
    }
    return number;
  }

  get waitingPayment() {
    return this.order.expire && !moment(this.order.expire).isBefore(moment()) && Object.is(this.order.status, OrderStatus.PendingPayment);
  }

  get countdown() {
    const diffTime = moment(this.order.expire).unix() - moment().unix();
    const hours = this.convertToDecimal(moment.duration(diffTime, 'seconds').hours());
    const minutes = this.convertToDecimal(moment.duration(diffTime, 'seconds').minutes());
    const seconds = this.convertToDecimal(moment.duration(diffTime, 'seconds').seconds());
    return `${hours} : ${minutes} : ${seconds}`;
  }

  showConfirm(): void {
    this.confirmModal = this.modal.confirm({
      nzTitle: this.translate.instant('order-detail-modal-title'),
      nzContent: this.translate.instant('order-detail-modal-content'),
      nzOnOk: () => this.confirmReceipt()
    });
  }

  getExpress(data: any) {
    const orderId = this.orderId;
    const expressNum = data.map((item: any) => item.expressNum);
    this.orderSrv
      .getExpress({ orderId, expressNum: [expressNum] })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.expressNumData = res.data.map((item: any) => {
            return {
              image: data.find((dtoItem: any) => dtoItem.expressNum === item.expressNum)?.orderItemImg,
              item,
              itemsTraces: JSON.parse(item.traces)
            };
          });
        },
        error => {
          console.error(error);
        }
      );
  }
  afterSales() {
    this.router.navigate(['/member/aftersales/apply'], {
      queryParams: {
        orderId: this.orderId,
        orderSn: this.order.sn
      }
    });
    // window.easemobim = window.easemobim || {};
    // easemobim.config = {
    //   configId: '304fe7b6-3046-416b-b169-0398f647b90e',
    //   //聊天窗口加载成功回调
    //   onready: function () {
    //     easemobim.sendExt({
    //       ext: {
    //         imageName: 'mallImage3.png',
    //         //custom代表自定义消息，无需修改
    //         type: 'custom',
    //         msgtype: {
    //           order: {
    //             img_url: 'h\n.pn',
    //             title: '测试track1',
    //             desc: '端午节粽子四',
    //             order_title: '订单号：123456789012345678901234567890',
    //             price: '',
    //             item_url: 'https://www.baidu.com?s=order_sn/123123'
    //           }
    //         }
    //       }
    //     });
    //   }
    // };
  }

  // member.order.hasExpiredTips=Dear customer, your order has already expired. Hope you enjoy your shopping!
  // member.order.groupBuyingFailureTips=Dear customer, this group purchase has failed, thank you for your support!
  // member.order.pendingPaymentTips=Dear customer, your order is awaiting payment, please pay in time!
  // member.order.pendingGroupSuccessTips=Dear customers, your order is waiting for a group, please be patient!
  // member.order.pendingReviewTips=Dear customer, your order is awaiting review, please wait!
  // member.order.pendingShipmentTips=Dear customer, your order is awaiting shipment, please wait!
  // member.order.shippedTips=Dear customer, your order has been shipped, please wait!
  // member.order.receivedTips=Dear customer, you had already received your goods. Hope you enjoy your shopping!
  // member.order.completedTips=Dear customer, your order is finished. Hope you enjoy your shopping!
  // member.order.failedTips=Dear customer, your order is failed. Hope you enjoy your shopping!
  // member.order.canceledTips=Dear customer, your order has been canceled. Hope you enjoy your shopping!
  // member.order.deniedTips=Dear customer, your order is rejected. Hope you enjoy your shopping!
}
