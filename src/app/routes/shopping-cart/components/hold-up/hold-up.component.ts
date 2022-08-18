import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';

@Component({
  selector: 'app-hold-up',
  templateUrl: './hold-up.component.html',
  styleUrls: ['./hold-up.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class HoldUpComponent implements OnInit {
  constructor(
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    @Inject(MODAL_DATA) public readonly modalData: any
  ) {}

  continueCheckout() {
    this.closeModal('checkout');
  }

  getVouchers() {
    this.closeModal('getVouchers');
  }

  closeModal(data: string) {
    this.overlayRef.close(data);
  }

  ngOnInit(): void {
    console.log(this.modalData);
  }
}
