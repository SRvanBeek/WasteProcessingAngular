import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from "./categories.component";
import {CategoryInfoBoxComponent} from "./category-info-box/category-info-box.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ConditionModalComponent } from './category-info-box/condition-modal/condition-modal.component';
import {SharedModule} from "../shared/shared.module";




@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryInfoBoxComponent,
    ConditionModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class CategoriesModule { }
