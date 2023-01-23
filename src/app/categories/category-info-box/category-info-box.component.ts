import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {EditCategory} from "../../shared/_models/edit-category.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConditionModalComponent} from "./condition-modal/condition-modal.component";
import {CategoryJSON, CategoryService, ConvMap} from "../../shared/_services/category.service";

@Component({
  selector: 'app-category-info-box',
  templateUrl: './category-info-box.component.html',
  styleUrls: ['./category-info-box.component.scss']
})
export class CategoryInfoBoxComponent implements OnInit {
  @Input() category: EditCategory;
  @Input() isCategoryNew: boolean;
  @Input() categoryId: number;

  isDesktop: boolean;
  screenLGSize: number = 992;
  form: FormGroup;
  trueButtonBool = true;

  conditionsList: string[] = [];

  constructor(private modalService: NgbModal, private categoryService: CategoryService) {
  }

  @HostListener("window:resize", []) updateIsDesktop() {
    this.isDesktop = window.innerWidth >= this.screenLGSize;
  }

  ngOnInit() {
    this.initializeForm();
    if (!this.isDesktop) {
      this.fillForm();
    }
  }

  ngOnChanges() {
    this.updateIsDesktop();
    this.fillForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'condition': new FormControl(null, Validators.required),
      'extraConditions': new FormArray([])
    });
  }

  fillForm() {
    if (this.category != null) {
      this.conditionsList = [];
      (<FormArray>this.form.get('extraConditions')).clear();
      if (!this.isCategoryNew) {
        this.form.get('name')?.patchValue(this.category.name);
        let condition = '';
        let index = 0;
        let firstCondition = true;
        for (let key of Object.keys(this.category.conditions)) {
          for (let i = 0; i < Object.values(this.category.conditions).at(index).length; i++) {
            if (Object.values(this.category.conditions).at(index)[i] != "Overig") {
              condition += Object.values(this.category.conditions).at(index)[i] + "%";
              condition += " " + key;
              if (firstCondition) {
                this.form.get('condition')?.patchValue(condition);
                firstCondition = false;
              } else {
                (<FormArray>this.form.get('extraConditions')).push(new FormControl(condition, Validators.required));
              }
              if (i + 1 < Object.values(this.category.conditions).at(index).length) {
                this.conditionsList.push("And");
              }
              condition = '';
            }
          }
          if (index + 1 < Object.keys(this.category.conditions).length) {
            this.conditionsList.push("Or");
          }
          index++
        }
        this.trueButtonBool = this.category.enabled;
      } else {
        this.trueButtonBool = true;
        this.initializeForm();

      }
    }
  }

  mapConditions() {
    let map = new Map<string, string[]>();

    let conditionValue = (<String>this.form.get('condition')?.value);
    let extraConditionValue = (<FormArray>this.form.get('extraConditions'));

    let key = conditionValue.slice(conditionValue.indexOf("%") + 2);
    let item = conditionValue.slice(0, conditionValue.indexOf("%"));
    let itemArray = [item];

    if (this.conditionsList.length > 0) {
      let firstCondition = true;
      for (let i = 0; i < this.conditionsList.length; i++) {

        if (this.conditionsList.at(i) == "And") {
          if (firstCondition) {
            firstCondition = false;
            i--;
          } else {
            itemArray.push(extraConditionValue.at(i).value.slice(0, extraConditionValue.at(i).value.indexOf("%")));
            map.set(key, itemArray);
          }
        } else if (this.conditionsList.at(i) == "Or") {
          if (firstCondition) {
            firstCondition = false;
            i--;
          } else {
            key = extraConditionValue.at(i).value.slice(extraConditionValue.at(i).value.indexOf("%") + 2);
            itemArray = [];
            itemArray.push(extraConditionValue.at(i).value.slice(0, extraConditionValue.at(i).value.indexOf("%")));
          }
          map.set(key, itemArray);
        }
      }
    } else {
      map.set(key, itemArray);
    }

    return map;
  }

  save() {
    let trueButton = this.trueButtonBool;

    let category = new EditCategory(this.form.get('name')?.value, this.mapConditions(), trueButton);

    let conditions: Map<string, string[]> = category.conditions;
    const convMap: ConvMap = {};
    conditions.forEach((val: string[], key: string) => {
      convMap[key] = val;
    });

    let categoryJson: CategoryJSON = new CategoryJSON();
    categoryJson.conditions = convMap;
    categoryJson.name = category.name;
    categoryJson.enabled = category.enabled;

    if (this.isCategoryNew) {
      this.categoryService.postCategory(categoryJson).subscribe();
    } else {
      categoryJson.id = this.category.id;
      this.categoryService.putCategory(categoryJson).subscribe();
    }

    this.initializeForm();
    if (!this.isDesktop) {

    } else {

    }
  }

  getControls() {
    return (<FormArray>this.form.get('extraConditions')).controls;
  }

  addInput() {
    this.modalService.open(ConditionModalComponent, {size: 'sm', centered: true}).
    componentInstance.addInputEvent.subscribe((receivedEntry: string[]) => {
      this.conditionsList.push(receivedEntry[0]);
      (<FormArray>this.form.get('extraConditions')).push(new FormControl(receivedEntry[1], Validators.required));
      }
      );
  }

  removeCondition(conditionIndex: number) {
    (<FormArray>this.form.get('extraConditions')).removeAt(conditionIndex);
    this.conditionsList.splice(conditionIndex, 1);
  }

  test() {
    console.log("this works");
    console.log(this.category);
  }

  changeTrueButton() {
    this.trueButtonBool = !this.trueButtonBool;
  }
}
