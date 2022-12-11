import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WasteProcessingComponent} from "./waste-processing.component";
import {ToDoModalComponent} from "./to-do-modal/to-do-modal.component";
import { CutWasteInfoBoxComponent } from './cut-waste-info-box/cut-waste-info-box.component';


@NgModule({
  declarations: [
    WasteProcessingComponent,
    ToDoModalComponent,
    CutWasteInfoBoxComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    WasteProcessingComponent,
  ]
})
export class WasteProcessingModule {
}
