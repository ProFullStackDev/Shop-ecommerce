import { Component, Inject, OnInit } from '@angular/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { HeaderService } from '@shared/components/header/services/header.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.less']
})
export class AccountMenuComponent extends DestroySubscription implements OnInit {
  constructor(private readonly headerService: HeaderService, @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef) {
    super();
  }

  ngOnInit(): void {
    this.headerService.closeMenuTrigger$.pipe(takeUntil(this.destroyStream$)).subscribe((val: any) => {
      if (val) {
        this.closeMenu();
      }
    });
  }

  closeMenu(): void {
    this.close();
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
