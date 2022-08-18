import { BillType, BillContentType, BillStatus, BillHeaderType } from '@core/services/user/bill.service';
import { DictItem } from '@shared/pipes/dict/dict.pipe';

export const BILL_TYPE: { [key: string]: DictItem } = {
  [BillType.VAT_NORMAL_Bill]: {
    label: 'order-ordinary-invoice'
  },
  [BillType.VAT_SPECIAL_Bill]: {
    label: 'order-special-invoice'
  }
};

export const BILL_HEADER_TYPE: { [key: string]: DictItem } = {
  [BillHeaderType.PERSONAL_Bill]: {
    label: 'invoice-header-type-personal'
  },
  [BillHeaderType.COMPANY_Bill]: {
    label: 'invoice-header-type-unit'
  }
};

export const BILL_CONTENT_TYPE: { [key: string]: DictItem } = {
  [BillContentType.PRODUCT_DETAIL]: {
    label: 'order-product-details'
  },
  [BillContentType.PRODUCT_CATEGORY]: {
    label: 'order-product-category'
  }
};

export const BILL_STATUS: { [key: string]: DictItem } = {
  [BillStatus.PENDING]: {
    label: '等待审核',
    color: '#f6b774'
  },
  [BillStatus.SUCCEEDED]: {
    label: '审核成功',
    color: '#07a139'
  },
  [BillStatus.COMPLETED]: {
    label: '开票成功',
    color: '#07a139'
  },
  [BillStatus.FAILED]: {
    label: '审核失败',
    color: '#fc200d'
  }
};
