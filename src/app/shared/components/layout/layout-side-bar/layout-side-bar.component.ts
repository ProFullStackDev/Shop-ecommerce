import { Component } from '@angular/core';
import { SystemCartService } from '@core/system/system-cart.service';

@Component({
  selector: 'app-layout-side-bar',
  templateUrl: './layout-side-bar.component.html',
  styleUrls: ['./layout-side-bar.component.less']
})
export class LayoutSideBarComponent {
  constructor(private cartSrv: SystemCartService) {}

  get cartCount() {
    return this.cartSrv.cartCount;
  }
}
