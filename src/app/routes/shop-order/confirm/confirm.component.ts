import { CurrencyPipe, Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, PaymentMethodPOM, ShippingMethodPOM } from '@core/services/common.service';
import { ProductPOM, ProductSpecification, ProductType, ShopProductService } from '@core/services/shop/product.service';
import { AddressService, ReceiverPOM } from '@core/services/user/address.service';
import { CouponPOM } from '@core/services/user/coupon.service';
import { OrderAmountPOM, OrderCouponsParams, UserOrderService } from '@core/services/user/order.service';
import { PayBusinessType, PaymentMethodsEnum } from '@core/services/user/payment.service';
import { SystemUserService } from '@core/system/system-user.service';
import { SystemVoucherService } from '@core/system/system-voucher.service';
import { TranslateService } from '@ngx-translate/core';
import { AddressChangeComponent } from '@routes/shop-order/confirm/components/address-change/address-change.component';
import { ConfirmYourOrderComponent } from '@routes/shop-order/confirm/components/confirm-your-order/confirm-your-order.component';
import { PaymentMethodsCardComponent } from '@routes/shop-order/confirm/components/payment-methods-card/payment-methods-card.component';
import { PaymentMethodsCryptoComponent } from '@routes/shop-order/confirm/components/payment-methods-crypto/payment-methods-crypto.component';
import { AddressFormComponent } from '@shared/components/address-form/address-form.component';
import { DepositStoreCreditComponent } from '@shared/components/payment-modals/deposit-store-credit/deposit-store-credit.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ModalOptions, NzModalService } from 'ng-zorro-antd/modal';
import { NzModalRef } from 'ng-zorro-antd/modal/modal-ref';
import { EMPTY, forkJoin, map, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface ProductOrder {
  skuId: string;
  quantity: number;
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less'],
  providers: [AddressService, CommonService, UserOrderService, ShopProductService]
})
export class ConfirmComponent extends DestroySubscription implements OnInit {
  constructor(
    private receiverSrv: AddressService,
    private commonSrv: CommonService,
    private orderSrv: UserOrderService,
    private messageSrv: NzMessageService,
    private modalSrv: NzModalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private currency: CurrencyPipe,
    private location: Location,
    private user: SystemUserService,
    private productSrv: ShopProductService,
    public voucher: SystemVoucherService,
    private message: NzMessageService,
    private overlayService: OverlayService,
    private translate: TranslateService
  ) {
    super();
  }

  @ViewChild('addressAddForm') addressAddForm!: AddressFormComponent;
  @ViewChild('methodsCard') methodsCard!: PaymentMethodsCardComponent;
  @ViewChild('methodsCrypto') methodsCrypto!: PaymentMethodsCryptoComponent;

  get userInfo() {
    return this.user.userInfo;
  }

  get canCreateOrder() {
    return this.orderAmount && (this.receiverId || !this.showReceiver);
  }

  get productOrder() {
    return this.stores.reduce<ProductOrder[]>((arr, cur) => {
      arr.push(...cur.productOrder.map(item => ({ skuId: item.skuId, quantity: item.quantity })));
      return arr;
    }, []);
  }

  get showReceiver() {
    return this.stores
      .reduce((arr, cur) => {
        arr.push(...cur.productOrder);
        return arr;
      }, [] as any)
      .some((item: ProductPOM) =>
        [ProductType.ShopProductTypeByGeneral, ProductType.ShopProductTypeByExchange, ProductType.ShopProductTypeByGiftP].includes(
          item.productType
        )
      );
  }

  get totalCashback() {
    return this.stores.reduce((num, store) => {
      return (
        num +
        store.productOrder.reduce((num2, item) => {
          return num2 + item.quantity * item.cashBack;
        }, 0)
      );
    }, 0);
  }

  get cashBackData() {
    return this.user.cashBackData;
  }

