import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header.component";
import {AppRoutingModule} from "../app-routing.module";
import { OffcanvasComponent } from './offcanvas/offcanvas.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    HeaderComponent,
    OffcanvasComponent
  ],
    imports: [
        CommonModule,
        AppRoutingModule,
        MatIconModule
    ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule {
}
