import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import jsPDF from 'jspdf';
import {Leftover} from "../_models/leftover.model";
import {Article} from "../_models/article";
import {ArticleService} from "../_services/article.service";
import {LeftoverService} from "../_services/leftover.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

/**
 * @Author Roy van Delft
 */
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
  @Input() category: string;
  public downloaded$: EventEmitter<boolean>;

  article: Article
  leftover: Leftover
  constructor(private articleService: ArticleService, private leftoverService: LeftoverService, public activeModal: NgbActiveModal) {
    this.downloaded$ = new EventEmitter<boolean>;
  }

  /**
   * Sets the current article to be fetched, based on the article ID
   * @param id
   */
  setArticle(id: string) {
    this.articleService.getOneArticle(id)
      .subscribe(value => {
        this.article = value.payload;
      });
  }

  @ViewChild('modal', {static: false}) el!: ElementRef;

  /**
   * Generates a PDF of the Waste Label, which contains the data of the currently selected leftover, with the type 'categorized waste'
   * Enables the 'Done!' button
   */
  makePdfWaste() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Categorized Waste ID' + this.todo.id + '.pdf');
        this.downloaded$.emit(true)
      }
    });
  }

  ngOnInit(): void {
    this.setArticle(this.todo.artikelnummer)
  }




}
