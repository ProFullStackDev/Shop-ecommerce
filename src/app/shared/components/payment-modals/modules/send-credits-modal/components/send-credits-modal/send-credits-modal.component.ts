import {ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {DestroySubscription} from "@shared/helpers/destroy-subscription";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MODAL_DATA} from "@shared/modules/modal/classes/modal-data";
import {ModalDto} from "@routes/dashboard/models/game-board";
import {CustomOverlayRef} from "@shared/modules/modal/classes/custom-overlay-ref";
import {OverlayService} from "@shared/modules/modal/services/overlay.service";
import {TranslateService} from "@ngx-translate/core";
import {PaymentModalsService} from "@shared/components/payment-modals/services/payment-modals.service";
import {ButtonType} from "@shared/components/payment-modals/models/payment-modals.model";

@Component({
  selector: 'app-send-credits-modal',
  templateUrl: './send-credits-modal.component.html',
  styleUrls: ['./send-credits-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendCreditsModalComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  isScrollable = false;
  form: FormGroup;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: ModalDto,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private translate: TranslateService,
    private paymentModalsService: PaymentModalsService,
    private readonly fb: FormBuilder
  ) {
    super();
    this.initForm();
  }

  ngOnInit() {
  }

  private initForm(): void {
    const fb = this.fb;
    this.form = fb.group({
      amountOfCredits: fb.control(null, [Validators.required, Validators.min(1)]),
      username: fb.control(null, [Validators.required])
    });
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  closeModal(): void {
    this.close();
  }

  sendData(): void {
    if (!this.form.valid) {
      return;
    }

    const data = {
      amount: this.form.get('amountOfCredits')?.value,
      username: this.form.get('username')?.value
    };

    this.paymentModalsService.sendCreditsData(data);
    this.closeModal();
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
