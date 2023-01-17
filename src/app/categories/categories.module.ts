import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from "./categories.component";
import {CategoryInfoBoxComponent} from "./category-info-box/category-info-box.component";



@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryInfoBoxComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoriesModule { }
