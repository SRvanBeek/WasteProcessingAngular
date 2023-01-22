import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CustomersComponent} from "./customers.component";
import {CreateCustomerComponent} from "./create-customer/create-customer.component";
import {CustomerInfoComponent} from "./customer-info/customer-info.component";
import {CustomerModalComponent} from "./customer-modal/customer-modal.component";
import {CustomerDisableConfirmComponent} from "./customer-disable-confirm/customer-disable-confirm.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SharedModule} from "../shared/shared.module";
import {MatSelectCountryModule} from '@angular-material-extensions/select-country';
import {HttpClientModule} from '@angular/common/http';
import { ChangeCustomerComponent } from './change-customer/change-customer.component';


@NgModule({
  declarations: [
    CustomersComponent,
    CustomerInfoComponent,
    CreateCustomerComponent,
    CustomerModalComponent,
    CustomerDisableConfirmComponent,
    ChangeCustomerComponent,
  ],
  imports: [
    MatSelectCountryModule.forRoot("en"),
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CustomersComponent
  ]
})
export class CustomersModule {
}
