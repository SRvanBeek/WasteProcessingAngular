import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WasteProcessingComponent} from "./waste-processing.component";
import {ToDoModalComponent} from "../shared/_modals/to-do-modal/to-do-modal.component";
import {LeftoverInfoBoxComponent} from './leftover-info-box/leftover-info-box.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {ModalModule} from "../shared/_modals/modal.module";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    WasteProcessingComponent,
    ToDoModalComponent,
    LeftoverInfoBoxComponent,
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule,
    ModalModule,
    MatSidenavModule,
    SharedModule,
  ],
  exports: [
    WasteProcessingComponent,
  ]
})
export class WasteProcessingModule {
}
