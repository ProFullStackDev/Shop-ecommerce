import { Component, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';

@Component({
  selector: 'app-my-rebate-credits',
  templateUrl: './my-rebate-credits.component.html',
  styleUrls: ['./my-rebate-credits.component.css']
})
export class MyRebateCreditsComponent implements OnInit {
  constructor(private userService: SystemUserService) {}

  ngOnInit(): void {}

  countUpOptions: any = {
    decimalPlaces: 2,
    duration: 1
  };

  get pointStatistics() {
    return this.userService.cashBackData;
  }
}
