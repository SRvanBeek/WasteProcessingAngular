import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Leftover} from "../../_models/leftover.model";
import {ArticleService} from "../../_services/article.service";
import {Article} from "../../_models/article";
import {LeftoverService} from "../../_services/leftover.service";
import {OrdersService} from "../../_services/orders.service";
import {WasteService} from "../../_services/waste.service";
import {CategoryService} from "../../_services/category.service";
import {VoorraadService} from "../../_services/voorraad.service";
import {CategoryModel} from "../../_models/category.model";
import {Waste} from "../../_models/waste.model";
import {Voorraad} from "../../_models/voorraad";
import {Order} from "../../_models/order.model";

/**
 * @Author Dino Yang
 */
@Component({
  selector: 'app-to-do-modal',
  templateUrl: './to-do-modal.component.html',
  styleUrls: ['./to-do-modal.component.scss']
})
export class ToDoModalComponent {
  @Input() list: Leftover[];
  @Input() todo: Leftover;
  @Input() userId: number;
  @Input() isShownInput: boolean;
  @Output() isShownOutput = new EventEmitter<boolean>();
  @Output() doneOutput = new EventEmitter<Leftover[]>();
  @Input() type: string;
  article: Article;
  category: any;

  constructor(private articleService: ArticleService, private leftoverService: LeftoverService,
              private orderService: OrdersService, private wasteService: WasteService,
              private categoryService: CategoryService, private voorraadService: VoorraadService) {
  }

  ngOnChanges() {
    if (this.isShownInput) {
      this.setArticle(this.todo.artikelnummer);
      if (this.todo.type == 'catWaste') {
        this.wasteService.getOneWasteByLeftoverID(this.todo.id).subscribe(value => {
          let waste: Waste = value.payload;
          this.categoryService.getCategoryNameById(waste.categoryId).subscribe(value => {
            let category: CategoryModel = value.payload;
            this.category = category.name;
          })
        })
      }
    }
  }

  close() {
    this.isShownOutput.emit(false);
  }

  /**
   * setArticle() sets article with the article that is connected to the selected cutWaste.
   * @param id of the article
   */
  setArticle(id: string) {
    this.articleService.getOneArticle(id)
      .subscribe(value => {
        this.article = value.payload;
      });
  }

  /**
   * done() sets the processed attribute of the selected cutWaste to true and updates the catWaste/storage/order with the right userId, date and enabled.
   */
  done() {
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
    this.doneOutput.emit(outputList);
    this.close();
  }
}
