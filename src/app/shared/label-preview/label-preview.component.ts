import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import {Leftover} from "../_models/leftover.model";

@Component({
  selector: 'app-label-preview',
  templateUrl: './label-preview.component.html',
  styleUrls: ['./label-preview.component.scss']
})
export class LabelPreviewComponent {
  @Input() todo: Leftover;

  @ViewChild('modal', { static: false }) el!:ElementRef;

  makePdf() {
    let pdf= new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('OrderLabel'+ '.pdf');
      }
  });
}
}

