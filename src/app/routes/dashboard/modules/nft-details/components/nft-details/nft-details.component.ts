import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { NftDetailsModel } from '@routes/dashboard/modules/nft-details/model/nft-details-model';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';

@Component({
  selector: 'app-nft-details',
  templateUrl: './nft-details.component.html',
  styleUrls: ['./nft-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NftDetailsComponent implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;
  detailsContent: NftDetailsModel;

  public withdraw = false;
  public success = false;
  public isScrollable = false;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: any,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef
  ) {}

  ngOnInit(): void {
    this.generateModalData();
    console.log(this.detailsContent);
  }

  public onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public closeModal(): void {
    this.close();
  }

  public toggleWithdraw() {
    this.withdraw = !this.withdraw;
  }

  public successWithdraw() {
    this.success = !this.success;
  }

  private generateModalData(): void {
    const type = this.modalData.modalType;
    switch (type) {
      case 'shop':
        this.detailsContent = new NftDetailsModel(
          'game-build-shop-one',
          'shopAnimated',
          'shop-one-description-one',
          'shop-one-description-two'
        );
        break;
      case 'franchise':
        this.detailsContent = new NftDetailsModel(
          'game-build-shop-two',
          'franchiseAnimated',
          'shop-two-description-one',
          'shop-two-description-two'
        );
        break;
      case 'superMarket':
        this.detailsContent = new NftDetailsModel(
          'game-build-shop-three',
          'supermarketAnimated',
          'shop-three-description-one',
          'shop-three-description-two'
        );
        break;
      case 'mall':
        this.detailsContent = new NftDetailsModel(
          'game-build-shop-four',
          'mallBuildAnimated',
          'shop-four-description-one',
          'shop-four-description-two'
        );
        break;
    }
  }

  private close(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }
}
