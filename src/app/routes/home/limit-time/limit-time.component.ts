import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-limit-time',
  templateUrl: './limit-time.component.html',
  styleUrls: ['./limit-time.component.less']
})
export class LimitTimeComponent implements OnInit {
  constructor() {}
  limtTimeUrl = `https://image.demo.b2b2c.shopxx.net/9.0/758a27cd-c951-4060-a821-ee0a0cc17ff3.jpg`;
  limtTimeList = [
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模 ',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模 ',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模 ',
      price: '5000',
      date: '3104天 06:38:42'
    },
    {
      url: `https://image.demo.b2b2c.shopxx.net/9.0/341feef8-de1b-4666-9151-fa23d3c3ce0b_thumbnail.jpg`,
      name: '小米 Redmi K30i 5G双模 ',
      price: '5000',
      date: '3104天 06:38:42'
    }
  ];

  ngOnInit(): void {}
}
