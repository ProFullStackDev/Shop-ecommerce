import { Component, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';

@Component({
  selector: 'app-platform-total-savings',
  templateUrl: './platform-total-savings.component.html',
  styleUrls: ['./platform-total-savings.component.css']
})
export class PlatformTotalSavingsComponent implements OnInit {
  constructor(private userService: SystemUserService) {}

  countUpOptions: any = {
    decimalPlaces: 2,
    duration: 1
  };

  ngOnInit(): void {}

  get pointStatistics() {
    return this.userService.cashBackData;
  }
}
