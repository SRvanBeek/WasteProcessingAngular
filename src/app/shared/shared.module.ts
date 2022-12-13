import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderModule} from "../header/header.module";
import { DashboardComponent } from './_modals/dashboard/dashboard.component';
import {ModalModule} from "./_modals/modal.module";
import { LabelPreviewComponent } from './label-preview/label-preview.component';


@NgModule({
  declarations: [
    LabelPreviewComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    ModalModule,
  ],
  entryComponents: [
    DashboardComponent
  ],
  exports: [
    LabelPreviewComponent
  ]
})
export class SharedModule {
}
