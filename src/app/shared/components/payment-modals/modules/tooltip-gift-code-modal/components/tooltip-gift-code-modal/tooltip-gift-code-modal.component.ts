import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';

@Component({
  selector: 'app-tooltip-gift-code-modal',
  templateUrl: './tooltip-gift-code-modal.component.html',
  styleUrls: ['./tooltip-gift-code-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipGiftCodeModalComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  isScrollable = false;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: ModalDto,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
  ) {
    super();
  }

  ngOnInit() {
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  closeModal(): void {
    this.close();
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
