import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from "../header/header.module";
import { DashboardComponent } from './_modals/dashboard/dashboard.component';
import {ModalModule} from "./_modals/modal.module";


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ModalModule
  ],
  entryComponents: [
    DashboardComponent
  ]
})
export class SharedModule {
}
