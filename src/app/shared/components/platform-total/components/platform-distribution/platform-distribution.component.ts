import { Component, OnInit } from '@angular/core';
import { SystemCommissionService } from '@core/system/system-commission.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-platform-distribution',
  templateUrl: './platform-distribution.component.html',
  styleUrls: ['./platform-distribution.component.css']
})
export class PlatformDistributionComponent implements OnInit {
  myTotalDividend$: Observable<any>;
  constructor(private readonly systemCommissionService: SystemCommissionService) {}

  ngOnInit(): void {
    this.myTotalDividend$ = this.getMyTotalDividend();
  }

  getMyTotalDividend(): Observable<any> {
    return this.systemCommissionService.myTotalDividend().pipe(map(response => response.prizeTotal));
  }
}
