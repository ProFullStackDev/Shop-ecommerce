import { Component, OnInit } from '@angular/core';
import { OverlayService } from '@shared/modules/modal/services/overlay.service';
import { EMPTY, map, Observable } from 'rxjs';

import { BuyGiftModalComponent } from '../modules/buy-gift-modal/components/buy-gift-modal/buy-gift-modal.component';
import { RedeemCodeModalComponent } from '../modules/redeem-code-modal/components/redeem-code-modal/redeem-code-modal.component';

@Component({
  selector: 'app-giftcode',
  templateUrl: './giftcode.component.html',
  styleUrls: ['./giftcode.component.scss']
})
export class GiftcodeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
