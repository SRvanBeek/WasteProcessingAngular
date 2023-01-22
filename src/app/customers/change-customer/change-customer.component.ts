import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomerService} from "../../shared/_services/customer.service";
import {ToastService} from "../../shared/_services/toast.service";
import {Customer} from "../../shared/_models/customer.model";

/**
 * @Author Dino Yang
 */
@Component({
  selector: 'app-change-customer',
  templateUrl: './change-customer.component.html',
  styleUrls: ['./change-customer.component.scss']
})
export class ChangeCustomerComponent implements OnInit {
  @Input() inputCustomer: Customer;

  country = new FormControl('', [Validators.required]);
  customer: FormGroup = new FormGroup({
    minMeter: new FormControl(''),
    maxMeter: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    country: this.country,
    enabled: new FormControl(true)
  });


  constructor(public activeModal: NgbActiveModal, private customerService: CustomerService, private formBuilder: FormBuilder, private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.customer = this.formBuilder.group(
      {
        minMeter: [
          this.inputCustomer.min_meter,
          [
            Validators.maxLength(10),
            Validators.min(0),
            Validators.pattern(/^[0-9]\d*$/)
          ]
        ],
        maxMeter: [
          this.inputCustomer.max_meter,
          [
            Validators.maxLength(10),
            Validators.pattern(/^[0-9]\d*$/)
          ]
        ],
        address: [
          this.inputCustomer.address,
          [
            Validators.required,
            Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])/)
          ]
        ],
        city: [
          this.inputCustomer.city,
          [
            Validators.required,
            Validators.pattern(/[a-zA-Z\s]*$/)
          ]
        ],
        postalCode: [
          this.inputCustomer.postalCode,
          [
            Validators.required,
            Validators.pattern(/^[A-z0-9][A-z0-9 \- ]{0,10}[A-z0-9]$/)
          ]
        ],
        country: this.country,
        enabled: [true]
      },
    )
  }

  get f(): { [key: string]: AbstractControl } {
    return this.customer.controls;
  }

  /**
   * onSubmit() checks whether there are any errors in the form. If there are none, it puts the customer to API.
   */
  onSubmit(): void {
    if (this.customer.get('minMeter')?.value > this.customer.get('maxMeter')?.value) {
      this.customer.get('maxMeter')?.setErrors({small: true});
    }
    if (this.country.invalid) {
      return;
    }
    if (this.customer.invalid) {
      return;
    }
    let value = this.customer.value;
    let newCustomer = new Customer(this.inputCustomer.customerID, value.minMeter, value.maxMeter, value.address, value.country.name, value.postalCode, value.city, value.enabled);
    this.customerService.putCustomer(newCustomer)
      .subscribe(() => {
          this.activeModal.close('changed');
        }
      )
  }
}
