import {Component} from '@angular/core';
import {OrdersService} from "./orders.service";
import {Order} from "./order.model";
import {map} from "rxjs";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  order: Order | undefined
  orderList: Order[];

  constructor(public OrdersService: OrdersService) {
  }


  showOrder() {
    this.OrdersService.getOrders().subscribe({
      next: value => {
        console.log(value)
        this.orderList = value;
        // this.orderList = <Order[]>JSON.parse(value)
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
