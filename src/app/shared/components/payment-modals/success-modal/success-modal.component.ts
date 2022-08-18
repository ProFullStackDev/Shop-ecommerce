import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.css']
})
export class SuccessModalComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;
  public isScrollable = false;
  constructor(private readonly ref: CustomOverlayRef) { }

  ngOnInit(): void {
  }

  onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public close() {
    this.ref.close(this.ref.backdropClickData);
  }
}
