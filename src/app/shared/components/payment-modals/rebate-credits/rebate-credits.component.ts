import { Component, Input, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';

@Component({
  selector: 'app-rebate-credits',
  templateUrl: './rebate-credits.component.html',
  styleUrls: ['./rebate-credits.component.scss']
})
export class RebateCreditsComponent implements OnInit {
  countUpOptions: any = {
    decimalPlaces: 2,
    duration: 1
  };

  constructor(private userService: SystemUserService) { }

  ngOnInit(): void {
  }

  get pointStatistics() {
    return this.userService.cashBackData;
  }
}
