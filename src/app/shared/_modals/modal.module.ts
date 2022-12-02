import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { GaugeComponent } from './dashboard/gauge/gauge.component';



@NgModule({
  declarations: [
    DashboardComponent,
    GaugeComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent,
    GaugeComponent
  ]
})
export class ModalModule { }
