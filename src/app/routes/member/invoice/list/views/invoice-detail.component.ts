import { Location } from '@angular/common'; //路由返回
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BillService, BillStatus, BillPOM } from '@core/services/user/bill.service';
import { OrderStatus } from '@core/services/user/order.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { BILL_STATUS, BILL_TYPE, BILL_CONTENT_TYPE } from '@shared/pipes/dict/bill.dict';
import { isTemplateRef } from 'ng-zorro-antd/core/util';
import { NzImageService } from 'ng-zorro-antd/image';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.less'],
  providers: [BillService]
})
export class InvoiceDetailComponent extends DestroySubscription implements OnInit {
  constructor(
    private billService: BillService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private nzImageService: NzImageService
  ) {
    super();
  }
  isVisible: boolean = false;
  id: string = '';
  detailInfo: BillPOM;
  stepCurrent: number = 1;
  billType = BILL_TYPE;
  billStatus = BILL_STATUS;
  billContentType = BILL_CONTENT_TYPE;

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroyStream$)).subscribe(query => {
      this.id = query.id;
      const params = {
        id: this.id
      };
      this.billService
        .getUserFapiaoDetails(params)
        .pipe(takeUntil(this.destroyStream$))
        .subscribe(res => {
          switch (res.status) {
            case BillStatus.FAILED:
              this.stepCurrent = 1;
              break;
            case BillStatus.SUCCEEDED:
              this.stepCurrent = 2;
              break;
            case BillStatus.COMPLETED:
              this.stepCurrent = 3;
              break;
            default:
              this.stepCurrent = 1;
              break;
          }
          this.detailInfo = res;
        });
    });
  }
  useCoupon(id: string): void {}

  goBack() {
    this.location.back();
  }

  get getfapiaoImages() {
    if (this.detailInfo.fapiaoImages) {
      return JSON.parse(this.detailInfo.fapiaoImages);
    }
    return [];
  }

  preview() {
    let images = this.getfapiaoImages.map((url: any) => {
      return {
        src: url,
        width: '800px'
      };
    });
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }
  downLoad(key: number) {
    window.open(this.getfapiaoImages[key]);
  }
}
