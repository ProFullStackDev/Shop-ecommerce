import { Component, OnInit } from '@angular/core';
import { TyqoonDollarsComponent as TyqoonModal } from '@routes/dashboard/modules/tyqoon-dollars/components/tyqoon-dollars/tyqoon-dollars.component';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, map, EMPTY } from 'rxjs';
import { NewConvertDollarsModalComponent } from '../new-convert-dollars-modal/new-convert-dollars-modal.component';

@Component({
  selector: 'app-covert-dollars-button',
  templateUrl: './covert-dollars-button.component.html',
  styleUrls: ['./covert-dollars-button.component.css']
})
export class CovertDollarsButtonComponent implements OnInit {
  earnDollarsModal = TyqoonModal;
  newConvertDollarsModal = NewConvertDollarsModalComponent;
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
