import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WasteProcessingComponent} from "./waste-processing.component";
import {ModalModule} from "../shared/_modals/modal.module";



@NgModule({
  declarations: [
    WasteProcessingComponent,
  ],
    imports: [
        CommonModule,
        ModalModule
    ],
  exports: [
    WasteProcessingComponent,
  ]
})
export class WasteProcessingModule { }
