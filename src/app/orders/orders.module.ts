import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderListComponent} from "./order-list/order-list.component";
import {OrdersComponent} from "./orders.component";
import {OrderComponent} from "./order-list/order/order.component";
import {OrderDetailsComponent} from "./order-list/order-details/order-details.component";
import {MatCheckboxModule} from "@angular/material/checkbox";


@NgModule({
  declarations: [
    OrderListComponent,
    OrdersComponent,
    OrderComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule
  ],
  exports: [
    OrderListComponent,
    OrdersComponent,
    OrderComponent,
    OrderDetailsComponent
  ]
})
export class OrdersModule {
}
