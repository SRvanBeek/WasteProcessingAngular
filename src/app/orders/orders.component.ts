import {Component, OnInit} from '@angular/core';
import {OrdersService} from "./orders.service";
import {Order} from "./order.model";
import {cutWaste} from "../shared/_models/cutWaste.model";
import {User} from "../shared/_models/user.model"
import {Waste} from "../waste-processing/waste.model";

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
  userList: User[];
  orderList: Order[];
  cutWasteList: cutWaste[];
  cutWasteList2: cutWaste[];
  wasteList: Waste[];
  checkedList: Order[] = [];
  isAdmin: boolean = false;

  constructor(public OrdersService: OrdersService) {
    this.getAllOrders()
    this.getWaste()

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
            for (let i = 0; i < this.orderList.length; i++) {
              this.OrdersService.getUser(this.orderList[i].userID).subscribe({
                next: value1 => {
                  this.userList = [];
                  this.userList.push(value1)
                }
              })
            }
            for (let i = 0; i < this.orderList.length; i++) {
              this.OrdersService.getCutWaste(this.orderList[i].cutwasteID).subscribe(
                {
                  next: value2 => {
                    console.log(value2)
                    this.cutWasteList = [];
                    this.cutWasteList.push(value2);
                    console.log(this.cutWasteList[0].artikelnummer)

                  }
                }
              )
            }
            for (let i = 0; i < this.cutWasteList.length; i++) {
              this.OrdersService.getArticleById(this.cutWasteList[0].artikelnummer).subscribe({
                next: value3 => {
                  console.log(value3);
                }
              })
            }
          }
        }
      },
      error: err => {
        console.log(err);
      }
    });


  }

  getWaste() {
    this.OrdersService.getWaste().subscribe({
      next: value => {
        this.wasteList = [];
        for (let waste of value) {
          if (waste.enabled) {
            this.wasteList.push(waste);
            for (let i = 0; i < this.wasteList.length; i++) {
              this.OrdersService.getUser(this.wasteList[i].userID).subscribe({
                next: value1 => {
                  this.userList = []
                  this.userList.push(value1)

                }
              })
            }
            for (let i = 0; i < this.wasteList.length; i++) {
              this.OrdersService.getCutWaste(this.wasteList[i].cutwasteId).subscribe({
                next: value2 => {
                  this.cutWasteList2 = [];
                  this.cutWasteList2.push(value2);

                }
              })

            }
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
    this.OrdersService.getUser(1).subscribe(value => {
      console.log(value);
    })

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
