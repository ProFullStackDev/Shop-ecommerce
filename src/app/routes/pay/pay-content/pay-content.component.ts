import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PayResult, PayStatus } from '@core/services/user/payment.service';
import { setFormat } from '@shared/helpers/dateFormat';
import { DictKey, DictPipe } from '@shared/pipes/dict/dict.pipe';
import { toDecimal } from 'ng-zorro-antd/core/util';

type formatFunction<T, K extends keyof T> = (value: T[K], obj: T) => any;
type titleFunction<T> = (obj: T) => string;
type filterFunction<T> = (obj: T) => boolean;
type styleFunction<T, K extends keyof T> = (value: T[K], obj: T) => string;

type infoItemConfig<T> = {
  [K in keyof Partial<T>]: {
    title: titleFunction<T>;
    className?: string;
    style?: styleFunction<T, K>;
    format?: formatFunction<T, K>;
    filter?: filterFunction<T>;
  };
};

@Component({
  selector: 'app-pay-content',
  templateUrl: './pay-content.component.html',
  styleUrls: ['./pay-content.component.less'],
  providers: [DictPipe]
})
export class PayContentComponent {
  @Input('content') content: PayResult;
  constructor(private dict: DictPipe, private datePipe: DatePipe) {}

  get displayConfigKeys() {
    return Object.entries(this.itemConfig).reduce<string[]>((arr, [key, config]) => {
      if (!config.filter || (config.filter && config.filter(this.content))) {
        arr.push(key);
      }
      return arr;
    }, []);
  }

  itemConfig: infoItemConfig<PayResult> = {
    platformName: {
      title: () => 'payment-successful-page-payment-platform'
    },
    businessType: {
      title: () => 'payment-successful-page-payment-type',
      format: value => this.dict.transform(value, DictKey.PAY_BUSINESS_TYPE, 'label')
    },
    amount: {
      title: () => 'payment-successful-page-payment-amount',
      format: (value, obj) => `${obj.currency} ${toDecimal(Number(value), 2)}`
    },
    createDate: {
      title: () => 'payment-successful-page-order-creation-time',
      format: value => setFormat(value, this.datePipe)
    },
    updateDate: {
      title: payResult => this.dict.transform(payResult.status, DictKey.PAY_STATUS, 'updateDateText'),
      format: value => setFormat(value, this.datePipe),
      filter: payResult => !Object.is(payResult.status, PayStatus.PENDING)
    },
    status: {
      title: () => 'payment-successful-page-status',
      format: value => this.dict.transform(value, DictKey.PAY_STATUS, 'label'),
      style: value => `color: ${this.dict.transform(value, DictKey.PAY_STATUS, 'color')}`
    }
  };
}
