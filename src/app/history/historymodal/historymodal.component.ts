import {Component, Input, OnInit} from '@angular/core';
import {Article} from "../../shared/_models/article";
import {Leftover} from "../../shared/_models/leftover.model";
import {ArticleService} from "../../shared/_services/article.service";
import {NgbActiveModal, NgbActiveOffcanvas, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {LeftoverService} from "../../shared/_services/leftover.service";
import {UserService} from "../../shared/_services/user.service";


@Component({
  selector: 'app-historymodal',
  templateUrl: './historymodal.component.html',
  styleUrls: ['./historymodal.component.scss']
})
export class HistorymodalComponent implements OnInit{
  @Input() historyObject: any;
  @Input() articleNumber: string;
  @Input() leftoverid: number;
  article: Article;
  leftover: Leftover;
  employeeName: string

  constructor(private articleService: ArticleService, public activeModal: NgbActiveModal, private leftoverService: LeftoverService, private userService: UserService, public ngbModal: NgbModal) {
  }
  /**
   * this function gets the extra information that is needed to display.
   */
  ngOnInit() {
    console.log(this.articleNumber)
    this.articleService.getOneArticle(this.articleNumber).subscribe({next: response => {
          this.article = response.payload;
        }})
    this.leftoverService.getOneLeftover(this.leftoverid).subscribe({next: response => {
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

