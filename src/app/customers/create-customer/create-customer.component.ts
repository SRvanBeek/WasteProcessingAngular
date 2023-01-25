import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../../shared/_services/customer.service";
import {Customer} from "../../shared/_models/customer.model";
import {ToastService} from "../../shared/_services/toast.service";
import {Country} from "@angular-material-extensions/select-country";

/**
 * @Author Dino Yang
 */
@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {
  defaultValue: Country = {
    name: 'Netherlands',
    alpha2Code: 'NL',
    alpha3Code: 'NLD',
    numericCode: '276',
    callingCode: '+31'
  };
  country = new FormControl(null, [Validators.required]);
  customer: FormGroup = new FormGroup({
    customerId: new FormControl(''),
    minMeter: new FormControl(''),
    maxMeter: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    country: this.country,
    enabled: new FormControl(true)
  });


  constructor(public activeModal: NgbActiveModal, private customerService: CustomerService, private formBuilder: FormBuilder, private toastService: ToastService) {
    this.customer = this.formBuilder.group(
      {
        customerId: [
          '',
          [
            Validators.required,
            Validators.minLength(3)
          ]
        ],
        minMeter: [
          '',
          [
            Validators.maxLength(10),
            Validators.min(0),
            Validators.pattern(/^[0-9]\d*$/)
          ]
        ],
        maxMeter: [
          '',
          [
            Validators.maxLength(10),
            Validators.pattern(/^[0-9]\d*$/)
          ]
        ],
        address: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])/)
          ]
        ],
        city: [
          '',
          [
            Validators.required,
            Validators.pattern(/^[A-z]+$/)
          ]
        ],
        postalCode: ['',
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
   * onSubmit checks whether there are any errors in the form. If there are none, it posts a new customer to API.
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
    this.customerService.customerExists(value.customerId)
      .subscribe({
        next: response => {
          if (response.code == 'NOT_FOUND') {
            let newCustomer = new Customer(value.customerId, value.minMeter, value.maxMeter, value.address, value.country.name, value.postalCode, value.city, value.enabled);
            this.customerService.postCustomer(newCustomer)
              .subscribe(() => {
                  this.activeModal.close('created');
                  this.toastService.show('', 'You have added customer with name: ' + value.customerId)
                }
              )
          } else {
            this.customer.get('customerId')?.setErrors({duplicate: true});
          }
          return;
        }
      })
  }
}