  get realCashback() {
    let totalCashback = Number(this.cashBackData?.myRebateCredits);
    const voucherProduct = this.stores
      .reduce<any[]>((products, store) => {
        products.push(...store.productOrder);
        return products;
      }, [])
      .find(product => Object.is(product.skuId, this.voucher.skuId));
    if (voucherProduct) {
      totalCashback += voucherProduct.skuPrice * voucherProduct.quantity * 10;
    }
    return Math.min(totalCashback, this.totalCashback);
  }

  get itemsNum() {
    return this.stores.reduce((num, store) => {
      return (
        num +
        store.productOrder.reduce((num2, item) => {
          return num2 + item.quantity;
        }, 0)
      );
    }, 0);
  }

  get selectedReceiver() {
    if (this.receiverId) {
      return this.receiverList.find(receiver => Object.is(receiver.id, this.receiverId));
    }
    return undefined;
  }

  loading = {
    productToOrder: false,
    getOrderAmount: false,
    coupon: false,
    base: false,
    receiver: false
  };
  selectedId: any;
  receiverList: ReceiverPOM[] = [];
  paymentMethodList: PaymentMethodPOM[] = [];
  shippingMethodList: ShippingMethodPOM[] = [];
  couponList: CouponPOM[] = [];
  receiverId!: string;
  payMethodId = '52';
  shippingMethodId = '1';
  couponCode: string = '';
  memo: string = '';
  usePoint = false;
  stores: OrderCouponsParams[] = [];
  orderAmount!: OrderAmountPOM;
  fapiao = null;
  useBalance = false;
  selectedPlatformCode: PaymentMethodsEnum;
  depositStoreCreditModal = DepositStoreCreditComponent;

  addressModalConfig = {
    title: this.translate.instant('checkout-shipping-add'),
    OkText: '',
    visible: false,
    okLoading: false,
    onOk: () => {
      this.addressAddForm.submit();
    },
    onCancel: () => {
      this.addressModalConfig.visible = false;
    }
  };

  paymentMethodsEnum = PaymentMethodsEnum;
  selectedPaymentMethods?: PaymentMethodsEnum;

