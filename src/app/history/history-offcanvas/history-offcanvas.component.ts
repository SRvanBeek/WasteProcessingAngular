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
    @Input() leftoverid: number;
    article: Article;
    leftover: Leftover;
    employeeName: string

    constructor(private articleService: ArticleService, public activeOffcanvas: NgbActiveOffcanvas, private leftoverService: LeftoverService, private userService: UserService) {
    }

  /**
   * this function gets the extra information that is needed to display.
   */
  ngOnInit() {
    console.log(this.historyObject.leftoverID)
      this.articleService.getOneArticle(this.articleNumber)
        .subscribe({next: response => {
          this.article = response.payload;
          }})
      this.leftoverService.getOneLeftover(this.leftoverid).subscribe({next: response => {
          console.log(response)
        this.leftover = response.payload;
        }})
      this.userService.getUsernameById(this.historyObject.userId)
        .subscribe({
          next: response => {
            this.employeeName = response.message;
          }
        })
    }

}
