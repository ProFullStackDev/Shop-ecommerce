import { Component, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';

@Component({
  selector: 'app-profit',
  templateUrl: './profit.component.html',
  styleUrls: ['./profit.component.less']
})
export class ProfitComponent implements OnInit {
  constructor(private user: SystemUserService) {}
  countUpOptions: any = {
    decimalPlaces: 2,
    duration: 1
  };

  get userInfo() {
    return this.user.userInfo;
  }

  ngOnInit(): void {}
}
