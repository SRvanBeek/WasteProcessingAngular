import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WasteInterface} from "./wasteInterface";
import {Waste} from "./waste.model";
import {WasteService} from "./waste.service";
import {Order} from "../orders/order-list/order/order.model";
import {OrderInterface} from "../orders/order-list/order/order-interface";


@Component({
  selector: 'app-waste-processing',
  templateUrl: './waste-processing.component.html',
  styleUrls: ['./waste-processing.component.scss']
})
export class WasteProcessingComponent implements OnInit{

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
        console.log(value);
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
            let order: OrderInterface = JSON.parse(value);
            console.log(order);
            this.order = new Order(order.id, order.customerID, order.artikelID, order.metrage);
            this.details = 'Ordernummer: ' + this.order.id;
            this.metrage = 'Metrage: ' + order.metrage;
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

  @ViewChild('content',{static: false}) el!: ElementRef;



}
