import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-condition-modal',
  templateUrl: './condition-modal.component.html',
  styleUrls: ['./condition-modal.component.scss']
})
export class ConditionModalComponent {
  @Output() addInputEvent = new EventEmitter<String[]>;
  @ViewChild('condition') condition: ElementRef;

  andOrButton: boolean = true;

  constructor(private modalService: NgbActiveModal) {
  }

  closeModal() {
    this.modalService.close();
  }

  createInput() {
    let input = [];
    if (this.andOrButton) {
      input.push('Or');
    } else {
      input.push('And');
    }
    input.push(this.condition.nativeElement.value);
    this.addInputEvent.emit(input);
    this.modalService.close();
  }

  andOr(){
    this.andOrButton = !this.andOrButton;
  }
}
