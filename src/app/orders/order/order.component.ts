import { Component } from '@angular/core';
import {ArticleService} from "../../shared/_services/article.service";
import {Article} from "../../shared/_models/article.model";
import {LeftoverService} from "../../shared/_services/leftover.service";
import {Leftover} from "../../shared/_models/leftover.model";
import {UserService} from "../../shared/_services/user.service";
import {User} from "../../shared/_models/user.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  articleList: Article[] = [];
  leftoverList: Leftover[] = [];
  userList: User[] = [];
  article: Article | undefined

  constructor(private ArticleService: ArticleService, private LeftoverService: LeftoverService, private UserService: UserService) {
    this.getOrderData(1)
  }

  getOrderData(id: 1){
    this.ArticleService.getArticleByOrderId(id).subscribe({
      next: value => {
        console.log(value)
        this.articleList.push(value.payload);
      },
      error: err => {
        console.log(err);
      }
    })
    this.LeftoverService.getOneLeftover(id).subscribe({
      next: value => {
        console.log(value)
        this.leftoverList.push(value.payload);
      },
      error: err => {
        console.log(err);
      }
    })
    this.UserService.getUsers(id).subscribe({
      next: value => {
        console.log(value)
        this.userList.push(value.payload);
        console.log(this.userList)
      },
      error: err => {
        console.log(err);
      }
    })
  }
}




