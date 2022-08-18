import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.less']
})
export class OrderSuccessComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public goOrderList(): void {
    this.router.navigate(['/', 'member', 'order', 'list']);
  }

  public continueShopping(): void {
    this.router.navigate(['/']);
  }
}
