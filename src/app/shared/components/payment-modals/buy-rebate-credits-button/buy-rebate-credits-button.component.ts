import { Component, OnInit } from '@angular/core';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, map, EMPTY } from 'rxjs';

import { BuyVoucherComponent } from '../buy-voucher/buy-voucher.component';

@Component({
  selector: 'app-buy-rebate-credits-button',
  templateUrl: './buy-rebate-credits-button.component.html',
  styleUrls: ['./buy-rebate-credits-button.component.css']
})
export class BuyRebateCreditsButtonComponent implements OnInit {
  buyVoucherModal = BuyVoucherComponent;
  constructor(private readonly overlayService: OverlayService) {}

  ngOnInit(): void {}

  public openModal(component: any, data: object = {}): Observable<boolean> | null {
    const ref = this.overlayService.open(
      component,
      { data },
      {
        panelClass: ['modal', 'rebate-modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }
}
