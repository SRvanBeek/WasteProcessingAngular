import { Component } from '@angular/core';
import {OrdersService} from "./orders.service";
import {OrdersInterface} from "./orders-interface";
import {Orders} from "./orders.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  order: Orders | undefined;
  orderlist: String[] = [];
  orderstring: string = '';

  constructor(public OrdersService: OrdersService) {
  }

  showOrder(){
    this.OrdersService.getOrders().subscribe({
      next: value => {
        for (let i = 0; i < value.split(',').length; i++) {
          let splitted = value.split(",");
          let split = splitted[i].toString().replace("[", '').replace('{', '').replace('}', '').replace("]", '');
          console.log(split);
          this.orderlist.push(split);
          console.log(this.orderlist);


        }
      },
      error: err => {
        console.log(err);
      }
    });
  }


}
