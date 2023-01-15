import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from "../header/header.module";
import {DashboardComponent} from './_modals/dashboard/dashboard.component';
import {ModalModule} from "./_modals/modal.module";
import {FilterPipe} from './_pipes/filter.pipe';
import {ToastComponent} from './toast/toast.component';
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";
import {LabelPreviewComponent} from "./label-preview/label-preview.component";
import {WasteLabelComponent} from "./waste-label/waste-label.component";


@NgModule({
  declarations: [
    FilterPipe,
    ToastComponent,
    LabelPreviewComponent,
    WasteLabelComponent,
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
    LabelPreviewComponent,
    WasteLabelComponent,
  ],
  entryComponents: [
    DashboardComponent
  ]
})
export class SharedModule {
}
