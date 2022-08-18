import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SystemUserService } from '@core/system/system-user.service';
import { GetPrimeModalComponent } from '@routes/dashboard/modules/get-prime-modal/components/get-prime-modal.component';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tyqoon-dollars',
  templateUrl: './tyqoon-dollars.component.html',
  styleUrls: ['./tyqoon-dollars.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TyqoonDollarsComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;
  countUpOptions: any = {
    decimalPlaces: 2,
    duration: 1
  };
  public isScrollable = false;
  public prime = false;

  constructor(
    @Inject(MODAL_DATA) public modalData: any,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly router: Router,
    private readonly overlayService: OverlayService,
    private readonly user: SystemUserService
  ) {}

  ngOnInit(): void {}

  get userInfo() {
    return this.user.userInfo;
  }

  get showPrime() {
    return this.user.showPrime;
  }

  navToShop() {
    this.router.navigate(['/']);
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  closeModal(): void {
    this.close();
  }

  openPrimeModal(): Observable<boolean> | null {
    this.closeModal();
    const ref = this.overlayService.open(
      GetPrimeModalComponent,
      {},
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  private close(data: any | null = null): void {
    this.overlayRef.close(data);
  }
}
