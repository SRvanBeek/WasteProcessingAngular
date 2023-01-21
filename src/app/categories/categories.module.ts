import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoriesComponent} from "./categories.component";
import {CategoryInfoBoxComponent} from "./category-info-box/category-info-box.component";
import { ConditionInputComponent } from './category-info-box/condition-input/condition-input.component';
import {ReactiveFormsModule} from "@angular/forms";
import { ConditionModalComponent } from './category-info-box/condition-modal/condition-modal.component';




@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryInfoBoxComponent,
    ConditionInputComponent,
    ConditionModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
