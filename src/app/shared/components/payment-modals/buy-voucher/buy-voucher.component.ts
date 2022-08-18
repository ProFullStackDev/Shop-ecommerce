import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductSkuPOM } from '@core/services/shop/product.service';
import { UserCartService } from '@core/services/user/cart.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { SystemVoucherService } from '@core/system/system-voucher.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, map, EMPTY } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CustomOverlayRef } from '../../../modules/modal/classes/custom-overlay-ref';
import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-buy-voucher',
  templateUrl: './buy-voucher.component.html',
  styleUrls: ['./buy-voucher.component.css']
})
export class BuyVoucherComponent extends DestroySubscription implements OnInit {
  successModal = SuccessModalComponent;
  @ViewChild('scrollable') scrollable: ElementRef;
  public isScrollable = false;
  creditsReceive: any;

  voucherNum = 1;
  voucherSkuId = this.voucherService.skuId;
  voucherItem!: ProductSkuPOM;
  voucherValue = this.voucherItem?.price || 50;

  constructor(
    private readonly ref: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private userService: SystemUserService,
    public voucherService: SystemVoucherService,
    private userCartSrv: UserCartService,
    private sysCartSrv: SystemCartService
  ) {
    super();
  }

  ngOnInit(): void {}

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  get pointStatistics() {
    return this.userService.cashBackData;
  }

  public close() {
    this.ref.close(this.ref.backdropClickData);
  }

  public openModal(component: any, data: object = {}): Observable<boolean> | null {
    const ref = this.overlayService.open(
      component,
      { data },
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  changeVoucherNum(num: number) {
    this.voucherNum = Math.max(0, this.voucherNum + num);
  }

  buyNow(value: number): void {
    this.userCartSrv
      .cartItemModify({ skuId: '100', quantity: this.voucherNum })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(
        () => {
          this.sysCartSrv.cardVoucher$.next(value);
          this.sysCartSrv.cardAction$.next(true);
          this.close();
        },
        error => {
          console.error(error);
        }
      );
  }
}
