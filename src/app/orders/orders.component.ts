import { Component } from '@angular/core';
import {OrdersService} from "./orders.service";
import {OrdersInterface} from "./orders-interface";
import {Order} from "./order.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  order: Order | undefined
  orderList: Order[];
  orderstring: string = '';

  constructor(public OrdersService: OrdersService) {
  }

  showOrder(){
    this.OrdersService.getOrders().subscribe({
      next: value => {
        this.orderList  = <Order[]>JSON.parse(value)


      },
      error: err => {
        console.log(err);
      }
    });
  }


}
