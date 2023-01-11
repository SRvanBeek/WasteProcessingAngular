import {Component, Input} from '@angular/core';
import {ArticleService} from "../../shared/_services/article.service";
import {NgbActiveOffcanvas} from "@ng-bootstrap/ng-bootstrap";
import {Article} from "../../shared/_models/article";

@Component({
  selector: 'app-history-offcanvas',
  templateUrl: './history-offcanvas.component.html',
  styleUrls: ['./history-offcanvas.component.scss']
})
export class HistoryOffcanvasComponent {
    @Input() historyObject: any;
    @Input() articleNumber: string;
    article: Article;

    constructor(private articleService: ArticleService, public activeOffcanvas: NgbActiveOffcanvas) {
    }

    ngOnInit() {
      this.articleService.getOneArticle(this.articleNumber)
        .subscribe({next: response => {
          this.article = response.payload;
            console.log(this.article)
          }})

    }

}
