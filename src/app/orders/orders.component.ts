import {Component, OnInit} from '@angular/core';
import {OrdersService} from "./orders.service";
import {Order} from "./order.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  order: Order | undefined;
  orderList: Order[];
  checkedList: Order[] = [];
  isAdmin: boolean = false;

  constructor(public OrdersService: OrdersService) {
   this.getAllOrders();
  }

  ngOnInit() {
    this.setAdmin();
  }

  getAllOrders() {

    this.OrdersService.getOrders().subscribe({
      next: value => {
        this.orderList = [];
        for (let order of value) {
          if (order.enabled) {
            this.orderList.push(order);
          }
          }

      },
      error: err => {
        console.log(err);
      }
    })
  }



  setAdmin(): void {
    let jwt = localStorage.getItem('JwtToken');
    if (jwt) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = window.atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      let roles = decodedJwtData.roles;
      this.isAdmin = roles[0] == 'ROLE_ADMIN';
    }
  }

  disableOrder() {
    if (confirm("Are you sure you want to disable these orders?")) {
      for (let order of this.checkedList) {
        this.OrdersService.disableOrderByID(order).subscribe();
      }
    }
    this.showOrder();
    this.showOrder();
  }

  showOrder() {
    for (let i = 1; i < 2; i++) {
      this.OrdersService.getArticleByOrderId(i).subscribe({
        next: value => {
          console.log(value.kleur);
        },
        error:err => {
          console.log(err);
        }

      })
    }
  }

  checked(order: Order) {
    return this.checkedList.includes(order);
  }

  onCheck(order: Order) {
    if (!this.checked(order)) {
      this.checkedList.push(order);
    } else {
      this.checkedList.splice(this.checkedList.indexOf(order), 1)
    }
  }
}

