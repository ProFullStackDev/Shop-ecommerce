import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { WalletService } from '@core/services/user/wallet.service';
import { SystemUserService } from '@core/system/system-user.service';
import { DestroySubscription } from '@shared/helpers/destroy-subscription';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blance',
  templateUrl: './blance.component.html',
  styleUrls: ['./blance.component.less']
})
export class BlanceComponent extends DestroySubscription implements OnInit {
  @ViewChild('scrollingContainer') scrollingContainer: ElementRef;

  isTableStartPosition = false;
  constructor(private router: Router, private walletService: WalletService, private userSrv: SystemUserService) {
    super();
  }
  balanceData: any[] = [];
  beginTime: string = '';
  endTime: string = '';
  type: string = '';

  get memberInfo() {
    return this.userSrv.userInfo;
  }

  ngOnInit(): void {
    this.getList('');
  }
  getList(type: string): void {
    this.type = type;
    const params = {
      page: 0,
      rows: 10,
      type: this.type
    };
    this.walletService
      .deposit(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.balanceData = res.rows;
      });
  }
  search(): void {
    const params = {
      page: 0,
      rows: 10,
      beginTime: this.beginTime ? moment(this.beginTime).format('YYYY-MM-DD') : '',
      endTime: this.endTime ? moment(this.endTime).format('YYYY-MM-DD') : '',
      type: this.type
    };
    this.walletService
      .point(params)
      .pipe(takeUntil(this.destroyStream$))
      .subscribe(res => {
        this.balanceData = res.rows;
      });
  }

  startTouching(): void {
    this.isTableStartPosition = this.scrollingContainer.nativeElement.scrollLeft === 0;
  }

  checkTouching(e: TouchEvent): void {
    if (this.isTableStartPosition) {
      return;
    }

    e.stopPropagation();
  }
}
