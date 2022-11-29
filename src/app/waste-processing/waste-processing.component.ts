import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WasteInterface} from "./wasteInterface";
import {Waste} from "./waste.model";
import {WasteService} from "./waste.service";
import {Order} from "../orders/order.model";
import {OrderInterface} from "../orders/order-list/order/order-interface";
import jsPDF from 'jspdf';


@Component({
  selector: 'app-waste-processing',
  templateUrl: './waste-processing.component.html',
  styleUrls: ['./waste-processing.component.scss']
})
export class WasteProcessingComponent implements OnInit {

  waste: Waste | undefined;
  order: Order | undefined;

  message: string = '';
  details: string = '';
  metrage: string = '';

  constructor(public wasteService: WasteService) {

  }

  ngOnInit(): void {

  }

  showAfval() {
    this.wasteService.getSnijData().subscribe({
        next: value => {
          this.message = value;
          let splitted = value.split(", ");
          this.showDetailsVanArtikel(splitted[1], splitted[0]);
        },
        error: err => {
          console.log(err);
        }
      }
    );

  }

  showDetailsVanArtikel(articleId: any, soort: string) {
    if (soort == 'Waste') {
      this.wasteService.getWasteCategorieData(articleId).subscribe({
          next: value => {
            let waste: WasteInterface = JSON.parse(value);
            this.waste = new Waste(waste.afvalId, waste.artikelId, waste.metrage, waste.categories);
            this.details = 'Categorieen: ' + this.waste.categories;
            this.metrage = 'Metrage: ' + this.waste.metrage;
          },
          error: err => {
            console.log(err);
          }
        }
      )
    } else if (soort == 'Order') {
      this.wasteService.getOrderByArticleData(articleId).subscribe({
          next: value => {
            this.order = value;
            this.details = 'Ordernummer: ' + this.order.id + "Back to customer!";
            this.metrage = 'Metrage: ' + this.order.metrage;
          },
          error: err => {
            console.log(err);
          }
        }
      )
    } else if (soort == 'Voorraad') {
      this.details = "Back to storage!";
      this.metrage = "";
    }
  }

  @ViewChild('content', {static: false}) el!: ElementRef;


  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("label.pdf");
      }

    })
  }


}
