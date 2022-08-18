import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MODAL_DATA} from "@shared/modules/modal/classes/modal-data";
import {ModalDto} from "@routes/dashboard/models/game-board";
import {CustomOverlayRef} from "@shared/modules/modal/classes/custom-overlay-ref";
import {FormControl} from "@angular/forms";
import {takeUntil} from "rxjs/operators";
import {DestroySubscription} from "@shared/helpers/destroy-subscription";

@Component({
  selector: 'app-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokensComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  public isScrollable = false;
  public converting = true;
  public inputRangeValue = new FormControl(0);

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: ModalDto,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef
  ) {
  }

  ngOnInit(): void {
  }

  public onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public closeModal(): void {
    this.close();
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
