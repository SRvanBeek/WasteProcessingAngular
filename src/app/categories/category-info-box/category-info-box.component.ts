import {Component, Input, TemplateRef, ViewChild, ViewContainerRef} from '@angular/core';
import {CategoryModel} from "../../shared/_models/category.model";
import {ConditionInputComponent} from "./condition-input/condition-input.component";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-category-info-box',
  templateUrl: './category-info-box.component.html',
  styleUrls: ['./category-info-box.component.scss']
})
export class CategoryInfoBoxComponent {
  @Input() category: CategoryModel;
  @ViewChild('f') form: NgForm;

  conditionsList: String[] = [];

  constructor() {
  }

  ngOnInit(): void{
    this.conditionsList.push("sadfsgdhfn");
    this.conditionsList.push("5675utyh");
    this.conditionsList.push("erteyujhn");
    this.conditionsList.push("siukyjghtfgdrfs");
    this.conditionsList.push("sghyjuyh");
    this.conditionsList.push("sadsfghn");
    this.conditionsList.push("ster5yujk");
    this.conditionsList.push("dfgbfnh");
  }

  save() {
    console.log(this.form.value.categoryName);
    this.form.resetForm();
  }

  addInput() {

  }

  removeCondition(condition: String) {
    for (let i = 0; i < this.conditionsList.length; i++) {
      if (this.conditionsList[i] == condition) {
        this.conditionsList.splice(i, 1);
      }
    }
  }
}
