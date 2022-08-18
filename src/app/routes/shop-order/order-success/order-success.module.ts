import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderSuccessRoutingModule } from './order-success-routing.module';
import { OrderSuccessComponent } from './components/order-success/order-success.component';


@NgModule({
  declarations: [
    OrderSuccessComponent
  ],
  imports: [
    CommonModule,
    OrderSuccessRoutingModule
  ]
})
export class OrderSuccessModule { }