  ngOnInit(): void {
    this.loading.base = true;
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(params => {
      this.stores = JSON.parse(decodeURIComponent(atob(params.o))) || [];
    });
    forkJoin([
      this.getReceiver(),
      // this.commonSrv.queryPaymentMethod(),
      // this.commonSrv.queryShippingMethod(),
      this.productSrv.querySkuById(this.productOrder.map(item => item.skuId).join(','))
    ])
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        ([
          ,
          //paymentMethod,
          // shippingMethod,
          skuList
        ]) => {
          this.getOrderAmount();
          this.stores.forEach(store => {
            store.productOrder.forEach(item => {
              const targetSku = skuList.find(sku => Object.is(sku.id, item.skuId));
              if (!targetSku) return;
              const specifications: ProductSpecification[] = JSON.parse(targetSku.specificationValues || '[]');
              Object.assign(item, {
                ...targetSku,
                skuPrice: targetSku.price,
                skuStock: targetSku.stock,
                skuSpec:
                  specifications && specifications.length > 0
                    ? specifications.reduce<string>((str, cur, index) => {
                        return `${str + cur.value}${Object.is(specifications.length - 1, index) ? ']' : ','}`;
                      }, '[')
                    : ''
              });
            });
          });
          // this.paymentMethodList = paymentMethod;
          // this.shippingMethodList = shippingMethod;
          // if (this.paymentMethodList.length > 0) {
          //   const defaultMethod = this.paymentMethodList.find(method => method.isDefault) || this.paymentMethodList[0];
          //   this.payMethodId = defaultMethod.id;
          // }
          // if (this.shippingMethodList.length > 0) {
          //   const defaultMethod = this.shippingMethodList.find(method => method.isDefault) || this.shippingMethodList[0];
          //   this.shippingMethodId = defaultMethod.id.toString();
          // }
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.base = false;
        this.getCoupon();
      });
  }

  getReceiver(hadID?: boolean) {
    return new Observable(observable => {
      this.loading.receiver = true;
      this.receiverSrv
        .getReceiverAddress({ rows: 300, page: 0 })
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(
          res => {
            this.receiverList = (res.rows || []).sort((a, b) => Number(b.id) - Number(a.id));
            if (this.receiverList.length > 0) {
              if (hadID) {
                const arr = JSON.parse(JSON.stringify(this.receiverList));
                const defaultReceiver = arr[0];
                // @ts-ignore
                this.receiverId = defaultReceiver.id;
                observable.next();
                observable.complete();
                return;
              }
              const defaultReceiver = this.receiverList.find(item => item.isDefault) || this.receiverList[0];
              this.receiverId = defaultReceiver.id;
              observable.next();
              observable.complete();
            }
          },
          error => {
            console.error(error);
            observable.error();
          }
        )
        .add(() => {
          this.loading.receiver = false;
        });
    });
  }

  getCoupon() {
    this.loading.coupon = true;
    this.orderSrv
      .getOrderCoupons({ store: this.stores })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.couponList = res.sort((a, b) => Number(b.available) - Number(a.available));
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.coupon = false;
      });
  }

  addressAddSuccess($e?: boolean) {
    console.log('11111111111', $e);
    if ($e) {
      this.messageSrv.success('添加成功');
    } else {
      this.messageSrv.success('编辑成功');
    }
    this.addressModalConfig.visible = false;
    this.getReceiver($e)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe()
      .add(() => {
        this.getOrderAmount();
      });
  }

  couponSelect(code: string) {
    this.couponCode = Object.is(this.couponCode, code) ? '' : code;
    this.getOrderAmount();
  }

  receiverChange(receiverId: string) {
    this.receiverId = receiverId;
    this.getOrderAmount();
  }

  quantityChange() {
    this.getOrderAmount();
  }

  confirmOrder(paymentMethods: PaymentMethodsEnum) {
    if (this.showReceiver && !this.receiverId) {
      const errorTxt = this.receiverList.length < 1 ? '请添加收货地址' : '请选择收货地址';
      this.messageSrv.error(errorTxt);
      return;
    }
    // if (!this.payMethodId) {
    //   this.messageSrv.error('请选择支付方式');
    //   return;
    // }
    if (!this.user.isBindEmailAndPhone()) {
      this.user.showBindEmailAndPhoneModal();
      return;
    }
    this.loading.productToOrder = true;
    const { receiverId, payMethodId, fapiao, productOrder, usePoint, shippingMethodId, memo, useBalance } = this;
    this.orderSrv
      .productToOrder({
        shippingMethodId,
        receiverId: this.showReceiver ? receiverId : '0',
        payMethodId,
        fapiao,
        productOrder,
        usePoint,
        useBalance: Object.is(paymentMethods, PaymentMethodsEnum.BALANCE),
        // couponCode,
        memo
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe({
        next: res => {
          // if (this.useBalance && res.userBalance > 0) {
          //   this.messageSrv.success('下单成功');
          //   this.router.navigateByUrl('/member/order/list', {
          //     replaceUrl: true
          //   });
          //   return;
          // }
          const orderId = res.orderIds[0];
          switch (paymentMethods) {
            case PaymentMethodsEnum.BALANCE:
              this.orderSrv.balancePayment({ orderId }).subscribe({
                next: () => {
                  this.message.success('支付成功'); // payment successful
                  this.router.navigate(['/order/success']);
                },
                error: res => {
                  console.error(res);
                  this.message.error(res.message);
                  switch (res.code) {
                    case 1008013: // 余额不足 Insufficient balance
                      this.user.updateUserInfo();
                      this.user.showInsufficientBalanceModal();
                      break;
                    case 1008028: // 订单超时 Order timed out
                    case 1008027: // 订单付款失败 Order payment failed
                      this.router.navigate(['/member/order/detail'], { queryParams: { id: orderId }, replaceUrl: true });
                      break;
                    case 4001013: // 订单操作失败 Order operation failed
                    case 1008015: // 获取订单信息失败 Failed to get order information
                      this.router.navigate(['/order/success'], { replaceUrl: true });
                      break;
                  }
                }
              });
              break;
            case PaymentMethodsEnum.CARD:
              this.methodsCard.confirm(orderId, PayBusinessType.ORDER);
              break;
            case PaymentMethodsEnum.CRYPTO:
              this.methodsCrypto.confirm(orderId, PayBusinessType.ORDER);
              break;
          }
        },
        error: error => {
          console.error(error);
          this.messageSrv.error(error.message);
        }
      })
      .add(() => {
        this.loading.productToOrder = false;
      });
  }

  back() {
    this.location.back();
  }

  getOrderAmount() {
    const { productOrder, couponCode, usePoint, useBalance, receiverId } = this;
    const targetReceiver = this.receiverList.find(item => Object.is(item.id, receiverId));
    if (this.showReceiver && !targetReceiver) return;
    this.loading.getOrderAmount = true;
    this.orderSrv
      .getOrderAmount({
        productOrder,
        couponCode,
        useBalance,
        usePoint,
        areaId: targetReceiver?.areaId || '0',
        address: targetReceiver?.address || ''
      })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        res => {
          this.orderAmount = res;
        },
        error => {
          console.error(error);
        }
      )
      .add(() => {
        this.loading.getOrderAmount = false;
      });
  }

  changePaymentMethods(methods?: PaymentMethodsEnum) {
    this.selectedPaymentMethods = methods;
  }

  createEditModal(modalConfig: ModalOptions): NzModalRef {
    const modal = this.modalSrv.create({
      nzMaskClosable: false,
      nzOnCancel: () => {
        modal.close();
      },
      nzOnOk: content => {
        modal.updateConfig({
          nzOkLoading: true,
          nzCancelDisabled: true
        });
        content
          .validate()
          .subscribe(() => {
            modal.destroy();
            this.user.updateUserInfo();
          })
          .add(() => {
            modal.updateConfig({ nzOkLoading: false, nzCancelDisabled: false });
          });
        return false;
      },
      ...modalConfig
    });
    modal.afterClose.subscribe(result => (this.receiverId = result.id));
    return modal;
  }

  public editAddress(): void {
    this.selectedId = this.selectedReceiver?.id;
    this.addressModalConfig.visible = true;
    this.addressModalConfig.title = this.translate.instant('checkout-shipping-edit');
    this.addressModalConfig.OkText = this.translate.instant('checkout-shipping-edit-btn');
  }

  public changeAddress(): void {
    this.createEditModal({
      nzTitle: this.translate.instant('checkout-shipping-change'),
      nzFooter: null,
      nzContent: AddressChangeComponent,
      nzComponentParams: { id: this.selectedReceiver?.id }
    });
  }

  public getData(): void {}

  public addAddress(): void {
    this.selectedId = null;
    this.addressModalConfig.visible = true;
    this.addressModalConfig.title = this.translate.instant('checkout-shipping-add');
    this.addressModalConfig.OkText = this.translate.instant('checkout-shipping-add-btn');
  }

  payWithBalance() {
    this.selectedPlatformCode = this.paymentMethodsEnum.BALANCE;
    this.confirmOrder(this.paymentMethodsEnum.BALANCE);
  }

  payWithCard() {
    this.selectedPlatformCode = this.paymentMethodsEnum.CARD;
    this.showConfirmModal();
  }

  payWithCrypto() {
    this.selectedPlatformCode = this.paymentMethodsEnum.CRYPTO;
    this.showConfirmModal();
  }

  showConfirmModal() {
    this.overlayService
      .open(
        ConfirmYourOrderComponent,
        {},
        {
          panelClass: ['modal']
        },
        {
          preventBackdropClick: true
        }
      )
      ?.afterClosed$.pipe(map(event => event.data))
      ?.pipe(takeUntil(this.destroyStream$))
      .subscribe((data: 'confirm' | 'cancel') => {
        if (Object.is(data, 'confirm') && this.selectedPaymentMethods) {
          this.confirmOrder(this.selectedPaymentMethods);
        }
      });
  }

  openModal(component: any, data: object = {}): Observable<boolean> | null {
    const ref = this.overlayService.open(
      component,
      { data },
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }
}
