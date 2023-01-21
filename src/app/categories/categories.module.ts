import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from "./categories.component";
import {CategoryInfoBoxComponent} from "./category-info-box/category-info-box.component";
import { ConditionInputComponent } from './category-info-box/condition-input/condition-input.component';
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryInfoBoxComponent,
    ConditionInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CategoriesModule { }
