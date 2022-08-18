import { Component, OnInit } from '@angular/core';
import { SystemCommissionService } from '@core/system/system-commission.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-platform-payout',
  templateUrl: './platform-payout.component.html',
  styleUrls: ['./platform-payout.component.css']
})
export class PlatformPayoutComponent implements OnInit {
  totalDevidend$: Observable<any>;

  constructor(private readonly systemCommissionService: SystemCommissionService) {}

  ngOnInit(): void {
    this.totalDevidend$ = this.getTotalDividend();
  }

  getTotalDividend(): Observable<any> {
    return this.systemCommissionService.totalDividend().pipe(
      map(data => data.prizeTotal),
      catchError(() => {
        return of('0');
      })
    );
  }
}
