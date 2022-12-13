import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WasteProcessingComponent} from "./waste-processing.component";
import {ToDoModalComponent} from "./to-do-modal/to-do-modal.component";
import {CutWasteInfoBoxComponent} from './cut-waste-info-box/cut-waste-info-box.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatButtonModule} from "@angular/material/button";
import {ModalModule} from "../shared/_modals/modal.module";
import { SharedModule } from "../shared/shared.module";



@NgModule({
    declarations: [
        WasteProcessingComponent,
        ToDoModalComponent,
        CutWasteInfoBoxComponent,
    ],
    exports: [
        WasteProcessingComponent,
    ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        MatButtonModule,
        ModalModule,
        SharedModule
    ]
})
export class WasteProcessingModule {
}
