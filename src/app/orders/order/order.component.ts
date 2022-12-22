import { Component } from '@angular/core';
import {ArticleService} from "../../shared/_services/article.service";
import {Article} from "../../shared/_models/article.model";
import {LeftoverService} from "../../shared/_services/leftover.service";
import {Leftover} from "../../shared/_models/leftover.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  articleList: Article[] = [];
  leftoverList: Leftover[] = [];
  article: Article | undefined

  constructor(public ArticleService: ArticleService, public LeftoverService: LeftoverService) {
    this.getOrderData()
  }

  getOrderData(){
    this.ArticleService.getArticleByOrderId(1).subscribe({
      next: value => {
        this.articleList.push(value.payload);
        console.log(this.articleList)
      }
      ,
      error: err => {
        console.log(err);
      }
    })
    this.LeftoverService.getOneLeftover(1).subscribe({
      next: value => {
        this.leftoverList.push(value.payload);
        console.log(this.leftoverList)

      }
    })
  }
}

