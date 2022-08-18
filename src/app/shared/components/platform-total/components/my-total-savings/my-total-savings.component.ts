import { Component, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';

@Component({
  selector: 'app-my-total-savings',
  templateUrl: './my-total-savings.component.html',
  styleUrls: ['./my-total-savings.component.css']
})
export class MyTotalSavingsComponent implements OnInit {
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
