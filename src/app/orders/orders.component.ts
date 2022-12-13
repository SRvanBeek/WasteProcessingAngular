import {Component, OnInit} from '@angular/core';
import {OrdersService} from "./orders.service";
import {Order} from "./order.model";
import {cutWaste} from "../shared/_models/cutWaste.model";
import {User} from "../shared/_models/user.model"
import {Waste} from "../waste-processing/waste.model";
import {Article} from "../shared/_models/article.model";
import {voorraad} from "../shared/_models/voorraad.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  order: Order | undefined;
  cutWaste: cutWaste | undefined;
  user: User | undefined;
  waste: Waste | undefined;
  article: Article | undefined;
  userList: User[];
  orderList: Order[];
  ordersList: String[];
  allOrdersList: String[][];
  voorraadList: voorraad[];
  voorradenList: String[];
  voorraad: String[][];
  checkedList: Order[] = [];
  isAdmin: boolean = false;

  constructor(public OrdersService: OrdersService) {
   this.getAllOrders();
   //this.getAllVoorraad();
  }

  ngOnInit() {
    this.setAdmin();
  }

  getAllOrders() {

    this.OrdersService.getOrders().subscribe({
      next: value => {
        this.orderList = [];
        this.ordersList = [];
        this.allOrdersList = [];
        for (let order of value) {
          if (order.enabled) {
            this.orderList.push(order);
          }
          }
        for (let i = 0; i < this.orderList.length; i++) {
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
              this.allOrdersList.push(this.ordersList)
              console.log(this.allOrdersList)
            }
          })
          for (let j = 0; this.ordersList.length < j; j++) {
            this.ordersList = this.ordersList.splice(j)
          }
        }


      },
      error: err => {
        console.log(err);
      }
    })
  }

  getAllVoorraad(){
    this.OrdersService.getVoorraad().subscribe({
      next: value => {
        this.voorraadList = [];
        this.voorradenList = [];
        this.voorraad = [];
        for (let voorraad of value) {
          if (voorraad.enabled) {
            this.voorraadList.push(voorraad);
          }
        }
        for (let i = 0; i < this.voorraadList.length; i++) {
          this.OrdersService.getUser(this.voorraadList[i].userID).subscribe({
            next: value1 => {
              this.voorradenList.push(this.orderList[i].id.toString())
              this.voorradenList.push(this.orderList[i].dateProcessed.toString())
              this.voorradenList.push(value1.name)
            }
          })
          this.OrdersService.getArticleByOrderId(this.voorraadList[i].id).subscribe({
            next: value2 => {
              this.voorradenList.push(value2.kleur.toString())
              this.voorradenList.push(value2.leverancier)
            }
          })
          this.OrdersService.getCutWaste(this.voorraadList[i].cutwasteID).subscribe({
            next: value3 => {
              this.voorradenList.push(value3.gewicht.toString())
              this.voorradenList.push(value3.metrage.toString())
              this.voorradenList.push(value3.type.toString())
              this.voorraad.push(this.voorradenList)
              console.log(this.voorradenList)
            }
          })
          for (let j = 0; this.ordersList.length < j; j++) {
            this.ordersList = this.ordersList.splice(j)
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

