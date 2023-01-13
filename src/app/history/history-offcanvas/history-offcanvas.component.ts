import {Component, Input} from '@angular/core';
import {ArticleService} from "../../shared/_services/article.service";
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {Article} from "../../shared/_models/article";
import {Leftover} from "../../shared/_models/leftover.model";
import {LeftoverService} from "../../shared/_services/leftover.service";
import {UserService} from "../../shared/_services/user.service";

@Component({
  selector: 'app-history-offcanvas',
  templateUrl: './history-offcanvas.component.html',
  styleUrls: ['./history-offcanvas.component.scss']
})
export class HistoryOffcanvasComponent {
    @Input() historyObject: any;
    @Input() articleNumber: string;
    article: Article;
    leftover: Leftover;
    employeeName: string

    constructor(private articleService: ArticleService, public activeOffcanvas: NgbActiveOffcanvas, private leftoverService: LeftoverService, private userService: UserService) {
    }

  /**
   * this function gets the extra information that is needed to display.
   */
  ngOnInit() {
      this.articleService.getOneArticle(this.articleNumber)
        .subscribe({next: response => {
          this.article = response.payload;
          }})
      this.leftoverService.getOneLeftover(this.historyObject.id).subscribe({next: response => {
        this.leftover = response.payload;
        console.log(this.leftover)
        }})
      this.userService.getUsernameById(this.historyObject.userId)
        .subscribe({
          next: response => {
            this.employeeName = response.message;
          }
        })
    }

}
