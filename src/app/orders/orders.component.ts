import {Component} from '@angular/core';
import {OrdersService} from "./orders.service";
import {Order} from "./order.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  order: Order | undefined
  orderList: Order[];
  checkedList: Order[] = [];

  constructor(public OrdersService: OrdersService) {
    this.OrdersService.getOrders().subscribe({
      next: value => {
        this.orderList = [];
        for (let order of value) {
          if (order.visibility) {
            this.orderList.push(order);
          }
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  disableOrder() {
    for (let order of this.checkedList) {
      console.log(order)
      // this.OrdersService.disableOrderByID(order).subscribe();
    }
  }

  showOrder() {
    this.OrdersService.getOrders().subscribe({
      next: value => {
        this.orderList = [];
        for (let order of value) {
          if (order.visibility) {
            this.orderList.push(order);
          }
        }
      },
      error: err => {
        console.log(err);
      }
    });
  }

  checked(order: Order) {
    let bool = this.checkedList.includes(order);
    console.log(bool)
    return bool;
  }

  onCheck(order: Order) {
    if (!this.checked(order)) {
      this.checkedList.push(order);
    } else {
      this.checkedList.splice(this.checkedList.indexOf(order), 1)
    }
  }
}
