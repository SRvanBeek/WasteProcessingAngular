import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WasteProcessingComponent} from "./waste-processing.component";



@NgModule({
  declarations: [
    WasteProcessingComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WasteProcessingComponent,
  ]
})
export class WasteProcessingModule { }
