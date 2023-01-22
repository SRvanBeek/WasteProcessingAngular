import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Customer} from "../../shared/_models/customer.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomerService} from "../../shared/_services/customer.service";
import {ToastService} from "../../shared/_services/toast.service";
import {CustomerDisableConfirmComponent} from "../customer-disable-confirm/customer-disable-confirm.component";
import {ChangeCustomerComponent} from "../change-customer/change-customer.component";

/**
 * @Author Dino Yang
 */
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.scss']
})
export class CustomerInfoComponent {
  @Input() customer: Customer;
  @Output() created = new EventEmitter<boolean>();


  constructor(private modalService: NgbModal, private customerService: CustomerService, private toastService: ToastService) {
  }

  /**
   * openConfirm() opens the confirm modal.
   */
  openConfirm() {
    const modelRef = this.modalService.open(CustomerDisableConfirmComponent, {size: "lg"})
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
    const modelRef = this.modalService.open(ChangeCustomerComponent, {size: "lg"})
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
