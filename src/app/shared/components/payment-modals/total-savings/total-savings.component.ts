import { Component, OnInit } from '@angular/core';
import { SystemUserService } from '@core/system/system-user.service';

@Component({
  selector: 'app-total-savings',
  templateUrl: './total-savings.component.html',
  styleUrls: ['./total-savings.component.css']
})
export class TotalSavingsComponent implements OnInit {
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
