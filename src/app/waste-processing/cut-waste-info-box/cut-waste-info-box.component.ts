import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CutWaste} from "../_models/cut-waste.model";
import {ArticleService} from "../../shared/_services/article.service";
import {Article} from "../../shared/_models/article";
import {CutWasteService} from "../_services/cut-waste.service";
import {OrdersService} from "../../orders/orders.service";
import {WasteService} from "../_services/waste.service";
import {CategoryService} from "../../shared/_services/category.service";
import {VoorraadService} from "../../shared/_services/voorraad.service";

@Component({
  selector: 'app-cut-waste-info-box',
  templateUrl: './cut-waste-info-box.component.html',
  styleUrls: ['./cut-waste-info-box.component.scss']
})
export class CutWasteInfoBoxComponent {
  @Input() userId: number;
  @Input() list: CutWaste[];
  @Input() todo: CutWaste;
  @Output() doneOutput = new EventEmitter<CutWaste[]>();
  article: Article;
  type: string;
  category: any;

  constructor(private articleService: ArticleService, private cutWasteService: CutWasteService,
              private orderService: OrdersService, private wasteService: WasteService,
              private categoryService: CategoryService, private voorraadService: VoorraadService) {
  }

  ngOnChanges() {
    if (this.todo != null) {
      if (this.todo.type == 'catWaste') {
        this.type = 'Categorized Waste'
        this.wasteService.getOneWasteByCutWasteID(this.todo.id).subscribe(waste => {
          this.categoryService.getCategoryNameById(waste.categoryId).subscribe(categoryName => {
            this.category = categoryName.name;
          })
        })
      } else if (this.todo.type == 'order') {
        this.type = 'Order';
      } else {
        this.type = 'Storage';
      }
      this.getArticle(this.todo.artikelnummer);
    }
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
  }
}
