import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { GaugeComponent } from './dashboard/gauge/gauge.component';
import {FormsModule} from "@angular/forms";
import { LabelPreviewComponent } from '../label-preview/label-preview.component';



@NgModule({
  declarations: [
    DashboardComponent,
    GaugeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    DashboardComponent,
    GaugeComponent
  ]
})
export class ModalModule { }
