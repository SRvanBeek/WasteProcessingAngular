import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from "../header/header.module";
import { DashboardComponent } from './_modals/dashboard/dashboard.component';
import {ModalModule} from "./_modals/modal.module";
import { UserModel } from './_models/user/user.model';


@NgModule({
  declarations: [
  
    UserModel
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
