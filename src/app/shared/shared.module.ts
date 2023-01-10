import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from "../header/header.module";
import {DashboardComponent} from './_modals/dashboard/dashboard.component';
import {ModalModule} from "./_modals/modal.module";
import {FilterPipe} from './_pipes/filter.pipe';
import {ToastComponent} from './toast/toast.component';
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {LabelPreviewComponent} from "./label-preview/label-preview.component";


@NgModule({
  declarations: [
    FilterPipe,
    ToastComponent,
    LabelPreviewComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ModalModule,
    NgbToastModule
  ],
  exports: [
    FilterPipe,
    ToastComponent,
    LabelPreviewComponent
  ],
  entryComponents: [
    DashboardComponent
  ]
})
export class SharedModule {
}
