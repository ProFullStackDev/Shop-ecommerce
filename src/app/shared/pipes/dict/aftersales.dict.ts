import { AftersalesStatus, AftersalesType, AftersalesMethod } from '@core/services/user/aftersales.service';
import { DictItem } from '@shared/pipes/dict/dict.pipe';

export const AFTERSALES_STATUS: { [key: string]: DictItem } = {
  [AftersalesStatus.PENDING]: {
    label: '等待审核',
    color: '#f6b774'
  },
  [AftersalesStatus.APPROVED]: {
    label: '审核通过',
    color: '#07a139'
  },
  [AftersalesStatus.FAILED]: {
    label: '审核失败',
    color: 'red'
  },
  [AftersalesStatus.COMPLETED]: {
    label: '已完成',
    color: '#07a139'
  },
  [AftersalesStatus.CANCELED]: {
    label: '已取消',
    color: 'grey'
  }
};

export const AFTERSALES_TYPE: { [key: string]: DictItem } = {
  [AftersalesType.REPLACE]: {
    label: '换货',
    color: '#07a139'
  },
  [AftersalesType.RETURNS]: {
    label: '退货',
    color: 'red'
  },
  [AftersalesType.REFUND]: {
    label: '退款',
    color: '#f6b774'
  }
};

export const AFTERSALES_METHOD: { [key: string]: DictItem } = {
  [AftersalesMethod.ORIGIN]: {
    label: '原路退回',
    color: '#f6b774'
  },
  [AftersalesMethod.ONLINE]: {
    label: '在线支付',
    color: '#07a139'
  },
  [AftersalesMethod.OFFLINE]: {
    label: '线下支付',
    color: 'red'
  },
  [AftersalesMethod.DEPOSIT]: {
    label: ' 预存款支付',
    color: 'red'
  }
};
