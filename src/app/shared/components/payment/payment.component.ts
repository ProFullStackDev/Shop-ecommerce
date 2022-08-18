import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentPlatform, PaymentService, PaymentType, PayParams, PayStatus } from '@core/services/user/payment.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DictKey, DictPipe } from '@shared/pipes/dict/dict.pipe';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable } from 'rxjs';

export interface PlatformChangeData {
  platformCode?: string;
  minAmount?: number;
  maxAmount?: number;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less'],
  providers: [PaymentService, DictPipe]
})
export class PaymentComponent implements OnInit {
  // 支付渠道改变
  @Output() readonly platformChange = new EventEmitter<PlatformChangeData>();
  // 支付成功
  @Output() readonly paySuccess = new EventEmitter<string>();
  // 关闭弹窗
  @Output() readonly modalClose = new EventEmitter<string>();
  @Input('defaultSelectFirstPlatform') defaultSelectFirstPlatform = true;
  @Input('disabled') disabled: boolean;
  @Input() isAdditionalInfo: boolean = true;
  @Input() altButton: boolean = false;
  @Input() totalAmount: any = null;

  amountTripleMinError: string | null;
  amountTripleMaxError: string | null;

  amountStripeMinError: string | null;
  amountStripeMaxError: string | null;

  paymentTypes$: Observable<PaymentPlatform[]>;

  constructor(
    private memberSrv: SystemUserService,
    private paySrv: PaymentService,
    private modal: NzModalService,
    private message: NzMessageService,
    private dict: DictPipe,
    private router: Router
  ) {}

  loading = {
    queryList: false
  };
  selectedPaymentCode?: string;
  payMethod?: string;

  orderId!: string;

  get memberInfo() {
    return this.memberSrv.userInfo;
  }

  ngOnInit(): void {
    // platform is fixed now
    this.paymentTypes$ = this.paySrv.queryPlatformList();
  }

  changePlatform(platformCode?: string, payMethod?: string, minAmount?: number, maxAmount?: number) {
    this.selectedPaymentCode = platformCode;
    this.payMethod = payMethod;
    const paymentData = {
      platformCode,
      minAmount,
      maxAmount
    };
    this.platformChange.emit(paymentData);
  }

  unSelectPlatform() {
    this.changePlatform();
  }

  confirm(params: Pick<PayParams, 'businessType' | 'businessId'>) {
    return new Observable(observable => {
      if (!this.selectedPaymentCode) {
        observable.error();
        this.message.error('请选择支付方式');
        return;
        // return this.message.error('请选择支付方式');
      }

      // validate user email、phone
      if (!this.memberSrv.isBindEmailAndPhone()) {
        observable.error();
        this.memberSrv.showBindEmailAndPhoneModal();
        return;
      }

      this.paySrv
        .payV2({
          platformCode: this.selectedPaymentCode,
          paymentType: PaymentType.client,
          ...params
        })
        .subscribe({
          next: res => {
            console.log(res);
            this.router.navigateByUrl(`/pay?id=${res.id}`);
            // observable.next(res);
            // observable.complete();
            // window.open(res.paymentUrl);
            // const orderId = res.id;
            // this.payConfirm(orderId);
          },
          error: err => {
            console.error(err);
            this.message.error(err.message);
            observable.error(err);
          }
        });
    });
  }

  payConfirm(orderId: string) {
    const confirmModal = this.modal.confirm({
      nzTitle: '支付',
      nzContent: '是否已完成支付？',
      nzClosable: false,
      nzMaskClosable: false,
      nzOnOk: () => {
        confirmModal.updateConfig({
          nzOkLoading: true,
          nzCancelDisabled: true,
          nzContent: '支付结果查询中...'
        });
        this.paySrv
          .queryPaymentOrder(orderId)
          .subscribe({
            next: res => {
              switch (res.status) {
                case PayStatus.PENDING:
                  confirmModal.updateConfig({
                    nzContent: this.dict.transform(res.status, DictKey.PAY_STATUS, 'tips'),
                    nzOkText: '立即前往',
                    nzOnOk: () => {
                      // window.open(res.paymentUrl);
                      this.router.navigateByUrl(`/pay/result/${res.id}`);
                      window.open(res.paymentUrl);
                      confirmModal.destroy();
                      this.payConfirm(orderId);
                    }
                  });
                  break;
                case PayStatus.FINISH:
                  this.paySuccess.emit(orderId);
                  confirmModal.destroy();
                  break;
                case PayStatus.CANCEL:
                case PayStatus.TIMEOUT:
                  this.message.error(this.dict.transform(res.status, DictKey.PAY_STATUS, 'tips'));
                  confirmModal.destroy();
                  break;
              }
            },
            error: err => console.error(err)
          })
          .add(() => {
            confirmModal.updateConfig({
              nzOkLoading: false,
              nzCancelDisabled: false
            });
          });
        return false;
      },
      nzOnCancel: () => {
        this.modalClose.emit(orderId);
      }
    });
  }
}
