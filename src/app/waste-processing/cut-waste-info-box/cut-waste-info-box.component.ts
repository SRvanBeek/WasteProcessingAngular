import {Component, Input} from '@angular/core';
import {CutWaste} from "../_models/cut-waste.model";
import {ArticleService} from "../../shared/_services/article.service";
import {Article} from "../../shared/_models/article";

@Component({
  selector: 'app-cut-waste-info-box',
  templateUrl: './cut-waste-info-box.component.html',
  styleUrls: ['./cut-waste-info-box.component.scss']
})
export class CutWasteInfoBoxComponent {
  @Input() todo: CutWaste;
  article: Article;
  type: string;
  Object = Object;

  constructor(private articleService: ArticleService) {
  }

  ngOnChanges() {
    if (this.todo != null) {
      if (this.todo.type == 'catWaste') {
        this.type = 'Categorized Waste'
      } else if (this.todo.type == 'orders') {
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
}
