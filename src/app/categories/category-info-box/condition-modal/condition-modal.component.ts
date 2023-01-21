import { Component } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-condition-modal',
  templateUrl: './condition-modal.component.html',
  styleUrls: ['./condition-modal.component.scss']
})
export class ConditionModalComponent {

  andOrButton: boolean = true;

  constructor(private modalService: NgbActiveModal) {
  }

  closeModal() {

    this.modalService.close();
  }

  andOr(){
    this.andOrButton = !this.andOrButton;
  }
}
