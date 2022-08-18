import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SystemUserService } from '@core/system/system-user.service';
import { TyqoonDollarsComponent as TyqoonModal } from '@routes/dashboard/modules/tyqoon-dollars/components/tyqoon-dollars/tyqoon-dollars.component';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, map, EMPTY } from 'rxjs';

import { TooltipGiftCodeModalComponent } from '../modules/tooltip-gift-code-modal/components/tooltip-gift-code-modal/tooltip-gift-code-modal.component';

@Component({
  selector: 'app-tyqoon-dollars',
  templateUrl: './tyqoon-dollars.component.html',
  styleUrls: ['./tyqoon-dollars.component.scss']
})
export class TyqoonDollarsComponent implements OnInit {
  @Input() inAccountMenu: boolean = false;
  earnDollarsModal = TyqoonModal;
  tooltipGiftCodeModal = TooltipGiftCodeModalComponent;
  giftCode: string = '';
  toggleDropdown = false;
  countUpOptions: any = {
    decimalPlaces: 2,
    duration: 1
  };

  constructor(private readonly overlayService: OverlayService, private readonly user: SystemUserService, private readonly router: Router) {}

  ngOnInit(): void {}

  get userInfo() {
    return this.user.userInfo;
  }

  get cashback() {
    return this.user.cashBackData;
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

  toggleDropDown(): void {
    if (this.inAccountMenu) {
      this.router.navigate(['/', 'member', 'point']);
      return;
    }
    this.toggleDropdown = !this.toggleDropdown;
  }
}
