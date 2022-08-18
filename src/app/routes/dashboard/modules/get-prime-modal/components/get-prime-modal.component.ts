import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MyProfileModalComponent } from '@routes/dashboard/modules/my-profile-modal/components/my-profile-modal/my-profile-modal.component';
import { PlanList } from '@shared/models/get-prime-modal.model';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { PLAN_LIST } from '@shared/statics/get-prime-modal/get-prime-modal.static';
import { generateOrderConfirmParams } from '@shared/utils/utils';

@Component({
  selector: 'app-get-prime-modal',
  templateUrl: './get-prime-modal.component.html',
  styleUrls: ['./get-prime-modal.component.css']
})
export class GetPrimeModalComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  public readonly planList: PlanList[] = PLAN_LIST;

  public isScrollable = false;
  public prime = false;

  public plansControl = new FormControl(null);

  constructor(
    @Inject(MODAL_DATA) public modalData: any,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private readonly router: Router,
    private translateSrv: TranslateService
  ) {}

  ngOnInit(): void {}

  public setPlan(selectedPlan: string): void {
    this.plansControl.patchValue(selectedPlan);
  }

  public onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public closeModal(): void {
    this.close();
  }

  public openProfileModal(value?: string): any | null {
    // jump to order confirm page
    if (value) {
      const targetPlan = this.planList.find(plan => Object.is(plan.skuId, value));
      if (!targetPlan) return;
      console.log(this.translateSrv.instant(targetPlan.type));
      this.router.navigate(['/order/confirm'], {
        queryParams: generateOrderConfirmParams([
          {
            storeId: '1',
            productOrder: [
              {
                skuId: value,
                quantity: 1,
                cover: targetPlan.image,
                productName: this.translateSrv.instant(targetPlan.type)
              }
            ]
          }
        ])
      });
      return;
    }
    if (!this.modalData.productPage) {
      // const data = Object.keys(value).length ? { prime: value } : {};
      this.closeModal();
      return this.overlayService.open(
        MyProfileModalComponent,
        {},
        {
          panelClass: ['modal']
        }
      );
    }

    return this.overlayRef.close({ prime: value });
  }

  private close(data: any | null = null): void {
    this.overlayRef.close(data);
  }
}
