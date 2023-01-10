import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import jsPDF from 'jspdf';
import {Leftover} from "../_models/leftover.model";
import {Article} from "../_models/article";
import {ArticleService} from "../_services/article.service";
import {LeftoverService} from "../_services/leftover.service";

@Component({
  selector: 'app-label-preview',
  templateUrl: './label-preview.component.html',
  styleUrls: ['./label-preview.component.scss']
})
export class LabelPreviewComponent implements OnInit {
  @Input() todo: Leftover;

  article: Article
  leftover: Leftover

  constructor(private articleService: ArticleService, private leftoverService: LeftoverService)
   {
  }

  setArticle(id: string) {
    this.articleService.getOneArticle(id)
      .subscribe(value => {
        this.article = value.payload;
      });
  }

  @ViewChild('modal', { static: false }) el!:ElementRef;

  makePdf() {
    let pdf= new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('OrderLabel'+ '.pdf');

      }
  });
}

  ngOnInit(): void {
    console.log(this.todo)
    this.setArticle(this.todo.artikelnummer)
  }
}

