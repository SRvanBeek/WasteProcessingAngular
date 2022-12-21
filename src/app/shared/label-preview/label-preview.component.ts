import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { CutWaste } from 'src/app/waste-processing/_models/cut-waste.model';

@Component({
  selector: 'app-label-preview',
  templateUrl: './label-preview.component.html',
  styleUrls: ['./label-preview.component.scss']
})
export class LabelPreviewComponent {
  @Input() todo: CutWaste;

  @ViewChild('modal', { static: false }) el!:ElementRef;

  makePdf() {
    let pdf= new jsPDF('p', 'pt', 'a4');

    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('label.pdf');
      }
  });
}
}

