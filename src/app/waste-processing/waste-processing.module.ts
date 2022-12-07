import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WasteProcessingComponent} from "./waste-processing.component";
import {ToDoModalComponent} from "./to-do-modal/to-do-modal.component";


@NgModule({
  declarations: [
    WasteProcessingComponent,
    ToDoModalComponent
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
