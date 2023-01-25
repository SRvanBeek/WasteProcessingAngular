import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HistorymodalComponent} from "./historymodal/historymodal.component";
import {HistoryItemComponent} from "./history-item/history-item.component";
import {HistoryOffcanvasComponent} from "./history-offcanvas/history-offcanvas.component";
import {HistoryComponent} from "./history.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ModalModule} from "../shared/_modals/modal.module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [HistoryComponent, HistorymodalComponent, HistoryItemComponent, HistoryOffcanvasComponent],
  imports: [
    CommonModule,
    MatCheckboxModule,
    ModalModule,
    FormsModule,
    SharedModule,
  ],
  exports: [HistoryComponent]
})
export class HistoryModule { }
