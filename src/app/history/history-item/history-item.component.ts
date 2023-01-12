import {Component, Input} from '@angular/core';
import {Leftover} from "../../shared/_models/leftover.model";
import {OrdersService} from "../../shared/_services/orders.service";
import {WasteService} from "../../shared/_services/waste.service";
import {VoorraadService} from "../../shared/_services/voorraad.service";
import {User} from "../../shared/_models/user";
import {UserService} from "../../shared/_services/user.service";
import {NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {HistoryOffcanvasComponent} from "../history-offcanvas/history-offcanvas.component";
import {ArticleService} from "../../shared/_services/article.service";

interface onInit {
}

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent implements onInit {
  @Input() leftover: Leftover
  loading: boolean = true;
  employeeName: string;
  customerName: string;

  historyObject: any;

  constructor(private ordersService: OrdersService,
              private wasteService: WasteService,
              private voorraadService: VoorraadService,
              private userService: UserService,
              private offcanvasService: NgbOffcanvas,
              private articleService: ArticleService) {
  }


  ngOnInit() {
    if (this.leftover.type === 'order') {
      this.ordersService.getOrderByLeftoverID(this.leftover.id)
        .subscribe({
          next: response => {
            this.historyObject = response.payload;
            this.getUser();
            this.getCustomer();
          }
        })
    } else if (this.leftover.type === 'catWaste') {
      this.wasteService.getOneWasteByLeftoverID(this.leftover.id)
        .subscribe({
          next: response => {
            this.historyObject = response.payload;
            this.getUser();
            this.getCustomer();
          }
        })
    } else if (this.leftover.type === 'storage') {
      this.voorraadService.getOneVoorraadByLeftoverID(this.leftover.id)
        .subscribe({
          next: response => {
            this.historyObject = response.payload;
            this.getUser();
            this.getCustomer();
          }
        })
    } else {
      console.log("Something went very wrong!!")
    }
  }

  getUser() {
    console.log(this.historyObject)
    this.userService.getUsernameById(this.historyObject.userId)
      .subscribe({
        next: response => {
          this.employeeName = response.message;
          this.loading = false
        }
      })
  }

  getCustomer(){
    console.log(this.historyObject)
    this.articleService.getCustomerByArticle(this.historyObject.articleNumber).subscribe({
      next: response => {
        this.customerName = response.message;
        this.loading = false
      }
    })
  }

  openOffcanvas() {
    const offCanvas =  this.offcanvasService.open(HistoryOffcanvasComponent, {position: 'end'});
    offCanvas.componentInstance.historyObject = this.historyObject;
    offCanvas.componentInstance.articleNumber = this.leftover.artikelnummer;
  }
}
