import { PayStatus, PayBusinessType } from '@core/services/user/payment.service';
import { DictItem } from '@shared/pipes/dict/dict.pipe';

export const PAY_STATUS: { [key: string]: DictItem } = {
  [PayStatus.PENDING]: {
    label: '等待中',
    tips: '订单已存在，请尽快支付',
    color: '#ccc',
    status: 'warning'
  },
  [PayStatus.FINISH]: {
    label: 'payment-successful-page-status-finished',
    tips: 'payment-successful-page-heading-message',
    color: '#fb8811',
    status: 'success',
    updateDateText: 'payment-successful-page-order-completion-time'
  },
  [PayStatus.CANCEL]: {
    label: 'order-cancelled-cancel',
    tips: 'order-cancelled-heading',
    color: '#ccc',
    status: 'error',
    updateDateText: 'order-cancelled-order-cancellation-time'
  },
  [PayStatus.TIMEOUT]: {
    label: '过期',
    tips: '该订单已超过支付时间',
    color: '#fc200d',
    status: 'error',
    updateDateText: '订单超时时间'
  }
};

export const PAY_BUSINESS_TYPE: { [key: string]: DictItem } = {
  [PayBusinessType.ORDER]: {
    label: 'order-cancelled-type-s',
    primaryBtnText: '订单列表',
    link: '/member/order/list'
  },
  [PayBusinessType.BALANCE]: {
    label: 'payment-successful-page-balance-recharge',
    primaryBtnText: '我的余额',
    link: '/member/member-deposit/log'
  },
  [PayBusinessType.GIFTCODE]: {
    label: '礼品券',
    primaryBtnText: '我的礼品券',
    link: '/member/point?tabIndex=3'
  }
};
