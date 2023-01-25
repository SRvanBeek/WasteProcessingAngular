import {Component, Input} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Customer} from "../../shared/_models/customer.model";

@Component({
  selector: 'app-customer-disable-confirm',
  templateUrl: './customer-disable-confirm.component.html',
  styleUrls: ['./customer-disable-confirm.component.scss']
})
export class CustomerDisableConfirmComponent {
  @Input() customer: Customer;

  constructor(public modal: NgbActiveModal) {
  }
}
