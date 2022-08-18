import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StatisticsService } from '@core/services/user/statistics.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  constructor(private router: Router, private statisticsService: StatisticsService) {}
  wordsTitleOrder: string = '我的订单';
  wordsTitleProduct: string = '商品收藏';
  wordsTitleStore: string = '店铺收藏';
  moreWords: string = 'index';
  routerLinkOrder: string = '/member/order';
  routerLinkProduct: string = '';
  routerLinkStore: string = '';

  orderList: any[] = [];
  productList: any[] = [];
  storeList: any[] = [];
  ngOnInit(): void {
    this.getUserStatistics();
  }
  getUserStatistics(): void {
    const params = {
      page: 0,
      rows: 3
    };
    this.statisticsService.getUserStatistics(params).subscribe(res => {
      this.orderList = res.orders;
      this.productList = res.products;
      this.productList.map(item => {});
      this.storeList = res.store;
    });
  }
}
