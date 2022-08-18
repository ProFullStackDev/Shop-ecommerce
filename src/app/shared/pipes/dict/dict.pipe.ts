import { Pipe, PipeTransform } from '@angular/core';
import { PAY_BUSINESS_TYPE, PAY_STATUS } from '@shared/pipes/dict/pay.dict';

import { AFTERSALES_STATUS, AFTERSALES_TYPE, AFTERSALES_METHOD } from './aftersales.dict';
import { BILL_CONTENT_TYPE, BILL_STATUS, BILL_TYPE } from './bill.dict';
import { ORDER_STATUS } from './order.dict';

interface Options {
  key: any;
  value: any;
}

export enum DictKey {
  ORDER_STATUS_DICT,
  BILL_CONTENT_TYPE_DICT,
  BILL_STATUS_DICT,
  BILL_TYPE_DICT,
  PAY_STATUS,
  PAY_BUSINESS_TYPE,
  AFTERSALES_STATUS,
  AFTERSALES_TYPE,
  AFTERSALES_METHOD
}

export interface DictItem {
  label: string; // 显示的文本
  color?: string; // 文本颜色
  [key: string]: any;
}

@Pipe({
  name: 'dict'
})
export class DictPipe implements PipeTransform {
  // order
  [DictKey.ORDER_STATUS_DICT] = ORDER_STATUS;

  // bill
  [DictKey.BILL_CONTENT_TYPE_DICT] = BILL_CONTENT_TYPE;
  [DictKey.BILL_STATUS_DICT] = BILL_STATUS;
  [DictKey.BILL_TYPE_DICT] = BILL_TYPE;
  [DictKey.AFTERSALES_STATUS] = AFTERSALES_STATUS;
  [DictKey.AFTERSALES_TYPE] = AFTERSALES_TYPE;
  [DictKey.AFTERSALES_METHOD] = AFTERSALES_METHOD;

  // pay
  [DictKey.PAY_STATUS] = PAY_STATUS;
  [DictKey.PAY_BUSINESS_TYPE] = PAY_BUSINESS_TYPE;

  /**
   * 返回一个字典的下拉框、单选、多选的key、value结构
   */
  getOptions(dictName: DictKey): Array<{ key: any; value: any }> {
    return Object.entries(this[dictName]).reduce<Options[]>((arr, [key, value]) => {
      arr.push({
        value: key,
        key: value.label
      });
      return arr;
    }, []);
  }

  transform(value: any, dictName: DictKey, keyName?: keyof DictItem): any {
    if (typeof keyName != 'undefined') {
      return this[dictName][value][keyName] || '';
    }
    return this[dictName][value];
  }
}
