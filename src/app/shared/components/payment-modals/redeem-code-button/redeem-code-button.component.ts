import { Component, OnInit } from '@angular/core';
import { UserOrderService } from '@core/services/user/order.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, map, EMPTY } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { RedeemCodeModalComponent } from '../modules/redeem-code-modal/components/redeem-code-modal/redeem-code-modal.component';

@Component({
  selector: 'app-redeem-code-button',
  templateUrl: './redeem-code-button.component.html',
  styleUrls: ['./redeem-code-button.component.css']
})
export class RedeemCodeButtonComponent extends DestroySubscription implements OnInit {
  redeemCodeModal = RedeemCodeModalComponent;
  constructor(private readonly overlayService: OverlayService, private readonly orderSrv: UserOrderService) {
    super();
  }

  ngOnInit(): void {}

  public openRedeemCodeModal(data: object = {}) {
    this.openModal(RedeemCodeModalComponent, data)
      ?.pipe(takeUntil(this.destroyStream$))
      .subscribe(() => {
        this.orderSrv.giftCodesAll$.next([]);
        this.orderSrv.loading$.next({ query: false });
        this.orderSrv.total$.next(0);
        const today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        this.orderSrv.getExchangeCode(tomorrow, 1, 10);
      });
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
