import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Leftover} from "../../shared/_models/leftover.model";
import {ArticleService} from "../../shared/_services/article.service";
import {Article} from "../../shared/_models/article";
import {LeftoverService} from "../../shared/_services/leftover.service";
import {OrdersService} from "../../shared/_services/orders.service";
import {WasteService} from "../../shared/_services/waste.service";
import {CategoryService} from "../../shared/_services/category.service";
import {VoorraadService} from "../../shared/_services/voorraad.service";

/**
 * @Author Dino Yang
 */
@Component({
  selector: 'app-leftover-info-box',
  templateUrl: './leftover-info-box.component.html',
  styleUrls: ['./leftover-info-box.component.scss']
})
export class LeftoverInfoBoxComponent {
  @Input() userId: number;
  @Input() list: Leftover[];
  @Input() todo: Leftover;
  @Output() doneOutput = new EventEmitter<Leftover[]>();
  article: Article;
  type: string;
  category: any;

  constructor(private articleService: ArticleService, private leftoverService: LeftoverService,
              private orderService: OrdersService, private wasteService: WasteService,
              private categoryService: CategoryService, private voorraadService: VoorraadService) {
  }

  ngOnChanges() {
    if (this.todo != null) {
      if (this.todo.type == 'catWaste') {
        this.type = 'Categorized Waste'
        this.wasteService.getOneWasteByLeftoverID(this.todo.id).subscribe(waste => {
          this.categoryService.getCategoryNameById(waste.categoryId).subscribe(categoryName => {
            this.category = categoryName.name;
          })
        })
      } else if (this.todo.type == 'order') {
        this.type = 'Order';
      } else {
        this.type = 'Storage';
      }
      this.setArticle(this.todo.artikelnummer);
    }
  }

  /**
   * setArticle() sets article with the article that is connected to the selected leftover.
   * @param id of the article
   */
  setArticle(id: string) {
    this.articleService.getOneArticle(id)
      .subscribe(value => {
        this.article = value;
      });
  }

  /**
   * done() sets the processed attribute of the selected leftover to true and updates the catWaste/storage/order with the right userId, date and enabled.
   */
  done() {
    this.leftoverService.getOneLeftover(this.todo.id).subscribe(leftover => {
      leftover.processed = true;
      this.leftoverService.putLeftover(leftover).subscribe();
    })
    if (this.todo.type == 'catWaste') {
      this.wasteService.getOneWasteByLeftoverID(this.todo.id).subscribe(waste => {
        waste.userId = this.userId;
        waste.dateProcessed = Date.now();
        waste.enabled = true;
        this.wasteService.putWaste(waste).subscribe();
      });
    } else if (this.todo.type == 'storage') {
      this.voorraadService.getOneVoorraadByLeftoverID(this.todo.id).subscribe(voorraad => {
        voorraad.userId = this.userId;
        voorraad.dateProcessed = Date.now();
        voorraad.enabled = true;
        this.voorraadService.putVoorraad(voorraad).subscribe();
      })
    } else {
      this.orderService.getOrderByLeftoverID(this.todo.id).subscribe(order => {
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
  }
}
