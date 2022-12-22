import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderComponent} from "./order/order.component";
import {OrdersComponent} from "./orders.component";
import {MatCheckboxModule} from "@angular/material/checkbox";



@NgModule({
  declarations: [
    OrderComponent,
    OrdersComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
  ],
  exports: [
    OrdersComponent,
  ]
})
export class OrdersModule { }
