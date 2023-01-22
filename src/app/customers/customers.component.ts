import {Component, HostListener} from '@angular/core';
import {Customer} from "../shared/_models/customer.model";
import {CustomerService} from "../shared/_services/customer.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CreateCustomerComponent} from "./create-customer/create-customer.component";
import {CustomerModalComponent} from "./customer-modal/customer-modal.component";

/**
 * @Author Dino Yang
 */
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  selectedIndex: number = -1;
  isDesktop: boolean;
  screenLGSize: number = 992;
  customerList: Customer[];
  selectedCustomer: Customer;
  searchText: any;
  show: boolean = true;


  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }


  constructor(private CustomerService: CustomerService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.fillCustomerList();
    this.updateIsDesktop();
  }

  /**
   * customerDetail() sets selectedIndex and selectedCustomer with the right values after clicking on a customer.
   * @param Customer selected customer
   * @param index in the list.
   */
  customerDetail(Customer: Customer, index: number): void {
    this.selectedIndex = index;
    this.selectedCustomer = Customer;
    if (!this.isDesktop) {
      this.openMobileCustomerInfo();
    }
  }

  /**
   * fillCustomerList() fills the customerList with every customer in the db.
   */
  fillCustomerList() {
    this.CustomerService.getAllCustomers().subscribe({
      next: value => {
        this.customerList = value.payload;
      }
    })
  }

  /**
   * refresh() refreshes the view.
   */
  refresh() {
    this.fillCustomerList();
    this.show = false;
    setTimeout(() => {
      this.customerDetail(this.customerList[this.selectedIndex], this.selectedIndex);
      this.show = true;
    }, 100);
  }

  /**
   * openCreateCustomer() opens the create customer modal.
   */
  openCreateCustomer() {
    const modalRef = this.modalService.open(CreateCustomerComponent, {size: "lg"});
    modalRef.result.then((data => {
      if (data === 'created') {
        this.fillCustomerList();
      }
    })).catch((res) => {
    })
  }

  /**
   * openMobileCustomerInfo() opens the customer info modal on mobiles.
   */
  openMobileCustomerInfo() {
    const modalRef = this.modalService.open(CustomerModalComponent);
    modalRef.componentInstance.customer = this.selectedCustomer;
  }
}
