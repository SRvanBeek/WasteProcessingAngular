import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import jsPDF from 'jspdf';
import {Leftover} from "../_models/leftover.model";
import {Article} from "../_models/article";
import {ArticleService} from "../_services/article.service";
import {LeftoverService} from "../_services/leftover.service";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomerService} from "../_services/customer.service";


@Component({
  selector: 'app-label-preview',
  templateUrl: './label-preview.component.html',
  styleUrls: ['./label-preview.component.scss']
})
export class LabelPreviewComponent implements OnInit {
  @Input() todo: Leftover;

  article: Article
  leftover: Leftover
  customerService: CustomerService


  constructor(private articleService: ArticleService, private leftoverService: LeftoverService, public activeModal: NgbActiveModal)
   {
  }

  setArticle(id: string) {
    this.articleService.getOneArticle(id)
      .subscribe(value => {
        this.article = value.payload;
      });
  }

  setCustomer(id: number){
    this.customerService.getCustomerByOrderID(id).subscribe(value =>{
      console.log(value)
  })
  }

  @ViewChild('modal', { static: false }) el!:ElementRef;

  makePdf() {
    let pdfLabel= new jsPDF('p', 'pt', 'a4');

    pdfLabel.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('Order Label ID'+ this.todo.id + '.pdf');

      }
  });
}
  ngOnInit(): void {
    this.setArticle(this.todo.artikelnummer)
  }
}

