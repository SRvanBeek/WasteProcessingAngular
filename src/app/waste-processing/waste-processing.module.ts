import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WasteProcessingComponent} from "./waste-processing.component";
import {ToDoModalComponent} from "./to-do-modal/to-do-modal.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";


@NgModule({
  declarations: [
    WasteProcessingComponent,
    ToDoModalComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  exports: [
    WasteProcessingComponent,
  ]
})
export class WasteProcessingModule {
}
