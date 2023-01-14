import {Component, HostListener, Input} from '@angular/core';
import {Leftover} from "../../shared/_models/leftover.model";
import {OrdersService} from "../../shared/_services/orders.service";
import {WasteService} from "../../shared/_services/waste.service";
import {VoorraadService} from "../../shared/_services/voorraad.service";
import {UserService} from "../../shared/_services/user.service";
import {NgbModal, NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {HistoryOffcanvasComponent} from "../history-offcanvas/history-offcanvas.component";
import {ArticleService} from "../../shared/_services/article.service";
import {HistorymodalComponent} from "../historymodal/historymodal.component";

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
  isDesktop: boolean;
  screenLGSize: number = 992;


  constructor(private ordersService: OrdersService,
              private wasteService: WasteService,
              private voorraadService: VoorraadService,
              private userService: UserService,
              private offcanvasService: NgbOffcanvas,
              private articleService: ArticleService,
              private modalService: NgbModal) {
  }

  /**
   * this function checks the size of the window
   * and if its smaller than 992 px it sets this.dektop to false otherwise its true
   */
  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }

  /**
   * this function gets all the data from the database and saves it to the respectable variables
   * this all happens when this component is called
   */
  ngOnInit() {
    this.updateIsDesktop();
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

  /**
   * this function gets the username by the given userId
   */
  getUser() {
    this.userService.getUsernameById(this.historyObject.userId)
      .subscribe({
        next: response => {
          this.employeeName = response.message;
          this.loading = false
        }
      })
  }
  /**
   * this function gets the customer by the given articlenumber
   */
  getCustomer(){
    this.articleService.getCustomerByArticle(this.leftover.artikelnummer).subscribe({
      next: response => {
        this.customerName = response.message;
        this.loading = false
      }
    })
  }
  /**
   * this function opens the off canvas screen
   */
  openOffcanvas() {
    const offCanvas =  this.offcanvasService.open(HistoryOffcanvasComponent, {position: 'end'});
    offCanvas.componentInstance.historyObject = this.historyObject;
    offCanvas.componentInstance.articleNumber = this.leftover.artikelnummer;
    offCanvas.componentInstance.leftoverid = this.leftover.id;

  }
  /**
   * this function opens the Modal if the screen is getting to small
   */
  OpenModal(){
    const Modal = this.modalService.open(HistorymodalComponent,{size: "lg"});
    Modal.componentInstance.historyObject = this.historyObject;
    Modal.componentInstance.articleNumber = this.leftover.artikelnummer;
    Modal.componentInstance.leftoverid = this.leftover.id;
  }



}
