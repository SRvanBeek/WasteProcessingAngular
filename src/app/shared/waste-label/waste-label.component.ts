import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import jsPDF from 'jspdf';
import {Leftover} from "../_models/leftover.model";
import {Article} from "../_models/article";
import {ArticleService} from "../_services/article.service";
import {LeftoverService} from "../_services/leftover.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-waste-label',
  templateUrl: './waste-label.component.html',
  styleUrls: ['./waste-label.component.scss']
})
export class WasteLabelComponent {

@Component({
  selector: 'app-label-preview',
  templateUrl: './label-preview.component.html',
  styleUrls: ['./label-preview.component.scss']
})
  @Input() todo: Leftover;

  article: Article
  leftover: Leftover
  constructor(private articleService: ArticleService, private leftoverService: LeftoverService, public activeModal: NgbActiveModal) {
  }

  setArticle(id: string) {
    this.articleService.getOneArticle(id)
      .subscribe(value => {
        this.article = value.payload;
      });
  }

  @ViewChild('modal', {static: false}) el!: ElementRef;

  makePdfWaste() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Categorized Waste ID' + this.todo.id + '.pdf');

      }
    });
  }

  ngOnInit(): void {
    this.setArticle(this.todo.artikelnummer)
  }




}
