import { LocationStrategy } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NftService } from '@core/services/game/nft.service';
import { SystemUserService } from '@core/system/system-user.service';
import { ModalDto } from '@routes/dashboard/models/game-board';
import { InviteFriendsComponent } from '@routes/dashboard/modules/invite-friends/components/invite-friends/invite-friends.component';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import { BuildingType, NftShopListDto } from '@shared/models/nft-shop-modal.model';
import { CustomOverlayRef } from '@shared/modules/modal/classes/custom-overlay-ref';
import { MODAL_DATA } from '@shared/modules/modal/classes/modal-data';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { BuildShopsService } from '@shared/services/build-shops/build-shops.service';
import { LocalStorageService } from '@shared/services/localStorageService/local-storage.service';
import { NFT_SHOP_LIST } from '@shared/statics/nft-shop-modal/nft-shop.static';
import { isNullOrUndefined } from '@shared/utils/utils';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-nft-shop',
  templateUrl: './nft-shop.component.html',
  styleUrls: ['./nft-shop.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class NftShopComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollable') scrollable: ElementRef;

  public nft = false;
  public franchise = false;
  public canBuyFranchise = false;
  public superMarket = false;
  public mall = false;
  public canBuySuperMarket = false;
  public canBuyMall = false;
  public buildingType = BuildingType;

  public readonly nftShopList: NftShopListDto[] = NFT_SHOP_LIST;

  public isScrollable = false;

  constructor(
    @Inject(MODAL_DATA) public readonly modalData: ModalDto,
    @Inject(CustomOverlayRef) private readonly overlayRef: CustomOverlayRef,
    private readonly overlayService: OverlayService,
    private router: Router,
    private readonly url: LocationStrategy,
    private readonly localStorageService: LocalStorageService,
    private readonly user: SystemUserService,
    private readonly nftSrv: NftService,
    private readonly buildShopsService: BuildShopsService
  ) {
    super();
  }

  get userInfo() {
    return this.user.userInfo;
  }

  get userNFT() {
    return this.user.getNFT;
  }

  ngOnInit(): void {
    this.shopOwned();
  }

  public mergeShop(buildingType?: BuildingType): void {
    let value: any;
    switch (buildingType) {
      case 'franchise':
        value = 1;
        break;
      case 'superMarket':
        value = 2;
        break;
      case 'mall':
        value = 3;
        break;
    }
    this.nftSrv
      .merge({ mergeNftLevel: value })
      .subscribe(
        res => {
          // console.log('res', value);
          switch (value) {
            case 1:
              this.user.getNFTList(this.userNFT[0].numright - 4 + this.userNFT[1].numright);
              break;
            case 2:
              this.user.getNFTList(this.userNFT[0].numright + this.userNFT[1].numright - 4 + this.userNFT[2].numright);
              break;
            case 3:
              this.user.getNFTList(
                this.userNFT[0].numright + this.userNFT[1].numright + this.userNFT[2].numright - 4 + this.userNFT[3].numright
              );
              break;
          }
          this.user.updateUserInfo();
          // setTimeout(() => {
          //   this.user.getNFTList();
          // }, 5000);
        },
        error => {
          console.error(error);
        }
      )
      .add();
    let arr: any;
    switch (buildingType) {
      case BuildingType.Franchise:
        arr = BuildingType.Franchise;
        break;
      case BuildingType.SuperMarket:
        arr = BuildingType.SuperMarket;
        break;
      case BuildingType.Mall:
        arr = BuildingType.Mall;
        break;
    }
    console.log('查看数据内容', arr);
    this.buildShopsService.buildShop.next(this.buildShopsService.buildShop.getValue().concat([arr]));
    this.overlayRef.close(value);
    this.router.navigate(['/', 'gameboard']);
  }

  public onScroll(): void {
    this.isScrollable = this.scrollable.nativeElement.scrollTop;
  }

  public mycloseModal(): void {
    this.myclose();
  }

  public closeModal(buildingType?: BuildingType): void {
    if (!buildingType) {
      this.close();
    }
    if (buildingType === 'shop') {
      this.close(buildingType);
    } else {
      this.mergeShop(buildingType);
    }
  }

  public buyNft(value: string): void {
    switch (value) {
      case 'shop':
        this.nft = !this.nft;
        break;
      case 'franchise':
        this.franchise = !this.franchise;
        break;
      case 'superMarket':
        this.superMarket = !this.superMarket;
        break;
      case 'mall':
        this.mall = !this.mall;
        break;
      default:
        this.nft = !this.nft;
    }
  }

  public goBack(): void {
    this.nft = false;
    this.franchise = false;
    this.superMarket = false;
    this.mall = false;
  }

  public openInviteModal(): CustomOverlayRef<any> | null {
    this.mycloseModal();
    return this.overlayService.open(
      InviteFriendsComponent,
      {},
      {
        panelClass: ['modal']
      }
    );
  }

  private myclose(data: ModalDto | null = null): void {
    this.overlayRef.close(data);
  }

  private close(buildingType?: BuildingType): void {
    if (!this.overlayRef) {
      return;
    }

    // @ts-ignore
    let data;
    switch (buildingType) {
      case BuildingType.Shop:
        // console.log('BuildingType.Shop', buildingType);
        data = BuildingType.Shop;
        break;
      case BuildingType.Franchise:
        const arrayShop = this.buildShopsService.buildShop.getValue();
        for (let i = 0; i <= 3; i++) {
          const shopItem = arrayShop.findIndex(item => item === BuildingType.Shop);
          if (shopItem > -1) {
            arrayShop.splice(shopItem, 1);
          }
        }
        this.buildShopsService.buildShop.next(arrayShop);
        data = BuildingType.Franchise;
        break;
      case BuildingType.SuperMarket:
        const arraySuperMarket = this.buildShopsService.buildShop.getValue();
        for (let i = 0; i <= 3; i++) {
          const shopItem = arraySuperMarket.findIndex(item => item === BuildingType.Franchise);
          if (shopItem > -1) {
            arraySuperMarket.splice(shopItem, 1);
          }
        }
        this.buildShopsService.buildShop.next(arraySuperMarket);
        data = BuildingType.SuperMarket;
        break;
      case BuildingType.Mall:
        const arrayMall = this.buildShopsService.buildShop.getValue();
        for (let i = 0; i <= 3; i++) {
          const shopItem = arrayMall.findIndex(item => item === BuildingType.SuperMarket);
          if (shopItem > -1) {
            arrayMall.splice(shopItem, 1);
          }
        }
        this.buildShopsService.buildShop.next(arrayMall);
        data = BuildingType.Mall;
        break;
      default:
        data = null;
    }
    if (data !== null && !Object.is(data, undefined)) {
      if (this.url.path() !== '/gameboard') {
        this.overlayRef.close(data);
        this.router.navigate(['/', 'gameboard']);
        setTimeout(() => {
          this.buildShopsService.buildShop.next(
            // @ts-ignore
            this.buildShopsService.buildShop.getValue().concat([data])
          );
        }, 2000);
        return;
      }

      this.nftSrv
        .buy()
        .subscribe(
          res => {
            // setTimeout(() => {
            //   this.user.getNFTList();
            //   // this.user.updateUserInfo();
            // }, 5000);
            // console.log('res111111111111', this.userNFT);
            // this.user.setScrollTo(this.userNFT[0].numright);
            this.user.getNFTList(this.userNFT[0].numright);
            this.user.updateUserInfo();
          },
          error => {
            console.error(error);
          }
        )
        .add();
      console.log('查看data数据', data);
      this.buildShopsService.buildShop.next(this.buildShopsService.buildShop.getValue().concat([data]));
      this.router.navigate(['/', 'gameboard']);
      this.overlayRef.close(data);
    }
  }

  private shopOwned(): void {
    const firstRowItemIndex = this.nftShopList.findIndex(item => item.buildingType === BuildingType.Shop);
    const secondRowItemIndex = this.nftShopList.findIndex(item => item.buildingType === BuildingType.Franchise);
    const thirdRowItemIndex = this.nftShopList.findIndex(item => item.buildingType === BuildingType.SuperMarket);
    const fourthRowItemIndex = this.nftShopList.findIndex(item => item.buildingType === BuildingType.Mall);

    this.buildShopsService.buildShop.pipe(takeUntil(this.destroyStream$)).subscribe(val => {
      let shops = val.filter(item => {
        return item === BuildingType.Shop;
      });

      let franchise = val.filter(item => {
        return item === BuildingType.Franchise;
      });

      let superMarket = val.filter(item => {
        return item === BuildingType.SuperMarket;
      });

      let mall = val.filter(item => {
        return item === BuildingType.Mall;
      });

      this.nftShopList[firstRowItemIndex].ownedAfter = shops?.length;
      this.nftShopList[secondRowItemIndex].ownedBefore = shops?.length;

      this.nftShopList[secondRowItemIndex].ownedBefore = shops?.length;
      this.nftShopList[secondRowItemIndex].ownedAfter = franchise?.length;

      this.nftShopList[thirdRowItemIndex].ownedBefore = franchise?.length;
      this.nftShopList[thirdRowItemIndex].ownedAfter = superMarket?.length;

      this.nftShopList[fourthRowItemIndex].ownedBefore = superMarket?.length;
      this.nftShopList[fourthRowItemIndex].ownedAfter = mall?.length;

      if (shops?.length >= 4) {
        this.nftShopList[secondRowItemIndex].merge = false;
        this.canBuyFranchise = true;
      } else {
        this.nftShopList[secondRowItemIndex].merge = true;
        this.canBuyFranchise = false;
      }

      if (franchise?.length >= 4) {
        this.nftShopList[thirdRowItemIndex].merge = false;
        this.canBuySuperMarket = true;
      } else {
        this.nftShopList[thirdRowItemIndex].merge = true;
        this.canBuySuperMarket = false;
      }

      if (superMarket?.length >= 4) {
        this.nftShopList[fourthRowItemIndex].merge = false;
        this.canBuyMall = true;
      } else {
        this.nftShopList[fourthRowItemIndex].merge = true;
        this.canBuyMall = false;
      }
    });
  }
}
