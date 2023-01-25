import {Component, ElementRef, EventEmitter, Input, OnInit, ViewChild} from '@angular/core';
import jsPDF from 'jspdf';
import {Leftover} from "../_models/leftover.model";
import {Article} from "../_models/article";
import {ArticleService} from "../_services/article.service";
import {LeftoverService} from "../_services/leftover.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomerService} from "../_services/customer.service";
import {Customer} from "../_models/customer.model";

/**
 * @Author Roy van Delft
 */
@Component({
  selector: 'app-label-preview',
  templateUrl: './label-preview.component.html',
  styleUrls: ['./label-preview.component.scss']
})
export class LabelPreviewComponent implements OnInit {
  @Input() todo: Leftover;
  @Input() customerOrder: Customer
  article: Article
  leftover: Leftover
  customer: Customer
  loading: boolean = true;
  public downloaded$: EventEmitter<boolean>;
  constructor(private articleService: ArticleService, private leftoverService: LeftoverService, public activeModal: NgbActiveModal, private customerService: CustomerService)
   {
     this.downloaded$ = new EventEmitter<boolean>()
  }

  /**
   * Places the data of the selected article, based on their id's
   */
  ngOnInit(): void {
    this.initLabel(this.todo.artikelnummer, this.todo.id)
  }

  /**
   * Fetches the article data from the currently selected leftover, and fetches the customer data with it
   * @param articleNumber the article number of the currently selected leftover
   * @param leftOverID the ID of the currently selected order
   */
  initLabel(articleNumber: string, leftOverID: number) {
    this.articleService.getOneArticle(articleNumber)
      .subscribe(value => {
        this.article = value.payload;
      },
          error => {},
        () => {this.setCustomer(leftOverID)});
  }

  /**
   * Fetches all the customer data needed for the label, based on the current leftover ID
   * @param leftOverID The ID of the selected leftover
   */
  setCustomer(leftOverID: number){
    this.customerService.getCustomerByLeftoverID(leftOverID).subscribe(value =>{
      this.customer = value.payload
  }, error => {},
      () => {this.loading=false;})
  }
  @ViewChild('modal', { static: false }) el!:ElementRef;

  /**
   * Generates a PDF of the Dialog body, which contains the template of the label, filled in with all the data of the order.
   * Enables the 'Done!' button upon being clicked
   */
  makePdf() {
    let pdfLabel= new jsPDF('p', 'pt', 'a4');

    pdfLabel.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Order Label ID'+ this.todo.id + '.pdf')
        this.downloaded$.emit(true);
          }
  });
  }
}
