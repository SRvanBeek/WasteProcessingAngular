import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../shared/_services/toast.service";
import {Customer} from "../../shared/_models/customer.model";
import {CustomerDisableConfirmComponent} from "../customer-disable-confirm/customer-disable-confirm.component";
import {CustomerService} from "../../shared/_services/customer.service";
import {ChangeCustomerComponent} from "../change-customer/change-customer.component";

/**
 * @Author Dino Yang
 */
@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss']
})
export class CustomerModalComponent {
  @Input() customer: Customer;
  @Output() created = new EventEmitter<boolean>();

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private customerService: CustomerService, private toastService: ToastService) {
  }

  /**
   * openConfirm() opens the confirm modal.
   */
  openConfirm() {
    const modelRef = this.modalService.open(CustomerDisableConfirmComponent)
    modelRef.componentInstance.customer = this.customer;
    modelRef.result.then((data => {
      if (data === 'Yes') {
        this.customer.enabled = !this.customer.enabled;
        this.customerService.putCustomer(this.customer).subscribe()
        if (this.customer.enabled) {
          this.toastService.show('', "You've just enabled customer " + this.customer.customerID);
        } else {
          this.toastService.show('', "You've just disabled customer " + this.customer.customerID);
        }
      }
    })).catch((res) => {
    });
  }

  /**
   * openChangeCustomer() opens the change customer modal.
   */
  openChangeCustomer() {
    const modelRef = this.modalService.open(ChangeCustomerComponent)
    modelRef.componentInstance.inputCustomer = this.customer;
    modelRef.result.then((data => {
      if (data === 'changed') {
        this.created.emit(true);
        this.toastService.show('', 'You have changed customer with name: ' + this.customer.customerID);
      }
    })).catch((res) => {
    });
  }
}
