import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { Observable, map, EMPTY } from 'rxjs';

import { NewConvertDollarsModalComponent } from '../new-convert-dollars-modal/new-convert-dollars-modal.component';

@Component({
  selector: 'app-deposit-store-credit',
  templateUrl: './deposit-store-credit.component.html',
  styleUrls: ['./deposit-store-credit.component.scss']
})
export class DepositStoreCreditComponent implements OnInit {
  convertDollarsModal = NewConvertDollarsModalComponent;
  @ViewChild('scrollable') scrollable: ElementRef;
  credits = new FormControl(null);
  public isScrollable = false;
  constructor(private readonly ref: CustomOverlayRef, private readonly overlayService: OverlayService) {}

  ngOnInit(): void {}

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public close() {
    this.ref.close(this.ref.backdropClickData);
  }

  public openModal(component: any, data: object = { from: 'from-deposit' }): Observable<boolean> | null {
    this.close();
    const ref = this.overlayService.open(
      component,
      { data },
      {
        panelClass: ['modal']
      }
    );

    return ref ? ref.afterClosed$.pipe(map(event => event.data)) : EMPTY;
  }

  roundingInput() {
    if(this.credits.value % 10) {
      this.credits.patchValue((Math.ceil(this.credits.value / 10)) * 10)
      
    }
  }
}
