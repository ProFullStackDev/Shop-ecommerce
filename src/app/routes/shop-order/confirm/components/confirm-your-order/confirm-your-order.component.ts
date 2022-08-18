import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';

@Component({
  selector: 'app-confirm-your-order',
  templateUrl: './confirm-your-order.component.html',
  styleUrls: ['./confirm-your-order.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ConfirmYourOrderComponent {
  constructor(@Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef) {}

  close(data: 'confirm' | 'cancel') {
    this.overlayRef.close(data);
  }
}
