import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {Leftover} from "../../shared/_models/leftover.model";
import {OrdersService} from "../../shared/_services/orders.service";
import {WasteService} from "../../shared/_services/waste.service";
import {VoorraadService} from "../../shared/_services/voorraad.service";
import {UserService} from "../../shared/_services/user.service";
import {NgbModal, NgbOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {HistoryOffcanvasComponent} from "../history-offcanvas/history-offcanvas.component";
import {ArticleService} from "../../shared/_services/article.service";
import {HistorymodalComponent} from "../historymodal/historymodal.component";
import {LeftoverService} from "../../shared/_services/leftover.service";

interface onInit {
}

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent implements onInit {
  @Input() leftover: Leftover
  @Output() refresh = new EventEmitter<Leftover>();
  loading: boolean = true;
  employeeName: string;
  customerName: string;
  historyObject: any;
  isDesktop: boolean;
  screenLGSize: number = 992;
  isAdmin: boolean;

  constructor(private ordersService: OrdersService,
              private wasteService: WasteService,
              private voorraadService: VoorraadService,
              private userService: UserService,
              private offcanvasService: NgbOffcanvas,
              private articleService: ArticleService,
              private modalService: NgbModal,
              private leftoverService: LeftoverService) {
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
    this.setAdmin();
  }

  /**
   * this function disable the chosen history item and shows a pop up before you disable it.
   */
  disable(){
    if (confirm("Are you sure you want to disable this order?")) {
      this.leftoverService.putDisableLeftover(this.leftover).subscribe()
      this.refresh.emit(this.leftover);
    }

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
