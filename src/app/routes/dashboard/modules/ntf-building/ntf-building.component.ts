import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';
import { GameBoardActions, Modals } from '@routes/dashboard/models/game-board';

@Component({
  selector: 'app-ntf-building',
  templateUrl: './ntf-building.component.html',
  styleUrls: ['./ntf-building.component.less'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NtfBuildingComponent implements OnInit {
  @Input() initBuilding: any;
  @Input() showAnimate: boolean;
  modalInviteFriends = Modals.InviteFriends;
  modalNftShop = Modals.NftShop;
  public show = true;
  constructor(private readonly user: SystemUserService) {}
  @Output() private readonly send = new EventEmitter<String>();

  ngOnInit(): void {
    setTimeout(() => {
      // this.show = false;
      this.initBuilding.unshow = true;
    }, 5000);

    // console.log('111111111111', this.initBuilding);
  }

  public openModal() {
    const type = this.initBuilding.type;
    switch (type) {
      case 'shop':
        this.send.emit('shop');
        break;
      case 'franchise':
        this.send.emit('franchise');
        break;
      case 'superMarket':
        this.send.emit('superMarket');
        break;
      case 'mall':
        this.send.emit('mall');
        break;
    }
  }
}
