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
import {LabelPreviewComponent} from "../../shared/label-preview/label-preview.component";
import {WasteLabelComponent} from "../../shared/waste-label/waste-label.component";
import {Waste} from "../../shared/_models/waste.model";
import {CategoryModel} from "../../shared/_models/category.model";
import {CategoryService} from "../../shared/_services/category.service";
import {formatDate} from "@angular/common";

interface onInit {
}

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.scss']
})
export class HistoryItemComponent implements onInit {
  @Input() leftover: Leftover;
  @Output() disableInfo = new EventEmitter<Leftover>();
  loading: boolean = true;
  employeeName: string;
  customerName: string;
  historyObject: any;
  category: any;
  isDesktop: boolean;
  screenLGSize: number = 992;
  isAdmin: boolean;

  constructor(private ordersService: OrdersService,
              private wasteService: WasteService,
              private categoryService: CategoryService,
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
            this.leftover.dateProc = formatDate(this.historyObject.dateProcessed, 'short', 'en-us');
            console.log(this.leftover.dateProc);
            this.getUser();
            this.getCustomer();
          }
        })
    } else if (this.leftover.type === 'catWaste') {
      this.wasteService.getOneWasteByLeftoverID(this.leftover.id)
        .subscribe({
          next: response => {
            this.historyObject = response.payload;
            this.leftover.dateProc = formatDate(this.historyObject.dateProcessed, 'short', 'en-us');
            console.log(this.leftover.dateProc);
            this.getUser();
            this.getCustomer();
            let waste : Waste = response.payload;
            this.categoryService.getCategoryNameById(waste.categoryId).subscribe(value => {
              let category: CategoryModel = value.payload;
              this.category = category.name;
            });
          }
        })

    } else if (this.leftover.type === 'storage') {
      this.voorraadService.getOneVoorraadByLeftoverID(this.leftover.id)
        .subscribe({
          next: response => {
            this.historyObject = response.payload;
            this.leftover.dateProc = formatDate(this.historyObject.dateProcessed, 'short', 'en-us');
            console.log(this.leftover.dateProc);
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
   * this function sends leftover info to the parent
   */
  disableSendInfo(){
    this.disableInfo.emit(this.leftover);
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
          this.leftover.employee = this.employeeName;
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
        this.leftover.customer = this.customerName;
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

  openLabelModal(){
    let modal;
    if (this.leftover.type === "catWaste") {
      modal = this.modalService.open(WasteLabelComponent, {size: "lg"});
      modal.componentInstance.category = this.category;
    } else {
      modal = this.modalService.open(LabelPreviewComponent, {size: "lg"});
    }
    modal.componentInstance.todo = this.leftover;
  }
}
