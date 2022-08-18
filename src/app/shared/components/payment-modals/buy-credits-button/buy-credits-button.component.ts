import { Component, OnInit } from '@angular/core';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, map, EMPTY } from 'rxjs';

import { BuyCreditsModalComponent } from '../modules/buy-credits-modal/components/buy-credits-modal/buy-credits-modal.component';
import { DepositStoreCreditComponent } from '../deposit-store-credit/deposit-store-credit.component';

@Component({
  selector: 'app-buy-credits-button',
  templateUrl: './buy-credits-button.component.html',
  styleUrls: ['./buy-credits-button.component.css']
})
export class BuyCreditsButtonComponent implements OnInit {
  buyCreditsModal = BuyCreditsModalComponent;
  depositStoreCreditModal = DepositStoreCreditComponent;
  constructor(private readonly overlayService: OverlayService) {}

  ngOnInit(): void {
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

}
