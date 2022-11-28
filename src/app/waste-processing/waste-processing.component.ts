import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import jsPDF from 'jspdf';
import {Waste} from "./waste.model";
import {WasteService} from "./waste.service";

@Component({
  selector: 'app-waste-processing',
  templateUrl: './waste-processing.component.html',
  styleUrls: ['./waste-processing.component.scss']
})
export class WasteProcessingComponent implements OnInit{

  waste: Waste | undefined;
  message: string = '';

  constructor(public wasteService: WasteService) {

  }

  ngOnInit(): void {

  }

  showAfval() {
  /*  this.wasteService.test();
    this.wasteService.getData().subscribe({
      next: value => {
        this.waste = new Waste(value[0], value[1], value[2], value[3]);
      },
      error: error => {
        console.error(error);
      }
      }
    );
    this.waste = new Waste('1', '2', '3', 'yay');

   */
    this.wasteService.getData().subscribe({
      next: value => {
        this.message = value[0];
      }
      }
    );
  }

  @ViewChild('content',{static: false}) el!: ElementRef;


  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("label.pdf");
      }
     
})
  }
}
