import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from "../header/header.module";
import { DashboardComponent } from './_modals/dashboard/dashboard.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HeaderModule
  ],
  entryComponents: [
    DashboardComponent
  ]
})
export class SharedModule {
}
