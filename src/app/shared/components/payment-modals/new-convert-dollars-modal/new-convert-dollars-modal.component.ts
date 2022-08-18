import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WalletService } from '@core/services/user/wallet.service';
import { SystemCartService } from '@core/system/system-cart.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DepositStoreCreditComponent } from '@shared/components/payment-modals/deposit-store-credit/deposit-store-credit.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, map, EMPTY } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SuccessModalComponent } from '../success-modal/success-modal.component';

@Component({
  selector: 'app-new-convert-dollars-modal',
  templateUrl: './new-convert-dollars-modal.component.html',
  styleUrls: ['./new-convert-dollars-modal.component.scss']
})
export class NewConvertDollarsModalComponent extends DestroySubscription implements OnInit, AfterViewInit {
  successModal = SuccessModalComponent;
  minDollars: number;
  exchangeFee: number;
  range = new FormControl(null);
  dollarsConvert = new FormControl('slider.value',Validators.pattern("^[0-9]{3,45}$"));
  isFromDeposit: boolean = false;
  depositModal = DepositStoreCreditComponent;

  @ViewChild('scrollable') scrollable: ElementRef;
  public isScrollable = false;
  constructor(
    @Inject(MODAL_DATA) public readonly modalData: any,
    private readonly ref: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private walletService: WalletService,
    private readonly user: SystemUserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.walletService
      .queryTyqoonDollarExchangeBalanceConfig()
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(val => {
        this.minDollars = Number(val.minAmount);
        this.exchangeFee = val.exchangeFee;
        this.range.patchValue(this.minDollars);
      });
  }

  ngAfterViewInit(): void {
    if (this.modalData.data.from === 'from-deposit') {
      this.isFromDeposit = true;
    }
  }

  get userInfo() {
    return this.user.userInfo;
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public close() {
    this.ref.close(this.ref.backdropClickData);
  }

  get pointStatistics() {
    return this.user.cashBackData;
  }

  public openModal(component: any, data: object = {}): Observable<boolean> | null {
    if (this.isFromDeposit) {
      this.close();
    }
    const ref = this.overlayService.open(
      component,
      { data },
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  toMoveSlider() {
    this.range.patchValue(this.dollarsConvert.value);
  }

  convertDollars(value: any) {
    const amount = value;
    this.walletService
      .tyqoonDollarExchangeBalance({ amount })
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(() => {
        this.close();
        this.user.updateUserInfo();
      });
  }

  maxSlider() {
    this.range.patchValue(this.userInfo.point!);
  }
}
