import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { MissionsComponent } from '@routes/dashboard/modules/missions/components/missions/missions.component';
import { NftShopComponent } from '@routes/dashboard/modules/nft-shop/components/nft-shop/nft-shop.component';
import { AssetsList } from '@shared/models/assets.model';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { ASSETS_LIST } from '@shared/statics/assets/assets.static';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  public readonly assetsList: AssetsList[] = ASSETS_LIST;
  public readonly modalNftShop = NftShopComponent;
  countUpOptions: any = {
    decimalPlaces: 2,
    duration: 1
  };
  constructor(
    private readonly overlayService: OverlayService,
    private readonly user: SystemUserService,
    private userService: SystemUserService
  ) {}

  ngOnInit(): void {}

  get userInfo() {
    return this.user.userInfo;
  }

  get userNFT() {
    return this.user.getNFT;
  }

  get cashback() {
    return this.user.cashBackData;
  }

  get pointStatistics() {
    return this.userService.cashBackData;
  }

  openModal(component: any): void {
    let className;
    if (component === MissionsComponent) {
      className = 'missions-modal__wrap';
    }

    this.overlayService.open(
      component,
      {},
      {
        panelClass: ['modal', `${className ? className : null}`]
      }
    );
  }
}
