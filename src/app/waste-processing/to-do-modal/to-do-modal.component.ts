import {Component, Input, Output, EventEmitter} from '@angular/core';
import {CutWaste} from "../_models/cut-waste.model";

@Component({
  selector: 'app-to-do-modal',
  templateUrl: './to-do-modal.component.html',
  styleUrls: ['./to-do-modal.component.scss']
})
export class ToDoModalComponent {
  @Input() todo: CutWaste;
  @Input() isShownInput: boolean;
  @Output() isShownOutput = new EventEmitter<boolean>();
  @Input() type: string;

  close() {
    this.isShownOutput.emit(false);
  }
}
