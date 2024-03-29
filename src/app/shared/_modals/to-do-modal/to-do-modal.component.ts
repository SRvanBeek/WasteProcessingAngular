import {Component, Input, OnInit} from '@angular/core';
import {Leftover} from "../../_models/leftover.model";
import {ArticleService} from "../../_services/article.service";
import {Article} from "../../_models/article";
import {LeftoverService} from "../../_services/leftover.service";
import {OrdersService} from "../../_services/orders.service";
import {WasteService} from "../../_services/waste.service";
import {CategoryService} from "../../_services/category.service";
import {VoorraadService} from "../../_services/voorraad.service";
import {Waste} from "../../_models/waste.model";
import {Voorraad} from "../../_models/voorraad";
import {Order} from "../../_models/order.model";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {LabelPreviewComponent} from "../../label-preview/label-preview.component";
import {CustomerService} from "../../_services/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WasteLabelComponent} from "../../waste-label/waste-label.component";
import {CategoryModel} from "../../_models/category.model";

/**
 * @Author Dino Yang, Roy van Delft
 */
@Component({
  selector: 'app-to-do-modal',
  templateUrl: './to-do-modal.component.html',
  styleUrls: ['./to-do-modal.component.scss']
})
export class ToDoModalComponent implements OnInit {
  @Input() list: Leftover[];
  @Input() todo: Leftover;
  @Input() userId: number;
  @Input() type: string;
  article: Article;
  category: any;
  downloaded: boolean;

  constructor(private articleService: ArticleService, private leftoverService: LeftoverService,
              private orderService: OrdersService, private wasteService: WasteService,
              private categoryService: CategoryService, private voorraadService: VoorraadService, public activeModal: NgbActiveModal, private customerService: CustomerService, public modalService: NgbModal) {
  }

  /**
   * disables the download button upon initiation, unless the type of the article is 'storage, and sets the current article based on the article ID
   * also checks for the category of the selected article
   */
  ngOnInit(): void {
    this.downloaded = false
    if (this.todo.type == 'storage')
      this.downloaded = true;
    this.setArticle(this.todo.artikelnummer);
    this.checkcategory()
  }

  /**
   * setArticle() sets article with the article that is connected to the selected cutWaste.
   * @param id of the article
   */
  setArticle(id: string) {
    this.articleService.getOneArticle(id)
      .subscribe(value => {
        this.article = value.payload;
            })
  }

  /**
   * Checks the category of the current leftover with the type 'catWaste', to fill in for the waste label
   */
  checkcategory() {
    if (this.type === "catWaste") {
      this.wasteService.getOneWasteByLeftoverID(this.todo.id).subscribe(value => {
        let waste: Waste = value.payload;
        this.categoryService.getCategoryNameById(waste.categoryId).subscribe(value => {
          let category: CategoryModel = value.payload;
          this.category = category.name;
        })
      })
    }
  }

  /**
   * done() sets the processed attribute of the selected cutWaste to true and updates the catWaste/storage/order with the right userId, date and enabled.
   */
  done() {
    if(this.todo.type != 'storage' && this.todo.type != 'catWaste') {
      this.openPreview()
    }
    if(this.todo.type == 'catWaste'){
      this.openPreviewWaste()
    }
    this.downloaded = true;
    if (this.downloaded || this.todo.type == 'storage') {
    this.leftoverService.getOneLeftover(this.todo.id).subscribe(value => {
      let leftover: Leftover = value.payload;
      leftover.processed = true;
      this.leftoverService.putLeftover(leftover).subscribe();
    })
    if (this.todo.type == 'catWaste') {
      this.wasteService.getOneWasteByLeftoverID(this.todo.id).subscribe(value => {
        let waste: Waste = value.payload;
        waste.userId = this.userId;
        waste.dateProcessed = Date.now();
        waste.enabled = true;
        this.wasteService.putWaste(waste).subscribe();
      });
    } else if (this.todo.type == 'storage') {
      this.voorraadService.getOneVoorraadByLeftoverID(this.todo.id).subscribe(value => {
        let voorraad: Voorraad = value.payload;
        voorraad.userId = this.userId;
        voorraad.dateProcessed = Date.now();
        voorraad.enabled = true;
        this.voorraadService.putVoorraad(voorraad).subscribe();
      })
    } else {
      this.orderService.getOrderByLeftoverID(this.todo.id).subscribe(value => {
        let order: Order = value.payload;
        order.userId = this.userId;
        order.dateProcessed = Date.now();
        order.enabled = true;
        this.orderService.putOrder(order).subscribe();
      })
    }
    let outputList = this.list.filter(leftover => {
      return leftover.id !== this.todo.id;
    })
    this.activeModal.close(outputList);
  }}

  /**@author Roy van Delft
   * Opens a dialog window of the order label, filled with the data of the selected order. Also fetches the customer data on the selected leftover ID.
   * Also checks if the download button has been pressed, to enable the 'Done!' button
   */
  openPreview() {
    const labelModal = this.modalService.open(LabelPreviewComponent)
    labelModal.componentInstance.todo=this.todo
    this.customerService.getCustomerByLeftoverID(this.todo.id).subscribe(value =>{
    })
    labelModal.componentInstance.downloaded$
      .subscribe({
        next: (value: boolean) => {
          this.downloaded = value}
      })}

  /**@author Roy van Delft
   * Opens a dialog window for the waste label, and fetches the category by the selected leftover. Also enables the 'Done!' button when the download
   * button is clicked.
   */
  openPreviewWaste()
    {
    const labelModalWaste = this.modalService.open(WasteLabelComponent)
    labelModalWaste.componentInstance.todo=this.todo
      labelModalWaste.componentInstance.category=this.category;
      labelModalWaste.componentInstance.downloaded$
        .subscribe({
          next: (value: boolean) => {
            console.log(value)
            this.downloaded = value}
        })

  }
}
