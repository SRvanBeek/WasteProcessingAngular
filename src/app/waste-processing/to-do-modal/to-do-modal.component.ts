import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CutWaste} from "../_models/cut-waste.model";
import {ArticleService} from "../../shared/_services/article.service";
import {Article} from "../../shared/_models/article";
import {CutWasteService} from "../_services/cut-waste.service";
import {OrdersService} from "../../orders/orders.service";
import {WasteService} from "../_services/waste.service";
import {CategoryService} from "../../shared/_services/category.service";
import {VoorraadService} from "../../shared/_services/voorraad.service";

@Component({
  selector: 'app-to-do-modal',
  templateUrl: './to-do-modal.component.html',
  styleUrls: ['./to-do-modal.component.scss']
})
export class ToDoModalComponent {
  @Input() list: CutWaste[];
  @Input() todo: CutWaste;
  @Input() userId: number;
  @Input() isShownInput: boolean;
  @Output() isShownOutput = new EventEmitter<boolean>();
  @Output() doneOutput = new EventEmitter<CutWaste[]>();
  @Input() type: string;
  article: Article;
  category: any;

  constructor(private articleService: ArticleService, private cutWasteService: CutWasteService,
              private orderService: OrdersService, private wasteService: WasteService,
              private categoryService: CategoryService, private voorraadService: VoorraadService) {
  }

  ngOnChanges() {
    if (this.isShownInput) {
      this.getArticle(this.todo.artikelnummer);
      if (this.todo.type == 'catWaste') {
        this.wasteService.getOneWasteByCutWasteID(this.todo.id).subscribe(waste => {
          this.categoryService.getCategoryNameById(waste.categoryId).subscribe(categoryName => {
            this.category = categoryName.name;
          })
        })
      }
    }
  }

  close() {
    this.isShownOutput.emit(false);
  }

  getArticle(id: string) {
    this.articleService.getOneArticle(id)
      .subscribe(value => {
        this.article = value;
      });
  }

  done() {
    this.cutWasteService.getOneCutWaste(this.todo.id).subscribe(cutWaste => {
      cutWaste.processed = true;
      this.cutWasteService.putCutWaste(cutWaste).subscribe();
    })
    if (this.todo.type == 'catWaste') {
      this.wasteService.getOneWasteByCutWasteID(this.todo.id).subscribe(waste => {
        waste.userId = this.userId;
        waste.dateProcessed = Date.now();
        waste.enabled = true;
        this.wasteService.putWaste(waste).subscribe();
      });
    } else if (this.todo.type == 'storage') {
      this.voorraadService.getOneVoorraadByCutWasteID(this.todo.id).subscribe(voorraad => {
        voorraad.userId = this.userId;
        voorraad.dateProcessed = Date.now();
        voorraad.enabled = true;
        this.voorraadService.putVoorraad(voorraad).subscribe();
      })
    } else {
      this.orderService.getOrderByCutWasteID(this.todo.id).subscribe(order => {
        order.userId = this.userId;
        order.dateProcessed = Date.now();
        order.enabled = true;
        this.orderService.putOrder(order).subscribe();
      })
    }
    let outputList = this.list.filter(cutWaste => {
      return cutWaste.id !== this.todo.id;
    })
    this.doneOutput.emit(outputList);
    this.close();
  }
}
