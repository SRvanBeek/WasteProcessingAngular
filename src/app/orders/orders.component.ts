import {Component, OnInit} from '@angular/core';
import {OrdersService} from "./orders.service";
import {Order} from "./order.model";
import {cutWaste} from "../shared/_models/cutWaste.model";
import {User} from "../shared/_models/user.model"
import {Waste} from "../waste-processing/waste.model";
import {Article} from "../shared/_models/article.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  order: Order | undefined;
  cutwaste: cutWaste | undefined;
  user: User | undefined;
  waste: Waste | undefined;
  article: Article | undefined;
  userList: User[];
  orderList: Order[];
  ordersList: String[];
  allOrdersList: String[][];
  checkedList: Order[] = [];
  isAdmin: boolean = false;

  constructor(public OrdersService: OrdersService) {
   this.getAllOrders()

  }

  ngOnInit() {
    this.setAdmin();
  }

  getAllOrders() {
    this.allOrdersList = [];
    this.OrdersService.getOrders().subscribe({
      next: value => {
        this.orderList = [];
        for (let order of value) {
          if (order.enabled) {
            this.orderList.push(order);
          }
          }
        for (let i = 0; i < this.orderList.length; i++) {
          this.ordersList = [];
          this.OrdersService.getUser(this.orderList[i].userId).subscribe({
            next: value1 => {
              this.ordersList.push(this.orderList[i].id.toString())
              this.ordersList.push(this.orderList[i].dateProcessed.toString())
              this.ordersList.push(value1.name)
            }
          })
          this.OrdersService.getArticleByOrderId(this.orderList[i].id).subscribe({
            next: value2 => {
              this.ordersList.push(value2.kleur.toString())
              this.ordersList.push(value2.leverancier)
            }
          })
          this.OrdersService.getCutWaste(this.orderList[i].cutwasteID).subscribe({
            next: value3 => {
              this.ordersList.push(value3.gewicht.toString())
              this.ordersList.push(value3.metrage.toString())
              this.ordersList.push(value3.type.toString())
              console.log(this.ordersList)
            }
          })
          this.allOrdersList.push(this.ordersList)
        }
        console.log(this.allOrdersList)

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

