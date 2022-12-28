import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from "./settings.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {ToastrModule} from "ngx-toastr";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SettingsComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatIconModule,
        ToastrModule.forRoot({
          positionClass :'toast-top-right'
        })
    ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
