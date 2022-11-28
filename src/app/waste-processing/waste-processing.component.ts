import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
        //this.message = value[0];
        console.log(JSON.stringify(value));
      },
      error: err => {
        console.log(err);
      }
      }
    );

  }

  @ViewChild('content',{static: false}) el!: ElementRef;



}
