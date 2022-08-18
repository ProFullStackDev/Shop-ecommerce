import { OrderStatus } from '@core/services/user/order.service';
import { DictItem } from '@shared/pipes/dict/dict.pipe';

export const ORDER_STATUS: { [key: string]: DictItem } = {
  [OrderStatus.PendingPayment]: {
    label: 'my-orders-status-waiting-payment',
    color: '#f6b774'
  },
  [OrderStatus.PendingReview]: {
    label: '等待审核',
    color: '#f6b774'
  },
  [OrderStatus.PendingShipment]: {
    label: 'my-orders-status-waiting-delivery',
    color: '#f6b774'
  },
  [OrderStatus.Shipped]: {
    label: '已发货',
    color: '#07a139'
  },
  [OrderStatus.Received]: {
    label: 'my-orders-status-recieved',
    color: '#07a139'
  },
  [OrderStatus.Completed]: {
    label: 'my-orders-status-complete',
    color: '#07a139'
  },
  [OrderStatus.Failed]: {
    label: 'order-canceled',
    color: '#fc200d'
  },
  [OrderStatus.Canceled]: {
    label: 'my-orders-status-cancelled',
    color: '#fc200d'
  },
  [OrderStatus.Denied]: {
    label: '已拒绝',
    color: '#fc200d'
  },
  [OrderStatus.All]: {
    label: '全部'
  }
};
