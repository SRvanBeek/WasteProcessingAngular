import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from "./settings.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    SettingsComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatTooltipModule,
        MatIconModule
    ],
  exports: [
    SettingsComponent
  ]
})
export class SettingsModule { }
