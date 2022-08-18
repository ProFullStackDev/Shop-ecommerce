import { Component, Input } from '@angular/core';
import { ConsultationPOM } from '@core/services/shop/product.service';

@Component({
  selector: 'app-product-consultation-item',
  template: `
    <nz-card class="consultation-item" nzSize="small">
      <nz-row class="ask-con" nzJustify="space-between">
        <nz-col>
          <span class="ask">问</span>
          {{ consultation.content }}
        </nz-col>
        <nz-col>
          <span class="name">{{ consultation.memberName }}</span>
          <span class="text-gray">{{ consultation.createdDate | date: 'YYYY-MM-dd' }}</span>
        </nz-col>
      </nz-row>
      <nz-row class="answer-con" *ngFor="let replie of consultation.replies" nzJustify="space-between" nzAlign="top">
        <nz-col>
          <span class="answer">答</span>
          <span class="name text-primary">{{ storeName }}：</span>
        </nz-col>
        <nz-col [nzFlex]="1"> {{ replie.content }} </nz-col>
        <nz-col class="text-gray">{{ consultation.createdDate | date: 'YYYY-MM-dd' }}</nz-col>
      </nz-row>
    </nz-card>
  `,
  styleUrls: ['./product-consultation-item.component.less']
})
export class ProductConsultationItemComponent {
  constructor() {}

  @Input() consultation!: ConsultationPOM;
  @Input() storeName = '';
}
