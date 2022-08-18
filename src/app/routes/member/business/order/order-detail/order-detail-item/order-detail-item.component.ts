import { Component, Input } from '@angular/core';
import { OrdersPOM } from '@core/services/user/order.service';

@Component({
  selector: 'app-order-detail-item',
  template: `
    <span [style]="item.style" [class]="item.className">
      {{ displayValue }}
    </span>
  `,
  styles: []
})
export class OrderDetailItemComponent {
  constructor() {}

  @Input() item!: { title: string; style?: string; className?: string; format?: Function };
  @Input() keyName!: string;
  @Input() order!: OrdersPOM;

  get displayValue() {
    if (this.item.format instanceof Function) {
      return this.item.format(this.order[this.keyName], this.order);
    }
    return this.order[this.keyName] || '--';
  }
}
