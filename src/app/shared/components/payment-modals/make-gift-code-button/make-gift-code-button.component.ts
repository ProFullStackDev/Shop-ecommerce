import { Component, OnInit } from '@angular/core';
import { BuyGiftModalComponent } from '@shared/components/payment-modals/modules/buy-gift-modal/components/buy-gift-modal/buy-gift-modal.component';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, map, EMPTY } from 'rxjs';

@Component({
  selector: 'app-make-gift-code-button',
  templateUrl: './make-gift-code-button.component.html',
  styleUrls: ['./make-gift-code-button.component.css']
})
export class MakeGiftCodeButtonComponent implements OnInit {
  buyGiftModal = BuyGiftModalComponent;
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
